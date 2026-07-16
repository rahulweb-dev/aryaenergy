"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { downloadCsv } from "@/lib/csv";

export type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
};

export type FilterOption = { key: string; label: string; options: string[] };

export function DataTable<T extends Record<string, unknown>>({
  endpoint,
  columns,
  filters = [],
  searchPlaceholder = "Search…",
  exportFilename = "export.csv",
  rowKey,
  refreshKey = 0,
}: {
  endpoint: string;
  columns: Column<T>[];
  filters?: FilterOption[];
  searchPlaceholder?: string;
  exportFilename?: string;
  rowKey: (row: T) => string;
  refreshKey?: number;
}) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [rows, setRows] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      search,
      page: String(page),
      limit: String(pageSize),
      ...activeFilters,
    });
    fetch(`${endpoint}?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setRows(data.rows ?? []);
        setTotal(data.total ?? 0);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, search, page, pageSize, JSON.stringify(activeFilters), refreshKey]);

  useEffect(() => {
    load();
  }, [load]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handleExport = async () => {
    const params = new URLSearchParams({ search, limit: "10000", page: "1", ...activeFilters });
    const res = await fetch(`${endpoint}?${params.toString()}`);
    const data = await res.json();
    downloadCsv(exportFilename, data.rows ?? []);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder={searchPlaceholder}
            className="pl-8"
          />
        </div>
        {filters.map((f) => (
          <Select
            key={f.key}
            value={activeFilters[f.key] ?? "all"}
            onValueChange={(v) => {
              setPage(1);
              setActiveFilters((prev) => {
                const next = { ...prev };
                if (v === "all") delete next[f.key];
                else next[f.key] = v;
                return next;
              });
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder={f.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {f.label}</SelectItem>
              {f.options.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-1 h-4 w-4" /> Export
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center text-sm text-muted-foreground">
                  Loading…
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center text-sm text-muted-foreground">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={rowKey(row)}>
                  {columns.map((c) => (
                    <TableCell key={c.key}>{c.render ? c.render(row) : String(row[c.key] ?? "")}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>{total} result{total === 1 ? "" : "s"}</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>Page {page} of {totalPages}</div>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
