import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface OkrAssignment {
  id: string;
  okr_number: number;
  user_id: string;
  role: string;
}

export function useOkrAssignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<OkrAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignments = useCallback(async () => {
    const { data } = await supabase
      .from("okr_assignments")
      .select("*");
    if (data) setAssignments(data as OkrAssignment[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) fetchAssignments();
  }, [user, fetchAssignments]);

  const canEdit = useCallback(
    (okrNumber: number) => {
      if (!user) return false;
      return assignments.some(
        (a) => a.okr_number === okrNumber && a.user_id === user.id
      );
    },
    [user, assignments]
  );

  return { assignments, canEdit, loading, refetch: fetchAssignments };
}
