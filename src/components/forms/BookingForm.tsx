"use client";

import { useEffect, useMemo, useState, useTransition, type ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BusyOverlay } from "@/components/shared/BusyOverlay";
import { toast } from "sonner";
import { CheckCircle2, Calendar as CalendarIcon, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { bookingSchema, type BookingInput } from "@/lib/validation/booking";
import { createBooking, getAvailableSlots } from "@/app/book/actions";
import { ALL_SLOTS } from "@/constants/slots";

function fmt(d: Date) {
  return format(d, "yyyy-MM-dd");
}
function addDays(n: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}

type Confirmation = {
  reference: string;
  vehicleNumber: string;
  date: string;
  slot: string;
};

export function BookingForm() {
  const [submitted, setSubmitted] = useState<Confirmation | null>(null);
  const [busy, setBusy] = useState(false);
  const [bookedForDate, setBookedForDate] = useState<string[]>([]);
  const [, startTransition] = useTransition();

  const today = useMemo(() => addDays(0), []);
  const maxDate = useMemo(() => addDays(30), []);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { date: "", slot: "", vehicleType: "", fuel: "" },
  });

  const date = watch("date");
  const selectedDate = date ? new Date(`${date}T00:00:00`) : undefined;

  useEffect(() => {
    if (!date) {
      setBookedForDate([]);
      return;
    }
    startTransition(() => {
      getAvailableSlots(date).then(setBookedForDate);
    });
  }, [date]);

  const onSubmit = async (data: BookingInput) => {
    setBusy(true);
    const result = await createBooking(data);
    setBusy(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setSubmitted({
      reference: result.reference,
      vehicleNumber: data.vehicleNumber,
      date: data.date,
      slot: data.slot,
    });
    toast.success("Appointment confirmed. Details sent to your email.");
  };

  if (submitted) {
    const whatsappText = encodeURIComponent(
      `My ATS India vehicle fitness test is confirmed!\nVehicle: ${submitted.vehicleNumber}\nDate: ${format(new Date(`${submitted.date}T00:00:00`), "PPP")}\nSlot: ${submitted.slot}\nReference: ${submitted.reference}`,
    );

    return (
      <div className="glass shadow-elevated rounded-3xl p-10 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-semibold">Booking confirmed</h2>
        <p className="mt-2 text-muted-foreground">Your reference number is</p>
        <div className="mt-3 font-display text-3xl font-semibold text-primary">{submitted.reference}</div>
        <div className="mx-auto mt-6 grid max-w-xs gap-1.5 rounded-2xl border border-dashed border-border p-4 text-left text-sm">
          <Row k="Vehicle" v={submitted.vehicleNumber} />
          <Row k="Date" v={format(new Date(`${submitted.date}T00:00:00`), "PPP")} />
          <Row k="Slot" v={submitted.slot} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">A confirmation has been sent to your email.</p>
        <a
          href={`https://wa.me/?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-success/15 px-4 py-2 text-sm font-medium text-success hover:bg-success/25"
        >
          <MessageCircle className="h-4 w-4" /> Share on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      <BusyOverlay active={busy} />
      <form onSubmit={handleSubmit(onSubmit)} className="glass shadow-soft rounded-3xl p-6 md:p-8">
        <fieldset disabled={busy} className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Owner name" error={errors.name?.message}>
              <Input placeholder="e.g. Rahul Mehta" {...register("name")} />
            </Field>
            <Field label="Mobile number" error={errors.phone?.message}>
              <Input placeholder="10-digit mobile" {...register("phone")} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <Input type="email" placeholder="you@example.com" {...register("email")} />
            </Field>
            <Field label="Vehicle number" error={errors.vehicleNumber?.message}>
              <Input placeholder="DL 3C AB 1234" {...register("vehicleNumber")} />
            </Field>

            <Field label="Vehicle type" error={errors.vehicleType?.message}>
              <Controller
                control={control}
                name="vehicleType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {["Two Wheeler", "Car", "SUV", "Commercial", "Truck", "Bus", "Electric"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field label="Fuel type" error={errors.fuel?.message}>
              <Controller
                control={control}
                name="fuel"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {["Petrol", "Diesel", "CNG", "LPG", "Electric", "Hybrid"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <div>
              <Label>Preferred date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn("mt-1.5 w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => {
                      setValue("date", d ? fmt(d) : "", { shouldValidate: true });
                      setValue("slot", "", { shouldValidate: true });
                    }}
                    disabled={(d) => d < today || d > maxDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date.message}</p>}
            </div>

            <div>
              <Label>Preferred time slot</Label>
              <Controller
                control={control}
                name="slot"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange} disabled={!date}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder={date ? "Select a slot…" : "Pick a date first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_SLOTS.map((s) => {
                        const taken = bookedForDate.includes(s);
                        return (
                          <SelectItem key={s} value={s} disabled={taken}>
                            {s} {taken && <span className="ml-2 text-xs text-muted-foreground">(booked)</span>}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              {date && selectedDate && (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {ALL_SLOTS.length - bookedForDate.length} of {ALL_SLOTS.length} slots available on {format(selectedDate, "PPP")}.
                </p>
              )}
              {errors.slot && <p className="mt-1 text-xs text-destructive">{errors.slot.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="remarks">Remarks (optional)</Label>
            <Textarea id="remarks" rows={3} placeholder="Any information we should know?" className="mt-1.5" {...register("remarks")} />
          </div>
          <Button type="submit" size="lg" disabled={busy} className="gradient-brand text-white shadow-elevated">
            {busy ? "Confirming…" : "Confirm booking"}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
