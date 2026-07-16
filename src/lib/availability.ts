import { format } from "date-fns";

export const ALL_SLOTS = [
  "08:00–10:00",
  "10:00–12:00",
  "12:00–14:00",
  "14:00–16:00",
  "16:00–18:00",
  "18:00–20:00",
];

export function fmtDate(d: Date) {
  return format(d, "yyyy-MM-dd");
}

export function addDays(n: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}

// Mock availability: yyyy-MM-dd -> booked slot labels.
// Mutable so reschedules can update it during the session.
export const BOOKED: Record<string, string[]> = {
  [fmtDate(addDays(0))]: [...ALL_SLOTS], // fully booked today
  [fmtDate(addDays(1))]: ["08:00–10:00", "10:00–12:00"],
  [fmtDate(addDays(2))]: ["14:00–16:00"],
  [fmtDate(addDays(3))]: ["10:00–12:00", "16:00–18:00", "18:00–20:00"],
  [fmtDate(addDays(5))]: [...ALL_SLOTS],
  [fmtDate(addDays(6))]: ["08:00–10:00"],
  [fmtDate(addDays(8))]: ["12:00–14:00", "14:00–16:00"],
};

export function bookedFor(date: Date | undefined) {
  if (!date) return [];
  return BOOKED[fmtDate(date)] ?? [];
}

export function isDayFull(d: Date) {
  return (BOOKED[fmtDate(d)]?.length ?? 0) >= ALL_SLOTS.length;
}

export function reserve(date: Date, slot: string) {
  const key = fmtDate(date);
  const list = BOOKED[key] ?? (BOOKED[key] = []);
  if (!list.includes(slot)) list.push(slot);
}

export function release(date: Date, slot: string) {
  const key = fmtDate(date);
  const list = BOOKED[key];
  if (!list) return;
  BOOKED[key] = list.filter((s) => s !== slot);
}
