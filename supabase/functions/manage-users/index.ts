import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Verify caller is admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Not authenticated");

    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await callerClient.auth.getUser();
    if (!caller) throw new Error("Not authenticated");

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) throw new Error("Not authorized");

    const { action, ...params } = await req.json();

    if (action === "create_user") {
      const { email, password, full_name, role } = params;
      if (!email || !password) throw new Error("Email and password required");

      const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: full_name || email },
      });
      if (createErr) throw createErr;

      // Assign role
      if (role && newUser.user) {
        await supabase.from("user_roles").insert({
          user_id: newUser.user.id,
          role: role,
        });
      }

      return new Response(JSON.stringify({ success: true, user: newUser.user }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "list_users") {
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;

      // Get roles and profiles
      const { data: allRoles } = await supabase.from("user_roles").select("*");
      const { data: profiles } = await supabase.from("profiles").select("*");

      const enriched = users.map((u: any) => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        full_name: profiles?.find((p: any) => p.user_id === u.id)?.full_name || u.email,
        roles: allRoles?.filter((r: any) => r.user_id === u.id).map((r: any) => r.role) || [],
      }));

      return new Response(JSON.stringify({ users: enriched }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete_user") {
      const { user_id } = params;
      if (!user_id) throw new Error("user_id required");
      if (user_id === caller.id) throw new Error("Cannot delete yourself");

      const { error } = await supabase.auth.admin.deleteUser(user_id);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update_admin_email") {
      const { old_email, new_email, new_password } = params;
      
      // Find user by old email
      const { data: { users } } = await supabase.auth.admin.listUsers();
      const targetUser = users?.find((u: any) => u.email === old_email);
      if (!targetUser) throw new Error("User not found");

      const updates: any = {};
      if (new_email) updates.email = new_email;
      if (new_password) updates.password = new_password;

      const { error } = await supabase.auth.admin.updateUserById(targetUser.id, updates);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Unknown action");
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
