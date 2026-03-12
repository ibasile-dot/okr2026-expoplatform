import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Trash2, Shield } from "lucide-react";
import { okrData } from "@/data/okrData";

interface Profile {
  id: string;
  display_name: string;
  email: string;
  is_admin: boolean;
}

interface Assignment {
  id: string;
  okr_number: number;
  user_id: string;
  role: string;
}

const AdminPage = () => {
  const { profile } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedOkr, setSelectedOkr] = useState("");
  const [selectedRole, setSelectedRole] = useState("owner");

  const fetchData = async () => {
    const [{ data: p }, { data: a }] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("okr_assignments").select("*"),
    ]);
    if (p) setProfiles(p as Profile[]);
    if (a) setAssignments(a as Assignment[]);
  };

  useEffect(() => { fetchData(); }, []);

  if (!profile?.is_admin) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
        <p className="text-muted-foreground mt-2">Only admins can manage OKR assignments.</p>
      </div>
    );
  }

  const handleAssign = async () => {
    if (!selectedUser || !selectedOkr) return;
    const { error } = await supabase.from("okr_assignments").upsert(
      { okr_number: Number(selectedOkr), user_id: selectedUser, role: selectedRole },
      { onConflict: "okr_number,user_id" }
    );
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Assignment saved" });
      fetchData();
    }
  };

  const handleRemove = async (id: string) => {
    await supabase.from("okr_assignments").delete().eq("id", id);
    toast({ title: "Assignment removed" });
    fetchData();
  };

  const handleToggleAdmin = async (userId: string, currentIsAdmin: boolean) => {
    await supabase.from("profiles").update({ is_admin: !currentIsAdmin }).eq("id", userId);
    toast({ title: currentIsAdmin ? "Admin removed" : "Admin granted" });
    fetchData();
  };

  const getUserName = (userId: string) => {
    const p = profiles.find((p) => p.id === userId);
    return p ? (p.display_name || p.email) : userId;
  };

  const getOkrTitle = (okrNumber: number) => {
    const okr = okrData.find((o) => o.id === okrNumber);
    return okr ? `OKR ${okr.id}: ${okr.shortTitle}` : `OKR ${okrNumber}`;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Admin: OKR Assignments</h1>
      <p className="text-sm text-muted-foreground mb-8">Assign team members to their OKRs. Only assigned owners/co-owners can edit.</p>

      {/* Team Members */}
      <div className="section-card p-6 mb-6">
        <h2 className="text-base font-semibold text-foreground mb-4">Team Members</h2>
        <div className="space-y-2">
          {profiles.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded bg-secondary/50 text-sm">
              <div>
                <span className="font-medium text-foreground">{p.display_name || "—"}</span>
                <span className="text-muted-foreground ml-2">{p.email}</span>
                {p.is_admin && (
                  <span className="ml-2 text-[10px] font-bold uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded">Admin</span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleAdmin(p.id, p.is_admin)}
                className="text-xs"
              >
                <Shield className="w-3 h-3 mr-1" />
                {p.is_admin ? "Remove Admin" : "Make Admin"}
              </Button>
            </div>
          ))}
          {profiles.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No team members registered yet.</p>
          )}
        </div>
      </div>

      {/* Assign OKR */}
      <div className="section-card p-6 mb-6">
        <h2 className="text-base font-semibold text-foreground mb-4">Assign OKR</h2>
        <div className="flex gap-3 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-medium text-foreground mb-1 block">Team Member</label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger><SelectValue placeholder="Select member" /></SelectTrigger>
              <SelectContent>
                {profiles.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.display_name || p.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-medium text-foreground mb-1 block">OKR</label>
            <Select value={selectedOkr} onValueChange={setSelectedOkr}>
              <SelectTrigger><SelectValue placeholder="Select OKR" /></SelectTrigger>
              <SelectContent>
                {okrData.map((o) => (
                  <SelectItem key={o.id} value={String(o.id)}>
                    OKR {o.id}: {o.shortTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-[140px]">
            <label className="text-xs font-medium text-foreground mb-1 block">Role</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="co-owner">Co-Owner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAssign} disabled={!selectedUser || !selectedOkr}>
            Assign
          </Button>
        </div>
      </div>

      {/* Current Assignments */}
      <div className="section-card p-6">
        <h2 className="text-base font-semibold text-foreground mb-4">Current Assignments</h2>
        {assignments.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No assignments yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 border-b-2 border-border">
                <th className="text-left p-3 font-semibold text-xs">OKR</th>
                <th className="text-left p-3 font-semibold text-xs">Team Member</th>
                <th className="text-left p-3 font-semibold text-xs">Role</th>
                <th className="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {assignments
                .sort((a, b) => a.okr_number - b.okr_number)
                .map((a) => (
                  <tr key={a.id} className="border-b border-border">
                    <td className="p-3">{getOkrTitle(a.okr_number)}</td>
                    <td className="p-3">{getUserName(a.user_id)}</td>
                    <td className="p-3 capitalize">{a.role}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleRemove(a.id)}
                        className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
