// Tiny .ics generator. Triggers a download client-side. No external deps.

function fmtUTC(d: Date): string {
  // YYYYMMDDTHHMMSSZ
  return d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export function downloadICS(opts: {
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  filename?: string;
}) {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@salma-tariq`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Salma & Tariq Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmtUTC(new Date())}`,
    `DTSTART:${fmtUTC(opts.start)}`,
    `DTEND:${fmtUTC(opts.end)}`,
    `SUMMARY:${escape(opts.title)}`,
    opts.description ? `DESCRIPTION:${escape(opts.description)}` : "",
    opts.location ? `LOCATION:${escape(opts.location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([lines], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = opts.filename ?? "event.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

function escape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}
