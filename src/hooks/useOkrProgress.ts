import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { okrData } from "@/data/okrData";

export function useOkrProgress() {
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data } = await supabase
        .from("okr_metric_values")
        .select("okr_number, value")
        .eq("kr_number", 0)
        .eq("column_key", "progress")
        .eq("row_index", 0);

      if (data) {
        const map: Record<number, number> = {};
        data.forEach((row) => {
          const val = parseInt(row.value, 10);
          if (!isNaN(val)) map[row.okr_number] = val;
        });
        setProgressMap(map);
      }
      setLoading(false);
    };
    fetchProgress();
  }, []);

  const saveProgress = useCallback(async (okrNumber: number, value: number) => {
    const clamped = Math.max(0, Math.min(100, value));
    setProgressMap((prev) => ({ ...prev, [okrNumber]: clamped }));

    await supabase
      .from("okr_metric_values")
      .upsert(
        {
          okr_number: okrNumber,
          kr_number: 0,
          column_key: "progress",
          row_index: 0,
          value: String(clamped),
        },
        { onConflict: "okr_number,kr_number,column_key,row_index" }
      );
  }, []);

  const overallProgress = useMemo(() => {
    const total = okrData.length;
    if (total === 0) return 0;
    const sum = okrData.reduce((acc, okr) => acc + (progressMap[okr.id] ?? 0), 0);
    return Math.round(sum / total);
  }, [progressMap]);

  return { progressMap, overallProgress, saveProgress, loading };
}
