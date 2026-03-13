import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TEAM_MEMBERS = [
  { email: "c.haddow@expoplatform.com", display_name: "Chris Haddow" },
  { email: "m.higginbotham@expoplatform.com", display_name: "Mike Higginbotham" },
  { email: "t.pinchuk@expoplatform.com", display_name: "Tanya Pinchuk" },
  { email: "c.laukemann@expoplatform.com", display_name: "Céline Laukemann" },
  { email: "t.melnyk@expoplatform.com", display_name: "Tetiana Melnyk" },
  { email: "b.malec@expoplatform.com", display_name: "Bartosz Malec" },
  { email: "a.singh@expoplatform.com", display_name: "Ajay Singh" },
  { email: "s.merola@expoplatform.com", display_name: "Susan Merola" },
  { email: "m.fastovets@expoplatform.com", display_name: "Mykyta Fastovets" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const results: { email: string; status: string; error?: string }[] = [];

    for (const member of TEAM_MEMBERS) {
      try {
        // Check if user already exists
        const { data: existingProfiles } = await supabaseAdmin
          .from("profiles")
          .select("email")
          .eq("email", member.email)
          .maybeSingle();

        if (existingProfiles) {
          results.push({ email: member.email, status: "already_registered" });
          continue;
        }

        const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
          member.email,
          {
            data: { display_name: member.display_name },
            redirectTo: "https://okr2026-expoplatform.lovable.app",
          }
        );

        if (error) {
          results.push({ email: member.email, status: "error", error: error.message });
        } else {
          results.push({ email: member.email, status: "invited" });
        }
      } catch (err) {
        results.push({ email: member.email, status: "error", error: String(err) });
      }
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
