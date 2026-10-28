import { useState } from "react";
import { format } from "date-fns";
import { Check, ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { departments, timeSlots } from "@/data/site";
import { cn } from "@/lib/utils";

const steps = ["Department", "Date & time", "Your details", "Review"];

type Form = { dept: string; doctor: string; date?: Date; time: string; name: string; phone: string; email: string; notes: string };
const empty: Form = { dept: "", doctor: "", time: "", name: "", phone: "", email: "", notes: "" };

export function Booking() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<"dept" | "date" | "time" | "name" | "phone" | "email" | "notes", string>>>({});
  const [done, setDone] = useState<string | null>(null);
  const dept = departments.find((d) => d.id === f.dept);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  function validate(s: number) {
    const e: typeof errors = {};
    if (s === 0 && !f.dept) e.dept = "Please choose a department.";
    if (s === 1) {
      if (!f.date) e.date = "Please pick a date.";
      if (!f.time) e.time = "Please pick a time.";
    }
    if (s === 2) {
      if (f.name.trim().length < 2) e.name = "Please enter your full name.";
      if (!/^\+?[0-9 ]{9,15}$/.test(f.phone.trim())) e.phone = "Enter a valid phone number, e.g. 0712 345 678.";
      if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
      if (f.notes.length > 500) e.notes = "Keep it under 500 characters.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  const next = () => validate(step) && setStep((s) => s + 1);
  const submit = () => {
    const ref = "RK-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setDone(ref);
    toast.success("Appointment requested", { description: `Reference ${ref}` });
  };

  const input = "mt-1.5 block w-full min-h-12 rounded-xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary";

  if (done)
    return (
      <div className="rounded-3xl bg-card p-8 text-center shadow-soft md:p-12" role="status">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-secondary text-secondary-foreground"><CalendarCheck className="size-8" /></div>
        <h3 className="mt-5 text-2xl font-bold text-navy">You're booked in, {f.name.split(" ")[0]}!</h3>
        <p className="mt-2 text-muted-foreground">
          {dept?.name} · {f.date && format(f.date, "EEEE, d MMMM")} at {f.time}. Reference <strong className="text-foreground">{done}</strong>.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">This is a demo — no real appointment was made.</p>
        <button onClick={() => { setDone(null); setF(empty); setStep(0); }} className="mt-6 min-h-12 rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground shadow-glow">Book another</button>
      </div>
    );

  return (
    <div className="rounded-3xl bg-card p-5 shadow-soft sm:p-8">
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Booking progress">
        {steps.map((s, i) => (
          <li key={s} className="min-w-0" aria-current={i === step ? "step" : undefined}>
            <div className={cn("h-1.5 rounded-full", i <= step ? "bg-gradient-primary" : "bg-muted")} />
            <span className={cn("mt-2 block truncate text-xs font-medium sm:text-sm", i === step ? "text-primary" : "text-muted-foreground")}>
              <span className="sr-only">Step {i + 1}: </span>{s}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend className="text-lg font-bold text-navy">Which department do you need?</legend>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {departments.map((d) => (
              <label key={d.id} className={cn("flex min-h-24 cursor-pointer flex-col items-start gap-2 rounded-2xl border-2 p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring", f.dept === d.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40")}>
                <input type="radio" name="dept" value={d.id} checked={f.dept === d.id} onChange={() => { set("dept", d.id); set("doctor", d.doctors[0] ?? ""); }} className="sr-only" />
                <d.icon className="size-5 text-primary" aria-hidden />
                <span className="text-sm font-semibold text-foreground">{d.name}</span>
              </label>
            ))}
          </div>
          {errors.dept && <p role="alert" className="mt-3 text-sm font-medium text-destructive">{errors.dept}</p>}
          {dept && dept.doctors.length > 1 && (
            <div className="mt-5 max-w-sm">
              <label htmlFor="doctor" className="text-sm font-semibold">Preferred doctor</label>
              <select id="doctor" className={input} value={f.doctor} onChange={(e) => set("doctor", e.target.value)}>
                {dept.doctors.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          )}
        </fieldset>
      )}

      {step === 1 && (
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          <div>
            <h3 className="text-lg font-bold text-navy">Pick a date</h3>
            <Calendar
              mode="single"
              selected={f.date}
              onSelect={(d) => set("date", d)}
              disabled={(d) => d < new Date(new Date().toDateString()) || d.getDay() === 0}
              className="pointer-events-auto mt-3 rounded-2xl border border-border p-3"
            />
            <p className="mt-2 text-xs text-muted-foreground">Clinics are closed on Sundays.</p>
            {errors.date && <p role="alert" className="mt-2 text-sm font-medium text-destructive">{errors.date}</p>}
          </div>
          <fieldset className="min-w-0">
            <legend className="text-lg font-bold text-navy">Pick a time</legend>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {timeSlots.map((t, i) => {
                const taken = i % 5 === 2;
                return (
                  <button key={t} type="button" disabled={taken} aria-pressed={f.time === t} onClick={() => set("time", t)}
                    className={cn("min-h-12 rounded-xl border-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 disabled:line-through",
                      f.time === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50")}>
                    {t}
                  </button>
                );
              })}
            </div>
            {errors.time && <p role="alert" className="mt-3 text-sm font-medium text-destructive">{errors.time}</p>}
          </fieldset>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {([
            ["name", "Full name", "text", "name", "Jane Wambui"],
            ["phone", "Phone number", "tel", "tel", "0712 345 678"],
            ["email", "Email (optional)", "email", "email", "jane@example.com"],
          ] as const).map(([k, label, type, ac, ph]) => (
            <div key={k} className={k === "email" ? "sm:col-span-2" : ""}>
              <label htmlFor={k} className="text-sm font-semibold">{label}</label>
              <input id={k} type={type} autoComplete={ac} placeholder={ph} value={f[k]} onChange={(e) => set(k, e.target.value)}
                aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined}
                className={cn(input, errors[k] && "border-destructive")} />
              {errors[k] && <p id={`${k}-err`} className="mt-1 text-sm font-medium text-destructive">{errors[k]}</p>}
            </div>
          ))}
          <div className="sm:col-span-2">
            <label htmlFor="notes" className="text-sm font-semibold">Tell us what's wrong (optional)</label>
            <textarea id="notes" rows={4} value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="e.g. Chest pain when climbing stairs for the past week"
              aria-describedby="notes-hint" className={cn(input, "py-3")} />
            <p id="notes-hint" className={cn("mt-1 text-xs", errors.notes ? "text-destructive" : "text-muted-foreground")}>{errors.notes ?? `${f.notes.length}/500`}</p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-lg font-bold text-navy">Check your details</h3>
          <dl className="mt-4 divide-y divide-border rounded-2xl border border-border">
            {[
              ["Department", dept?.name],
              ["Doctor", f.doctor],
              ["Date", f.date && format(f.date, "EEEE, d MMMM yyyy")],
              ["Time", f.time],
              ["Name", f.name],
              ["Phone", f.phone],
              ["Email", f.email || "—"],
              ["Notes", f.notes || "—"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 px-4 py-3 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="break-words font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0}
          className="inline-flex min-h-12 items-center gap-1 rounded-full px-4 font-semibold text-navy hover:bg-muted disabled:invisible">
          <ChevronLeft className="size-4" /> Back
        </button>
        {step < 3 ? (
          <button type="button" onClick={next} className="inline-flex min-h-12 items-center gap-1 rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground shadow-glow">
            Continue <ChevronRight className="size-4" />
          </button>
        ) : (
          <button type="button" onClick={submit} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground shadow-glow">
            <Check className="size-4" /> Confirm booking
          </button>
        )}
      </div>
    </div>
  );
}
