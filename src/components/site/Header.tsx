import { useState } from "react";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Logo } from "./Logo";

function LangToggle({ lang, onChange, className = "" }: { lang: "EN" | "SW"; onChange: (l: "EN" | "SW") => void; className?: string }) {
  return (
    <div className={`items-center rounded-full border border-border bg-muted/60 p-0.5 text-xs font-semibold ${className}`} role="group" aria-label="Language">
      {(["EN", "SW"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => onChange(l)}
          className={`min-h-8 rounded-full px-3 transition-colors ${lang === l ? "bg-navy text-navy-foreground" : "text-foreground/70 hover:text-navy"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

const links = [
  { href: "#services", label: "Services" },
  { href: "#doctors", label: "Doctors" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "SW">("EN");
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#top" aria-label="Romkan Hospital home" className="shrink-0">
          <Logo />
        </a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-foreground/80 transition-colors hover:text-primary">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle lang={lang} onChange={setLang} className="hidden sm:inline-flex" />
          <a href="#book" className="inline-flex min-h-11 items-center rounded-full border-2 border-navy px-4 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-navy-foreground sm:px-5">
            Book<span className="hidden sm:inline">{" "}Appointment</span>
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-navy hover:bg-muted lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-base font-medium text-foreground">{l.label}</a>
              </li>
            ))}
            <li className="mt-2 grid gap-2 pb-2 sm:hidden">
              <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-2">
                <span className="flex items-center gap-2 text-sm font-medium text-foreground/80"><Globe className="size-4" aria-hidden /> Language</span>
                <LangToggle lang={lang} onChange={setLang} className="inline-flex" />
              </div>
              <a href="tel:+254711999000" className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-destructive/40 font-semibold text-destructive"><Phone className="size-4" /> Emergency line</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
