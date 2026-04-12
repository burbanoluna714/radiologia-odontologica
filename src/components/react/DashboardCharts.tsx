import React from "react";
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import type { Diagnosis } from "@/domain/types";
import { SECTIONS, type SectionKey } from "@/domain/sections";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
  diagnosis: Diagnosis;
}

export function DashboardCharts({ diagnosis }: Props) {
  // Data prep for Bar & Radar
  const data = SECTIONS.map((s) => ({
    name: s.label,
    shortName: s.prefix, // Corto para que quepa bien en radares/XAxis
    score: diagnosis.sectionScores[s.key as SectionKey] ?? 0,
    meta: 100, // Benchmark ideal
  }));

  const COLORS = [
    "#0ea5e9", // sky-500
    "#3b82f6", // blue-500
    "#6366f1", // indigo-500
    "#8b5cf6", // violet-500
    "#d946ef", // fuchsia-500
    "#ec4899", // pink-500
    "#f43f5e", // rose-500
  ];

  const totalScore = diagnosis.totalScore;
  let gaugeColor = "#22c55e"; // green-500
  if (totalScore < 100) gaugeColor = "#ef4444"; // red-500 (since it requires 100% now)
  
  // Custom Tooptip for Recharts to adapt to dark mode nicely
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border shadow-xl rounded-xl p-3 text-sm font-body">
          <p className="font-semibold mb-1 opacity-80">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill || payload[0].color }} />
            <span className="font-medium">{payload[0].name}: {payload[0].value}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const gaugeData = [
    { name: "Obtenido", value: totalScore },
    { name: "Faltante", value: 100 - totalScore },
  ];

  return (
    <div className="flex flex-col gap-6 mt-8 mb-8">
      {/* 1. Bar Chart Principal */}
      <Card className="shadow-md border-primary/10 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-heading text-foreground">Desempeño Detallado por Sección</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis dataKey="shortName" tick={{ fill: "currentColor", opacity: 0.7, fontSize: 13 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis dataKey="score" tick={{ fill: "currentColor", opacity: 0.7, fontSize: 13 }} axisLine={false} tickLine={false} domain={[0, 100]} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "currentColor", opacity: 0.05 }} />
                <Bar dataKey="score" name="Puntaje" radius={[6, 6, 0, 0]} maxBarSize={60} animationDuration={1500}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 2. KPI / Gauge (Promedio / Total) */}
      <Card className="shadow-md border-primary/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />
        <CardHeader className="text-center pb-0 relative z-10">
          <CardTitle className="text-xl font-heading">Cumplimiento Global</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-2 flex flex-col items-center justify-end h-full relative z-10">
          <div className="h-[200px] sm:h-[240px] w-full relative drop-shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius="85%"
                  outerRadius="100%"
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={8}
                  animationDuration={1500}
                >
                  <Cell fill={gaugeColor} />
                  <Cell fill="currentColor" opacity={0.08} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-4 left-0 w-full text-center flex flex-col items-center">
              <span className={`text-5xl sm:text-7xl leading-none font-heading font-black tabular-nums tracking-tighter drop-shadow-sm`} style={{ color: gaugeColor }}>
                {totalScore}<span className="text-2xl sm:text-4xl"> %</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
