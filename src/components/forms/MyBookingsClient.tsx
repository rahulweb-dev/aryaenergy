"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { format, parse } from "date-fns";
import { CalendarClock, Calendar as CalendarIcon, Car, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ALL_SLOTS } from "@/constants/slots";
import { findMyBookings, rescheduleBooking } from "@/app/my-bookings/actions";
import { getAvailableSlots } from "@/app/book/actions";
import { BusyOverlay } from "@/components/shared/BusyOverlay";
import { EmptyState } from "@/components/shared/EmptyState";

type Booking = {
  id: string;
  reference: string;
  ownerName: string;
  vehicleNumber: string;
  vehicleType: string;
  fuel: string;
  date: string;
  slot: string;
  status: string;
};

function addDays(n: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}
function fmtDate(d: Date) {
  return format(d, "yyyy-MM-dd");
}

export function MyBookingsClient() {
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [searched, setSearched] = useState(false);
  const [rows, setRows] = useState<Booking[]>([]);
  const [editing, setEditing] = useState<Booking | null>(null);

  const onSearch = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await findMyBookings(phone);
    setBusy(false);
    setSearched(true);

    if (!res.ok) {
      toast.error(res.error);
      setRows([]);
      return;
    }
    setRows(res.bookings);
  };

  return (
    <>
      <div className="relative">
        <BusyOverlay active={busy} />
        <form onSubmit={onSearch} className="glass shadow-soft flex gap-2 rounded-2xl p-2">
          <fieldset disabled={busy} className="flex flex-1 gap-2">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter the mobile number used at booking"
              className="border-0 bg-transparent focus-visible:ring-0"
            />
            <Button type="submit" disabled={busy} className="gradient-brand text-white">
              <Search className="mr-1 h-4 w-4" /> {busy ? "Searching…" : "Find bookings"}
            </Button>
          </fieldset>
        </form>
      </div>

      {searched && rows.length === 0 && (
        <EmptyState
          title="No bookings found"
          description="We couldn't find any appointments for that mobile number. Check that you entered the number used at booking, or book a new test."
          actionHref="/book"
          actionLabel="Book a test"
        />
      )}

      {searched && rows.length > 0 && (
        <div className="glass shadow-soft mt-8 rounded-3xl p-2 md:p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ref</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Slot</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((b) => {
                const d = parse(b.date, "yyyy-MM-dd", new Date());
                const canReschedule = b.status !== "Completed" && b.status !== "In Progress";
                return (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.reference}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{b.vehicleNumber}</div>
                          <div className="text-xs text-muted-foreground">{b.vehicleType} · {b.fuel}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{b.ownerName}</TableCell>
                    <TableCell>{format(d, "PPP")}</TableCell>
                    <TableCell>{b.slot}</TableCell>
                    <TableCell><StatusBadge status={b.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" disabled={!canReschedule} onClick={() => setEditing(b)}>
                        <CalendarClock className="mr-1 h-4 w-4" /> Reschedule
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <RescheduleDialog
        booking={editing}
        onClose={() => setEditing(null)}
        onConfirm={(updated) => {
          setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
          setEditing(null);
        }}
      />
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: "bg-primary/10 text-primary",
    "In Progress": "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
    Scheduled: "bg-success/15 text-success",
    Failed: "bg-destructive/15 text-destructive",
  };
  return <Badge variant="secondary" className={cn("rounded-full", map[status] ?? "")}>{status}</Badge>;
}

function RescheduleDialog({
  booking,
  onClose,
  onConfirm,
}: {
  booking: Booking | null;
  onClose: () => void;
  onConfirm: (b: Booking) => void;
}) {
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string>("");
  const [taken, setTaken] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const today = useMemo(() => addDays(0), []);
  const maxDate = useMemo(() => addDays(30), []);

  const open = booking !== null;

  useEffect(() => {
    if (booking) {
      setDate(parse(booking.date, "yyyy-MM-dd", new Date()));
      setSlot(booking.slot);
    } else {
      setDate(undefined);
      setSlot("");
      setTaken([]);
    }
  }, [booking]);

  useEffect(() => {
    if (!date) return;
    getAvailableSlots(fmtDate(date)).then(setTaken);
  }, [date]);

  const isSameAsCurrent = booking && date && fmtDate(date) === booking.date;

  const handleConfirm = async () => {
    if (!booking || !date || !slot) {
      toast.error("Pick a date and time slot.");
      return;
    }
    setBusy(true);
    const res = await rescheduleBooking({ id: booking.id, date: fmtDate(date), slot });
    setBusy(false);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success(`Booking ${booking.reference} rescheduled to ${format(date, "PPP")}, ${slot}.`);
    onConfirm({ ...booking, date: fmtDate(date), slot, status: "Scheduled" });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reschedule booking</DialogTitle>
          <DialogDescription>
            {booking && (
              <>
                Vehicle <span className="font-semibold text-foreground">{booking.vehicleNumber}</span>
                {booking.vehicleType ? ` · ${booking.vehicleType}` : ""}
                {booking.fuel ? ` · ${booking.fuel}` : ""}. Your vehicle details are preserved.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <Label>New date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn("mt-1.5 w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    if (booking && d && fmtDate(d) !== booking.date) setSlot("");
                  }}
                  disabled={(d) => d < today || d > maxDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>New time slot</Label>
            <Select value={slot} onValueChange={setSlot} disabled={!date}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder={date ? "Select a slot…" : "Pick a date first"} />
              </SelectTrigger>
              <SelectContent>
                {ALL_SLOTS.map((s) => {
                  const isOwnSlot = booking && isSameAsCurrent && s === booking.slot;
                  const disabled = taken.includes(s) && !isOwnSlot;
                  return (
                    <SelectItem key={s} value={s} disabled={disabled}>
                      {s}
                      {isOwnSlot && <span className="ml-2 text-xs text-primary">(current)</span>}
                      {disabled && <span className="ml-2 text-xs text-muted-foreground">(booked)</span>}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={busy} className="gradient-brand text-white">
            {busy ? "Saving…" : "Confirm reschedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
