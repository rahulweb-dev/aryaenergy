"use client";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

export function BookingTrendChart({ data }: { data: { m: string; bookings: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="bookingTrendFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="bookings" stroke="var(--color-chart-1)" fill="url(#bookingTrendFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PassFailChart({ passed, failed }: { passed: number; failed: number }) {
  const hasData = passed + failed > 0;
  const data = hasData ? [{ n: "Passed", v: passed }, { n: "Failed", v: failed }] : [{ n: "No data yet", v: 1 }];
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="v" nameKey="n" innerRadius={60} outerRadius={100} paddingAngle={2}>
          {hasData ? (
            <>
              <Cell fill="var(--color-chart-2)" />
              <Cell fill="var(--color-destructive)" />
            </>
          ) : (
            <Cell fill="var(--color-muted)" />
          )}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

const PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function DistributionChart({ data }: { data: { n: string; v: number }[] }) {
  const hasData = data.some((d) => d.v > 0);
  const chartData = hasData ? data : [{ n: "No data yet", v: 1 }];
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={chartData} dataKey="v" nameKey="n" innerRadius={60} outerRadius={100} paddingAngle={2}>
          {chartData.map((d, i) => (
            <Cell key={d.n} fill={hasData ? PIE_COLORS[i % PIE_COLORS.length] : "var(--color-muted)"} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CategoryVolumeChart({ data }: { data: { c: string; v: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="c" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="v" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
