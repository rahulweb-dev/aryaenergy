import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard, Calendar, Car, FileText, Users, BarChart3, Settings, ShieldCheck,
  IndianRupee, CheckCircle2, Clock, TrendingUp, Search, Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bookings, trendData } from "@/data/ats";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { FadeIn, Counter } from "@/components/site/motion";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — ATS India" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Admin,
});

const nav = [
  { to: "/admin", label: "Dashboard",     icon: LayoutDashboard },
  { to: "/admin", label: "Appointments",  icon: Calendar },
  { to: "/admin", label: "Vehicles",      icon: Car },
  { to: "/admin", label: "Reports",       icon: FileText },
  { to: "/admin", label: "Customers",     icon: Users },
  { to: "/admin", label: "Analytics",     icon: BarChart3 },
  { to: "/admin", label: "Settings",      icon: Settings },
];

function Admin() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="grid min-h-screen grid-cols-1 bg-muted md:grid-cols-[260px_1fr]">
      <aside className="hidden gradient-dark p-5 text-white md:block">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">ATS India</div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">Admin</div>
          </div>
        </Link>
        <nav className="grid gap-1">
          {nav.map((n, i) => (
            <button
              key={n.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                i === 0 ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Signed in as <span className="font-medium text-white">admin@atsindia.test</span>
          <div className="mt-1 text-[11px] text-white/50">Path · {path}</div>
        </div>
      </aside>

      <div className="grid grid-rows-[auto_1fr]">
        <header className="glass sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-6">
          <div className="font-display text-lg font-semibold">Dashboard</div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search bookings, vehicles…" className="w-72 pl-8" />
            </div>
            <Button variant="outline" size="sm"><Download className="mr-1 h-4 w-4" /> Export</Button>
          </div>
        </header>

        <div className="grid gap-6 p-4 md:p-6">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Kpi icon={Calendar}    label="Today's Bookings" value={128}  suffix="" tone="brand" />
            <Kpi icon={CheckCircle2} label="Vehicles Tested" value={5842} suffix="" tone="success" />
            <Kpi icon={IndianRupee} label="Revenue (₹L)"     value={58}   suffix="L" tone="brand" />
            <Kpi icon={TrendingUp}  label="Pass Rate"        value={94}   suffix="%" tone="success" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Card title="Booking & Revenue Trends">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="bookings" stroke="var(--color-chart-1)" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="revenue"  stroke="var(--color-chart-2)" fill="url(#g2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Pass / Fail Analysis">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={[{ n: "Passed", v: 94 }, { n: "Failed", v: 6 }]} dataKey="v" nameKey="n" innerRadius={60} outerRadius={100} paddingAngle={2}>
                    <Cell fill="var(--color-chart-2)" />
                    <Cell fill="var(--color-destructive)" />
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card title="Testing Volume by Category">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={[
                { c: "Two Wheeler", v: 1240 },
                { c: "Car", v: 2180 },
                { c: "SUV", v: 890 },
                { c: "Commercial", v: 760 },
                { c: "Truck", v: 480 },
                { c: "Bus", v: 292 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="c" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="v" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Upcoming Appointments">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-xs">{b.id}</TableCell>
                      <TableCell>{b.customer}</TableCell>
                      <TableCell>{b.vehicle}</TableCell>
                      <TableCell className="text-muted-foreground">{b.date}</TableCell>
                      <TableCell><StatusChip s={b.status} /></TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card title="Recent Activity">
            <ul className="grid gap-3 text-sm">
              {[
                ["Certificate generated for DL 3C AB 1234", "2m ago"],
                ["New booking · MH 12 CD 5678", "12m ago"],
                ["Emission analyzer calibrated at Lane 3", "1h ago"],
                ["Revenue milestone: ₹1 crore this month", "3h ago"],
              ].map(([t, w]) => (
                <li key={t} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary"><Clock className="h-4 w-4" /></span>
                    {t}
                  </div>
                  <span className="text-xs text-muted-foreground">{w}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, suffix, tone }: { icon: typeof Calendar; label: string; value: number; suffix: string; tone: "brand" | "success" }) {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
          <span className={`grid h-9 w-9 place-items-center rounded-xl ${tone === "brand" ? "bg-primary/10 text-primary" : "bg-success/15 text-success"}`}>
            <Icon className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3 font-display text-3xl font-semibold">
          <Counter to={value} suffix={suffix} />
        </div>
      </div>
    </FadeIn>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
}

function StatusChip({ s }: { s: string }) {
  const tone =
    s === "Completed" ? "bg-primary/10 text-primary" :
    s === "In Progress" ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400" :
    s === "Failed" ? "bg-destructive/15 text-destructive" :
    "bg-muted text-muted-foreground";
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tone}`}>{s}</span>;
}
