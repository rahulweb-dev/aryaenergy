import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { format, parse } from "date-fns";
import { CalendarClock, Calendar as CalendarIcon, Car } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/layout";
import { FadeIn } from "@/components/site/motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ALL_SLOTS, BOOKED, addDays, fmtDate, bookedFor, isDayFull, reserve, release } from "@/lib/availability";
import { bookings as seedBookings } from "@/data/ats";

export const Route = createFileRoute("/my-bookings")({
  head: () => ({
    meta: [
      { title: "My Bookings — ATS India" },
      { name: "description", content: "View and reschedule your automated vehicle fitness test appointments." },
      { property: "og:title", content: "My Bookings — ATS India" },
      { property: "og:url", content: "/my-bookings" },
    ],
    links: [{ rel: "canonical", href: "/my-bookings" }],
  }),
  component: MyBookings,
});

type Slot = (typeof ALL_SLOTS)[number];

type Booking = {
  id: string;
  customer: string;
  vehicle: string;
  vehicleType?: string;
  fuel?: string;
  date: string; // yyyy-MM-dd
  slot: Slot;
  status: string;
};

// Map the seed bookings ("2026-07-15 09:30" + status) into our booking shape,
// spreading them across upcoming availability so demo reschedules are meaningful.
function seed(): Booking[] {
  const spread = [1, 2, 3, 4, 6, 7, 9];
  return seedBookings.map((b, i) => {
    const day = addDays(spread[i % spread.length]);
    // pick the first slot on that day that isn't already booked in the mock map
    const taken = BOOKED[fmtDate(day)] ?? [];
    const slot = (ALL_SLOTS.find((s) => !taken.includes(s)) ?? ALL_SLOTS[0]) as Slot;
    reserve(day, slot);
    return {
      id: b.id,
      customer: b.customer,
      vehicle: b.vehicle,
      vehicleType: i % 2 ? "Car" : "Commercial",
      fuel: i % 2 ? "Petrol" : "Diesel",
      date: fmtDate(day),
      slot,
      status: b.status,
    };
  });
}

function MyBookings() {
  const [rows, setRows] = useState<Booking[]>(() => seed());
  const [editing, setEditing] = useState<Booking | null>(null);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="My bookings"
        title="Manage your appointments."
        subtitle="Reschedule any upcoming test to a new available date and time — your vehicle details stay intact."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <FadeIn>
          <div className="glass shadow-soft rounded-3xl p-2 md:p-4">
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
                      <TableCell className="font-mono text-xs">{b.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-primary" />
                          <div>
                            <div className="font-medium">{b.vehicle}</div>
                            <div className="text-xs text-muted-foreground">{b.vehicleType} · {b.fuel}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{b.customer}</TableCell>
                      <TableCell>{format(d, "PPP")}</TableCell>
                      <TableCell>{b.slot}</TableCell>
                      <TableCell><StatusBadge status={b.status} /></TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!canReschedule}
                          onClick={() => setEditing(b)}
                        >
                          <CalendarClock className="mr-1 h-4 w-4" /> Reschedule
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </FadeIn>
      </div>

      <RescheduleDialog
        booking={editing}
        onClose={() => setEditing(null)}
        onConfirm={(updated) => {
          setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
          setEditing(null);
          toast.success(`Booking ${updated.id} rescheduled to ${format(parse(updated.date, "yyyy-MM-dd", new Date()), "PPP")}, ${updated.slot}.`);
        }}
      />
    </SiteLayout>
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

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => addDays(30), []);

  const open = booking !== null;

  useEffect(() => {
    if (booking) {
      setDate(parse(booking.date, "yyyy-MM-dd", new Date()));
      setSlot(booking.slot);
    } else {
      setDate(undefined);
      setSlot("");
    }
  }, [booking]);

  const taken = date ? bookedFor(date) : [];
  const isSameAsCurrent = booking && date && fmtDate(date) === booking.date;

  const handleConfirm = () => {
    if (!booking || !date || !slot) {
      toast.error("Pick a date and time slot.");
      return;
    }
    // A slot is available if it's not booked, OR it's the booking's own current slot.
    const isOwn = fmtDate(date) === booking.date && slot === booking.slot;
    if (!isOwn && taken.includes(slot)) {
      toast.error("That slot is no longer available.");
      return;
    }
    // Release the old slot, reserve the new one.
    const oldDate = parse(booking.date, "yyyy-MM-dd", new Date());
    release(oldDate, booking.slot);
    reserve(date, slot);
    onConfirm({ ...booking, date: fmtDate(date), slot: slot as Slot, status: "Scheduled" });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reschedule booking</DialogTitle>
          <DialogDescription>
            {booking && (
              <>
                Vehicle <span className="font-semibold text-foreground">{booking.vehicle}</span>
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
                    // reset slot unless the date is unchanged (keep current selection)
                    if (booking && d && fmtDate(d) !== booking.date) setSlot("");
                  }}
                  disabled={(d) => {
                    if (d < today || d > maxDate) return true;
                    // Allow the booking's own day even if it looks "full", since its
                    // current slot is theirs.
                    if (booking && fmtDate(d) === booking.date) return false;
                    return isDayFull(d);
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
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
            {date && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                {ALL_SLOTS.length - taken.length + (isSameAsCurrent ? 1 : 0)} of {ALL_SLOTS.length} slots available on {format(date, "PPP")}.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} className="gradient-brand text-white">Confirm reschedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
