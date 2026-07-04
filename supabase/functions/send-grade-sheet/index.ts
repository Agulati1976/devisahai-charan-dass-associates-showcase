import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const GRADE_SHEETS: Record<string, { url: string; label: string }> = {
  PP: {
    url: "https://drive.google.com/uc?export=download&id=1BAIlcx-bSrRaJNmMpfLi1yjp4jr__yCl",
    label: "PP (Polypropylene) — Repol®",
  },
  PET: {
    url: "https://drive.google.com/uc?export=download&id=1IG1Jb0xWKjArUlnEB7QfpZROGaIVaLQ9",
    label: "PET (Polyethylene Terephthalate) — Relpet®",
  },
  PVC: {
    url: "https://drive.google.com/uc?export=download&id=14-blVKPMwu_DY5ma08OO0IHPtIVrG6mp",
    label: "PVC (Polyvinyl Chloride) — Reon®",
  },
  PE: {
    url: "https://drive.google.com/uc?export=download&id=1p1KSBIpx6ACrL62NFwQdNnkM3fr3Rj2N",
    label: "PE (Polyethylene) — Relene®",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const { name, email, company, productKey } = await req.json();

    if (!name || !email || !productKey) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const product = GRADE_SHEETS[productKey];
    if (!product) {
      return new Response(JSON.stringify({ error: "Invalid product" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#003399;padding:30px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">
                Devisahai Charan Dass Associates
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
                Authorised DCA of Reliance Industries Ltd.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px 40px;">
              <p style="margin:0 0 20px;color:#333333;font-size:15px;line-height:1.6;">
                Dear ${name},
              </p>
              <p style="margin:0 0 20px;color:#555555;font-size:14px;line-height:1.6;">
                Thank you for your interest in our polymer products. Please find below the download link for the <strong>${product.label}</strong> grade sheet.
              </p>

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:10px 0 25px;">
                    <a href="${product.url}" 
                       style="display:inline-block;background-color:#003399;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:6px;font-size:14px;font-weight:600;letter-spacing:0.3px;">
                      Download Grade Sheet
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 15px;color:#555555;font-size:14px;line-height:1.6;">
                If you have any specific requirements or need further details about our product range, feel free to reach out to us. Our team will be happy to assist you.
              </p>

              ${company ? `<p style="margin:0 0 15px;color:#777777;font-size:13px;">Company: ${company}</p>` : ""}

              <hr style="border:none;border-top:1px solid #e8e8e8;margin:25px 0;" />

              <p style="margin:0;color:#333333;font-size:14px;font-weight:600;">Best Regards,</p>
              <p style="margin:4px 0 0;color:#555555;font-size:13px;">Team DCDA — Polymers Division</p>
              <p style="margin:4px 0 0;color:#777777;font-size:12px;">+91 98101 00045 · info@devisahaicharandass.com</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #eeeeee;">
              <p style="margin:0;color:#999999;font-size:11px;line-height:1.5;">
                Devisahai Charan Dass Associates<br/>
                Authorised DCA of Reliance Industries Ltd. since 1972<br/>
                www.devisahaicharandass.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Send to user
    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Devisahai Charan Dass Associates <no-reply@devisahaicharandass.com>",
        to: [email],
        bcc: ["info@devisahaicharandass.com"],
        subject: `${product.label} — Grade Sheet Download`,
        html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Resend API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending grade sheet email:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
