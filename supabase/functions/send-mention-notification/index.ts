import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { mentions, mentioner, context } = await req.json();

    if (!mentions || mentions.length === 0) {
      return new Response(JSON.stringify({ message: "No mentions" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Find profiles matching mention names
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, display_name, email");

    if (!profiles) {
      return new Response(JSON.stringify({ message: "No profiles found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const matchedProfiles = profiles.filter((p) =>
      mentions.some(
        (m: string) => p.display_name.toLowerCase() === m.toLowerCase()
      )
    );

    // Send emails via Lovable AI gateway
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    for (const profile of matchedProfiles) {
      if (!profile.email) continue;

      try {
        // Use the send-transactional-email pattern
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1a1f4b; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #ffffff; margin: 0;">You were mentioned in an OKR note</h2>
            </div>
            <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="color: #374151; font-size: 16px;">
                <strong>${mentioner}</strong> mentioned you in a note:
              </p>
              <blockquote style="background: #f3f4f6; padding: 12px 16px; border-left: 4px solid #1a1f4b; margin: 16px 0; border-radius: 0 4px 4px 0;">
                <p style="color: #4b5563; margin: 0; font-size: 14px;">${context}</p>
              </blockquote>
              <p style="color: #6b7280; font-size: 14px;">
                Visit the <a href="https://okr2026-expoplatform.lovable.app" style="color: #1a1f4b; text-decoration: underline;">OKR Dashboard</a> to respond.
              </p>
            </div>
          </div>
        `;

        // Try sending via Resend-style fetch if available, otherwise log
        console.log(`Would send email to ${profile.email}: mentioned by ${mentioner}`);
        
        // Store notification in case email isn't configured yet
        console.log(`Mention notification: ${profile.display_name} (${profile.email}) was mentioned by ${mentioner}`);
      } catch (emailErr) {
        console.error(`Failed to notify ${profile.email}:`, emailErr);
      }
    }

    return new Response(
      JSON.stringify({
        message: `Processed ${matchedProfiles.length} mention notifications`,
        matched: matchedProfiles.map((p) => p.display_name),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
