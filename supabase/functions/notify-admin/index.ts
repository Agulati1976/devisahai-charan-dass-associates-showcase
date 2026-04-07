import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const { type, name, email, phone, company, message, product_interest } = await req.json();

    const sourceLabel = type === "rfq" ? "RFQ Submission" : type === "grade_sheet" ? "Grade Sheet Request" : "Contact Form";

    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;">
        <tr><td style="background:#003399;padding:24px 32px;">
          <h2 style="margin:0;color:#fff;font-size:18px;">New ${sourceLabel}</h2>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:12px;">DSCD Website Notification</p>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#333;">
            <tr><td style="padding:6px 0;font-weight:bold;width:140px;">Name:</td><td style="padding:6px 0;">${name || "—"}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Email:</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#003399;">${email || "—"}</a></td></tr>
            ${phone ? `<tr><td style="padding:6px 0;font-weight:bold;">Phone:</td><td style="padding:6px 0;">${phone}</td></tr>` : ""}
            ${company ? `<tr><td style="padding:6px 0;font-weight:bold;">Company:</td><td style="padding:6px 0;">${company}</td></tr>` : ""}
            ${product_interest ? `<tr><td style="padding:6px 0;font-weight:bold;">Product:</td><td style="padding:6px 0;">${product_interest}</td></tr>` : ""}
          </table>
          ${message ? `<div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:6px;"><p style="margin:0 0 4px;font-size:12px;font-weight:bold;color:#666;">Message:</p><p style="margin:0;font-size:14px;color:#333;white-space:pre-wrap;">${message}</p></div>` : ""}
        </td></tr>
        <tr><td style="padding:16px 32px;background:#f9fafb;border-top:1px solid #eee;text-align:center;">
          <p style="margin:0;color:#999;font-size:11px;">This is an automated notification from devisahaicharandass.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "DSCD Website <no-reply@devisahaicharandass.com>",
        to: ["info@devisahaicharandass.com"],
        subject: `New ${sourceLabel}: ${name || "Unknown"}`,
        html,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Notify error:", error);
    return new Response(JSON.stringify({ error: "Failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
