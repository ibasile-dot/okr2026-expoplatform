import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MetricValue {
  okr_number: number;
  kr_number: number;
  row_index: number;
  column_key: string;
  value: string;
}

export function useMetricValues(okrNumber: number, krNumber: number) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const makeKey = (rowIndex: number, columnKey: string) =>
    `${rowIndex}-${columnKey}`;

  useEffect(() => {
    const fetchValues = async () => {
      const { data } = await supabase
        .from("okr_metric_values")
        .select("row_index, column_key, value")
        .eq("okr_number", okrNumber)
        .eq("kr_number", krNumber);

      if (data) {
        const map: Record<string, string> = {};
        data.forEach((row) => {
          map[makeKey(row.row_index, row.column_key)] = row.value;
        });
        setValues(map);
      }
      setLoading(false);
    };

    fetchValues();
  }, [okrNumber, krNumber]);

  const saveValue = useCallback(
    async (rowIndex: number, columnKey: string, value: string) => {
      const key = makeKey(rowIndex, columnKey);
      setValues((prev) => ({ ...prev, [key]: value }));

      await supabase.from("okr_metric_values").upsert(
        {
          okr_number: okrNumber,
          kr_number: krNumber,
          row_index: rowIndex,
          column_key: columnKey,
          value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "okr_number,kr_number,row_index,column_key" }
      );
    },
    [okrNumber, krNumber]
  );

  const getValue = useCallback(
    (rowIndex: number, columnKey: string) => {
      return values[makeKey(rowIndex, columnKey)] ?? "";
    },
    [values]
  );

  return { getValue, saveValue, loading };
}
