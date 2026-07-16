import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/layout";
import { FadeIn } from "@/components/site/motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { CheckCircle2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { ALL_SLOTS, BOOKED, addDays, fmtDate as fmt, isDayFull, reserve } from "@/lib/availability";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Appointment — ATS India" },
      { name: "description", content: "Reserve your automated vehicle fitness test slot in 60 seconds." },
      { property: "og:title", content: "Book Appointment — ATS India" },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: Book,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email").max(160),
  vehicleNumber: z.string().trim().min(4, "Enter vehicle number").max(15),
  vehicleType: z.string().min(1, "Choose a type"),
  fuel: z.string().min(1, "Choose a fuel type"),
  date: z.string().min(1, "Pick a date"),
  slot: z.string().min(1, "Pick a slot"),
  remarks: z.string().max(400).optional(),
});

function Book() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string>("");

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => addDays(30), []);

  const bookedForDate = date ? BOOKED[fmt(date)] ?? [] : [];

  

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(fd.entries()),
      date: date ? fmt(date) : "",
      slot,
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    if (bookedForDate.includes(slot)) {
      toast.error("That slot was just booked. Please pick another.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      if (date) reserve(date, slot);
      const ref = "ATS-" + Math.floor(100000 + Math.random() * 900000);
      setSubmitted(ref);
      toast.success("Appointment confirmed. Details sent to your WhatsApp.");
    }, 800);
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Book appointment"
        title="Reserve your slot in 60 seconds."
        subtitle="You'll receive a confirmation on WhatsApp and email with your booking reference and QR check-in."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.4fr_1fr] md:px-6">
        <FadeIn>
          {submitted ? (
            <div className="glass shadow-elevated rounded-3xl p-10 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-semibold">Booking confirmed</h2>
              <p className="mt-2 text-muted-foreground">Your reference number is</p>
              <div className="mt-3 font-display text-3xl font-semibold text-primary">{submitted}</div>
              <p className="mt-4 text-sm text-muted-foreground">A confirmation with directions and QR check-in has been sent to your WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="glass shadow-soft grid gap-5 rounded-3xl p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Owner name" name="name" placeholder="e.g. Rahul Mehta" />
                <Field label="Mobile number" name="phone" placeholder="10-digit mobile" />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                <Field label="Vehicle number" name="vehicleNumber" placeholder="DL 3C AB 1234" />
                <SelectField label="Vehicle type" name="vehicleType" options={["Two Wheeler", "Car", "SUV", "Commercial", "Truck", "Bus", "Electric"]} />
                <SelectField label="Fuel type" name="fuel" options={["Petrol", "Diesel", "CNG", "LPG", "Electric", "Hybrid"]} />

                <div>
                  <Label>Preferred date</Label>
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
                          setSlot("");
                        }}
                        disabled={(d) => d < today || d > maxDate || isDayFull(d)}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Preferred time slot</Label>
                  <Select value={slot} onValueChange={setSlot} disabled={!date}>
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
                  {date && (
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {ALL_SLOTS.length - bookedForDate.length} of {ALL_SLOTS.length} slots available on {format(date, "PPP")}.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="remarks">Remarks (optional)</Label>
                <Textarea id="remarks" name="remarks" rows={3} placeholder="Any information we should know?" className="mt-1.5" />
              </div>
              <Button type="submit" size="lg" disabled={busy} className="gradient-brand text-white shadow-elevated">
                {busy ? "Confirming…" : "Confirm booking"}
              </Button>
            </form>
          )}
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-4">
            <SideCard icon={CalendarIcon} title="Same-day slots" body="Most centres have availability within 2 hours." />
            <SideCard icon={Clock} title="Under 15 minutes" body="Average time from lane entry to certificate." />
            <SideCard icon={CheckCircle2} title="Free re-test" body="Failed a parameter? Fix it and re-test at 50% within 15 days." />
          </div>
        </FadeIn>
      </div>
    </SiteLayout>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} required className="mt-1.5" {...rest} />
    </div>
  );
}
function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} required>
        <SelectTrigger className="mt-1.5">
          <SelectValue placeholder="Select…" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
function SideCard({ icon: Icon, title, body }: { icon: typeof CalendarIcon; title: string; body: string }) {
  return (
    <div className="glass shadow-soft rounded-2xl p-5">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
