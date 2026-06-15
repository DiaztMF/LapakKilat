"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface VisitsChartProps {
  data: {
    day: string;
    views: number;
    clicks: number;
  }[];
}

export function VisitsChart({ data }: VisitsChartProps) {
  const chartConfig = {
    views: {
      label: "Pengunjung",
      color: "#10b981", // emerald-500
    },
    clicks: {
      label: "Klik WhatsApp",
      color: "#3b82f6", // blue-500
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col border border-gray-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="grid gap-1.5">
          <CardTitle className="text-lg font-bold">Tren Kunjungan</CardTitle>
          <CardDescription>Visualisasi aktivitas tokomu dalam 7 hari terakhir (Data Riil)</CardDescription>
        </div>
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 font-medium border-none shadow-none">
          Metrik Aktif
        </Badge>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-100" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="font-medium text-gray-500"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="font-medium text-gray-500"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="views"
              type="monotone"
              stroke="var(--color-views)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="clicks"
              type="monotone"
              stroke="var(--color-clicks)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
