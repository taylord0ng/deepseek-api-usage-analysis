"use client";

import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { useData } from "@/lib/DataContext";

export default function OverviewView() {
  const { result } = useData();
  if (!result) return null;

  const { daily, keys } = result;

  // Daily cost bar chart
  const dailyOption = useMemo(() => {
    const dates = [...new Set(daily.map((d) => d.date))].sort();
    const byDate = new Map<string, number>();
    for (const d of daily) {
      byDate.set(d.date, (byDate.get(d.date) ?? 0) + (d.cost ?? 0));
    }

    return {
      tooltip: {
        trigger: "axis" as const,
        valueFormatter: (v: unknown) => `¥${(v as number).toFixed(2)}`,
      },
      grid: { top: 8, right: 16, bottom: 24, left: 48 },
      xAxis: {
        type: "category" as const,
        data: dates,
        axisLabel: { fontSize: 10, rotate: dates.length > 15 ? 45 : 0 },
      },
      yAxis: {
        type: "value" as const,
        axisLabel: { fontSize: 10, formatter: (v: number) => `¥${v}` },
      },
      series: [
        {
          type: "bar",
          data: dates.map((d) => +(byDate.get(d) ?? 0).toFixed(4)),
          itemStyle: { color: "#3b82f6", borderRadius: [4, 4, 0, 0] },
        },
      ],
    };
  }, [daily]);

  // Cost by key donut
  const donutOption = useMemo(() => {
    const data = keys.map((k) => ({
      name: k.apiKeyName,
      value: +k.totalCost.toFixed(4),
    }));

    return {
      tooltip: {
        trigger: "item" as const,
        valueFormatter: (v: unknown) => `¥${(v as number).toFixed(2)}`,
      },
      legend: {
        orient: "vertical" as const,
        right: 0,
        top: "center",
        textStyle: { fontSize: 11 },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          center: ["35%", "50%"],
          data,
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 12, fontWeight: "bold" },
          },
        },
      ],
    };
  }, [keys]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Daily Cost</h3>
        <ReactECharts option={dailyOption} style={{ height: 280 }} />
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Cost by API Key</h3>
        <ReactECharts option={donutOption} style={{ height: 280 }} />
      </div>
    </div>
  );
}
