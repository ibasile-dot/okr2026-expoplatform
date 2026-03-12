import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { roadmapData } from "@/data/roadmapData";

export function useRoadmapProgress() {
  const [savedStatuses, setSavedStatuses] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("okr_metric_values")
        .select("row_index, value, okr_number")
        .eq("kr_number", 0)
        .eq("column_key", "roadmap_status");

      if (data) {
        const map: Record<number, string> = {};
        data.forEach((row) => {
          map[row.row_index] = row.value;
        });
        setSavedStatuses(map);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const getStatus = (idx: number, defaultStatus: string) =>
    savedStatuses[idx] || defaultStatus;

  const progressByOkr = useMemo(() => {
    const result: Record<number, number> = {};
    const counts: Record<number, { total: number; done: number }> = {};

    roadmapData.forEach((item, idx) => {
      if (!counts[item.okr]) counts[item.okr] = { total: 0, done: 0 };
      counts[item.okr].total++;
      if (getStatus(idx, item.defaultStatus) === "Done") {
        counts[item.okr].done++;
      }
    });

    for (const okr in counts) {
      const { total, done } = counts[okr];
      result[Number(okr)] = total > 0 ? Math.round((done / total) * 100) : 0;
    }

    return result;
  }, [savedStatuses]);

  const overallProgress = useMemo(() => {
    const total = roadmapData.length;
    const done = roadmapData.filter(
      (item, idx) => getStatus(idx, item.defaultStatus) === "Done"
    ).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [savedStatuses]);

  return { progressByOkr, overallProgress, loading };
}
