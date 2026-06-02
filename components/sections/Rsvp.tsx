"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageProvider";
import { Section, SectionHeading } from "../SectionFrame";
import { ScrollReveal } from "../ScrollReveal";
import { GoldButton } from "../GoldButton";
import { FiligreeDivider } from "../Filigree";

type Form = {
  attending: "accept" | "decline" | null;
  events: Record<string, boolean>;
  party: number;
  name: string;
  contact: string;
  hasChildren: "yes" | "no" | null;
  childCount: number;
  song: string;
  message: string;
};

const INITIAL: Form = {
  attending: null,
  events: { henna: false, katb: false, reception: false },
  party: 1,
  name: "",
  contact: "",
  hasChildren: null,
  childCount: 0,
  song: "",
  message: "",
};

function isValidContact(v: string): boolean {
  const trimmed = v.trim();
  if (trimmed.length < 4) return false;
  if (trimmed.includes("@")) {
    return /\S+@\S+\.\S+/.test(trimmed);
  }
  // phone-ish: at least 6 digits
  return (trimmed.replace(/\D/g, "").length >= 6);
}

export function Rsvp() {
  const { pick, t, dir } = useLang();
  const [form, setForm] = useState<Form>(INITIAL);
  const [step, setStep] = useState(0); // 0..5 → 6 steps; 6 = review; 7 = success
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const update = useCallback(<K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
  }, []);

  // If guest declines, skip events/party/children and jump to contact + message.
  const isDecline = form.attending === "decline";
  const totalSteps = isDecline ? 4 : 7;

  // Validate the current step.
  const validateStep = useCallback((): boolean => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (step === 0 && form.attending == null) e.attending = pick(t.rsvp.required);
    if (!isDecline) {
      if (step === 1) {
        const any = Object.values(form.events).some(Boolean);
        if (!any) e.events = pick(t.rsvp.required);
      }
      if (step === 2 && form.party < 1) e.party = pick(t.rsvp.required);
      if (step === 3) {
        if (!form.name.trim()) e.name = pick(t.rsvp.required);
        if (!isValidContact(form.contact))
          e.contact = pick(t.rsvp.invalidEmail);
      }
      if (step === 4) {
        if (form.hasChildren == null) e.hasChildren = pick(t.rsvp.required);
        if (form.hasChildren === "yes" && form.childCount < 1)
          e.childCount = pick(t.rsvp.required);
      }
    } else {
      // declining: only step 0 (decision) → step 1 (name+contact) → step 2 (msg) → review
      if (step === 1) {
        if (!form.name.trim()) e.name = pick(t.rsvp.required);
        if (!isValidContact(form.contact))
          e.contact = pick(t.rsvp.invalidEmail);
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [step, form, isDecline, pick, t]);

  const next = useCallback(() => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  }, [validateStep]);
  const back = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const submit = useCallback(() => {
    if (!validateStep()) return;
    setSubmitted(true);
  }, [validateStep]);

  // Steps are conditional based on decline.
  const stepNodes = useMemo(() => {
    if (isDecline) {
      return [
        <Step1 key="s1" form={form} update={update} t={t} pick={pick} dir={dir} error={errors.attending} />,
        <Step4 key="s4" form={form} update={update} t={t} pick={pick} dir={dir} errors={errors} />,
        <Step6 key="s6" form={form} update={update} t={t} pick={pick} dir={dir} />,
        <Review key="rv" form={form} t={t} pick={pick} dir={dir} isDecline />,
      ];
    }
    return [
      <Step1 key="s1" form={form} update={update} t={t} pick={pick} dir={dir} error={errors.attending} />,
      <Step2 key="s2" form={form} update={update} t={t} pick={pick} dir={dir} error={errors.events} />,
      <Step3 key="s3" form={form} update={update} t={t} pick={pick} dir={dir} error={errors.party} />,
      <Step4 key="s4" form={form} update={update} t={t} pick={pick} dir={dir} errors={errors} />,
      <Step5 key="s5" form={form} update={update} t={t} pick={pick} dir={dir} errors={errors} />,
      <Step6 key="s6" form={form} update={update} t={t} pick={pick} dir={dir} />,
      <Review key="rv" form={form} t={t} pick={pick} dir={dir} />,
    ];
  }, [isDecline, form, update, t, pick, dir, errors]);

  const isLast = step === stepNodes.length - 1;

  return (
    <Section id="rsvp" tint="ivory">
      <SectionHeading heading={t.rsvp.heading} subheading={t.rsvp.subheading} />

      <ScrollReveal>
        <div className="mt-12 max-w-xl mx-auto relative">
          {!submitted ? (
            <div className="relative marble-ivory fine-grain gold-frame p-6 sm:p-10 shadow-card">
              {/* Step indicator */}
              <p className="text-center font-display tracking-[0.35em] uppercase text-[10px] text-taupe">
                {pick(t.rsvp.step)} {step + 1} {pick(t.rsvp.of)} {stepNodes.length}
              </p>
              <FiligreeDivider width={140} className="my-3 mx-auto" />
              <div className="relative h-px bg-gold/20 mx-auto max-w-xs">
                <div
                  className="absolute top-0 h-px bg-gold transition-all duration-500"
                  style={{ width: `${((step + 1) / stepNodes.length) * 100}%` }}
                />
              </div>

              <div className="mt-8 min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {stepNodes[step]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="font-display tracking-[0.3em] uppercase text-[10px] text-charcoal/60 hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← {pick(t.rsvp.back)}
                </button>
                {isLast ? (
                  <GoldButton onClick={submit}>{pick(t.rsvp.submit)}</GoldButton>
                ) : (
                  <GoldButton onClick={next}>{pick(t.rsvp.next)} →</GoldButton>
                )}
              </div>
            </div>
          ) : (
            <Success t={t} pick={pick} dir={dir} />
          )}
        </div>
      </ScrollReveal>
    </Section>
  );
}

function FieldLabel({ children }: { children: any }) {
  return (
    <p className="font-display tracking-[0.35em] uppercase text-[10px] text-taupe text-center">
      {children}
    </p>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-2 text-[11px] text-rose-700 font-display italic text-center">
      {msg}
    </p>
  );
}

function ToggleChips({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`px-5 py-2.5 rounded-full font-display tracking-[0.3em] uppercase text-[11px] transition-all ${
              active
                ? "bg-charcoal text-ivory shadow-card"
                : "border border-gold/45 text-charcoal hover:bg-gold/10"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Step1({
  form,
  update,
  t,
  pick,
  dir,
  error,
}: any) {
  return (
    <div>
      <h3
        className={
          dir === "rtl"
            ? "font-arabicDisplay text-2xl text-charcoal text-center"
            : "font-display text-2xl text-charcoal text-center italic"
        }
      >
        {pick(t.rsvp.q1)}
      </h3>
      <div className="mt-8">
        <ToggleChips
          value={form.attending}
          onChange={(v) => update("attending", v as any)}
          options={[
            { value: "accept", label: pick(t.rsvp.accept) },
            { value: "decline", label: pick(t.rsvp.decline) },
          ]}
        />
        <FieldError msg={error} />
      </div>
    </div>
  );
}

function Step2({ form, update, t, pick, dir, error }: any) {
  return (
    <div>
      <h3
        className={
          dir === "rtl"
            ? "font-arabicDisplay text-2xl text-charcoal text-center"
            : "font-display text-2xl text-charcoal text-center italic"
        }
      >
        {pick(t.rsvp.q2)}
      </h3>
      <ul className="mt-6 space-y-3 max-w-xs mx-auto">
        {t.events.items.map((ev: any) => {
          const checked = !!form.events[ev.key];
          return (
            <li key={ev.key}>
              <label className="flex items-center gap-3 cursor-pointer p-3 border border-gold/30 hover:border-gold/60 rounded-md transition-colors">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={(e) =>
                    update("events", {
                      ...form.events,
                      [ev.key]: e.target.checked,
                    })
                  }
                />
                <span
                  className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                    checked ? "bg-charcoal border-charcoal" : "border-gold/60"
                  }`}
                >
                  {checked && (
                    <span className="block w-2 h-2 bg-ivory rotate-45" />
                  )}
                </span>
                <span
                  className={
                    dir === "rtl"
                      ? "font-arabicBody text-charcoal"
                      : "font-display text-charcoal"
                  }
                >
                  {pick(ev.name)}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <FieldError msg={error} />
    </div>
  );
}

function Step3({ form, update, t, pick, dir, error }: any) {
  const dec = () => update("party", Math.max(1, form.party - 1));
  const inc = () => update("party", Math.min(12, form.party + 1));
  return (
    <div>
      <h3
        className={
          dir === "rtl"
            ? "font-arabicDisplay text-2xl text-charcoal text-center"
            : "font-display text-2xl text-charcoal text-center italic"
        }
      >
        {pick(t.rsvp.q3)}
      </h3>
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          onClick={dec}
          className="w-11 h-11 rounded-full border border-gold/45 text-charcoal text-xl"
          aria-label="decrement"
        >
          –
        </button>
        <span
          className="font-display text-4xl"
          style={{ color: "var(--gold-deep)" }}
        >
          {form.party}
        </span>
        <button
          onClick={inc}
          className="w-11 h-11 rounded-full border border-gold/45 text-charcoal text-xl"
          aria-label="increment"
        >
          +
        </button>
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function Step4({ form, update, t, pick, dir, errors }: any) {
  return (
    <div>
      <h3
        className={
          dir === "rtl"
            ? "font-arabicDisplay text-2xl text-charcoal text-center"
            : "font-display text-2xl text-charcoal text-center italic"
        }
      >
        {pick(t.rsvp.q4)}
      </h3>
      <div className="mt-6 space-y-4 max-w-sm mx-auto">
        <div>
          <FieldLabel>{pick(t.rsvp.fullName)}</FieldLabel>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-1 w-full border-0 border-b border-gold/40 bg-transparent text-center text-charcoal py-2 focus:outline-none focus:border-gold"
            dir={dir}
          />
          <FieldError msg={errors.name} />
        </div>
        <div>
          <FieldLabel>{pick(t.rsvp.emailOrPhone)}</FieldLabel>
          <input
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            className="mt-1 w-full border-0 border-b border-gold/40 bg-transparent text-center text-charcoal py-2 focus:outline-none focus:border-gold"
            dir="ltr"
          />
          <FieldError msg={errors.contact} />
        </div>
      </div>
    </div>
  );
}

function Step5({ form, update, t, pick, dir, errors }: any) {
  return (
    <div>
      <h3
        className={
          dir === "rtl"
            ? "font-arabicDisplay text-2xl text-charcoal text-center"
            : "font-display text-2xl text-charcoal text-center italic"
        }
      >
        {pick(t.rsvp.children)}
      </h3>
      <div className="mt-8">
        <ToggleChips
          value={form.hasChildren}
          onChange={(v) => update("hasChildren", v as any)}
          options={[
            { value: "yes", label: pick(t.rsvp.yes) },
            { value: "no", label: pick(t.rsvp.no) },
          ]}
        />
        <FieldError msg={errors.hasChildren} />
      </div>
      {form.hasChildren === "yes" && (
        <div className="mt-8">
          <FieldLabel>{pick(t.rsvp.childCount)}</FieldLabel>
          <div className="mt-3 flex items-center justify-center gap-5">
            <button
              onClick={() => update("childCount", Math.max(1, form.childCount - 1))}
              className="w-10 h-10 rounded-full border border-gold/45 text-charcoal"
              aria-label="decrement"
            >
              –
            </button>
            <span className="font-display text-3xl text-charcoal">{form.childCount}</span>
            <button
              onClick={() => update("childCount", Math.min(8, form.childCount + 1))}
              className="w-10 h-10 rounded-full border border-gold/45 text-charcoal"
              aria-label="increment"
            >
              +
            </button>
          </div>
          <FieldError msg={errors.childCount} />
        </div>
      )}
    </div>
  );
}

function Step6({ form, update, t, pick, dir }: any) {
  return (
    <div>
      <h3
        className={
          dir === "rtl"
            ? "font-arabicDisplay text-2xl text-charcoal text-center"
            : "font-display text-2xl text-charcoal text-center italic"
        }
      >
        {pick(t.rsvp.q5)}
      </h3>
      <div className="mt-6 space-y-5 max-w-sm mx-auto">
        <div>
          <FieldLabel>{pick(t.rsvp.songRequest)}</FieldLabel>
          <input
            value={form.song}
            onChange={(e) => update("song", e.target.value)}
            className="mt-1 w-full border-0 border-b border-gold/40 bg-transparent text-center text-charcoal py-2 focus:outline-none focus:border-gold"
            dir={dir}
          />
        </div>
        <div>
          <FieldLabel>{pick(t.rsvp.message)}</FieldLabel>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={3}
            className="mt-1 w-full border-0 border-b border-gold/40 bg-transparent text-center text-charcoal py-2 focus:outline-none focus:border-gold resize-none"
            dir={dir}
          />
        </div>
      </div>
    </div>
  );
}

function Review({
  form,
  t,
  pick,
  dir,
  isDecline,
}: {
  form: Form;
  t: any;
  pick: any;
  dir: "ltr" | "rtl";
  isDecline?: boolean;
}) {
  const events = Object.entries(form.events)
    .filter(([, v]) => v)
    .map(([k]) => k);
  const eventNames = t.events.items
    .filter((e: any) => events.includes(e.key))
    .map((e: any) => pick(e.name))
    .join(" · ");

  return (
    <div className="text-center">
      <h3
        className={
          dir === "rtl"
            ? "font-arabicDisplay text-2xl text-charcoal"
            : "font-display text-2xl text-charcoal italic"
        }
      >
        {pick(t.rsvp.review)}
      </h3>
      <FiligreeDivider width={140} className="my-4 mx-auto" />
      <dl className="text-sm max-w-sm mx-auto space-y-2">
        <Row label={pick(t.rsvp.q1)} value={pick(form.attending === "accept" ? t.rsvp.accept : t.rsvp.decline)} />
        {!isDecline && form.attending === "accept" && (
          <>
            <Row label={pick(t.rsvp.q2)} value={eventNames || "—"} />
            <Row label={pick(t.rsvp.q3)} value={String(form.party)} />
            {form.hasChildren === "yes" && (
              <Row label={pick(t.rsvp.childCount)} value={String(form.childCount)} />
            )}
          </>
        )}
        <Row label={pick(t.rsvp.fullName)} value={form.name || "—"} />
        <Row label={pick(t.rsvp.emailOrPhone)} value={form.contact || "—"} />
        {form.song && <Row label={pick(t.rsvp.songRequest)} value={form.song} />}
        {form.message && (
          <Row label={pick(t.rsvp.message)} value={form.message} multiline />
        )}
      </dl>
    </div>
  );
}

function Row({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className={multiline ? "block" : "flex items-baseline justify-between gap-3"}>
      <dt className="font-display tracking-[0.3em] uppercase text-[9px] text-taupe">
        {label}
      </dt>
      <dd className="text-charcoal text-sm" style={{ whiteSpace: multiline ? "pre-wrap" : "normal" }}>
        {value}
      </dd>
    </div>
  );
}

function Success({ t, pick, dir }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative marble-ivory fine-grain gold-frame p-10 sm:p-14 shadow-card text-center"
    >
      {/* Subtle gold sparkle pattern */}
      <FiligreeDivider width={160} className="mx-auto" />
      <h3
        className={
          dir === "rtl"
            ? "font-arabicDisplay text-3xl sm:text-4xl text-charcoal mt-6 leading-snug"
            : "font-script text-4xl sm:text-5xl mt-6"
        }
        style={{ color: "var(--gold-deep)" }}
      >
        {pick(t.rsvp.successHeading)}
      </h3>
      <FiligreeDivider width={160} className="mt-6 mx-auto" />
      <p
        className={
          dir === "rtl"
            ? "font-arabicBody mt-6 text-charcoal/70"
            : "font-display italic mt-6 text-charcoal/70 text-lg"
        }
      >
        {pick(t.rsvp.successBody)}
      </p>
    </motion.div>
  );
}
