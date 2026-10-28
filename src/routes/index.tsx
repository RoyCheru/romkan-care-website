import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Clock, Award, Users, Phone, Mail, MapPin, Star, Quote, CheckCircle2, Siren } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import { Header } from "@/components/site/Header";
import { Logo } from "@/components/site/Logo";
import { Booking } from "@/components/site/Booking";
import { AiChat } from "@/components/site/AiChat";
import { SocialLinks, SocialIcon } from "@/components/site/Social";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { departments, doctors, testimonials, posts, faqs, contact } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Romkan Hospital — Compassionate, Modern Care in Nairobi" },
      { name: "description", content: "Book appointments online across 10 departments, meet our specialists, chat with our health assistant, and get 24/7 emergency care at Romkan Hospital." },
      { property: "og:title", content: "Romkan Hospital — Compassionate, Modern Care" },
      { property: "og:description", content: "Book online, meet our specialists and get 24/7 emergency care in Nairobi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function SectionHead({ eyebrow, title, text, id }: { eyebrow: string; title: string; text?: string; id: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-teal">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-base text-muted-foreground md:text-lg">{text}</p>}
    </div>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-dvh">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">Skip to content</a>
      <div className="bg-navy text-navy-foreground">
        <div className="container-x flex min-h-10 items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="flex items-center gap-2"><Siren className="size-4 shrink-0" aria-hidden /> 24/7 Emergency: <a href="tel:+254711999000" className="font-semibold underline-offset-2 hover:underline">{contact.emergency}</a></span>
          <span className="hidden md:inline">Mon–Sat 7:30am–8:00pm · {contact.address}</span>
        </div>
      </div>
      <Header />

      <main id="main">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[38%] bg-secondary/60 lg:block" />
          <div aria-hidden className="absolute bottom-0 right-0 hidden h-1/3 w-[38%] bg-accent lg:block" />
          <div className="container-x relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:py-24">
            <div className="animate-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"><ShieldCheck className="size-4" aria-hidden /> Accredited by the Kenya Medical Board</p>
              <h1 id="hero-title" className="mt-5 text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl lg:text-6xl">Caring for you.<br />Every step<br />of the way.</h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">Expert specialists, modern technology and genuine compassion — all under one roof in Nairobi.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">Book an Appointment <ArrowRight className="size-4" /></a>
                <a href="#services" className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-navy px-7 font-semibold text-navy transition-colors hover:bg-navy hover:text-navy-foreground">Explore Services</a>
              </div>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal hover:underline">
                <SocialIcon name="WhatsApp" /> Chat with us on WhatsApp
              </a>
            </div>
            <div className="relative animate-rise [animation-delay:150ms]">
              <img src={heroImg} alt="Romkan Hospital doctors and nurse smiling in the hospital lobby" width={1024} height={1152} className="aspect-[4/4.2] w-full rounded-3xl object-cover shadow-soft" />
              <div className="absolute -bottom-5 left-4 rounded-2xl bg-card p-4 shadow-soft sm:-left-6">
                <p className="text-sm font-semibold text-navy">Trusted by 25,000+ patients</p>
                <div className="mt-2 flex items-center gap-1 text-accent-foreground" aria-label="Rated 4.9 out of 5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" aria-hidden />)}
                  <span className="ml-1 text-sm font-semibold text-foreground">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section aria-label="Hospital at a glance" className="container-x py-12">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              [Users, "60+", "Specialist doctors"],
              [Award, "18 yrs", "Of trusted care"],
              [Clock, "24/7", "Emergency service"],
              [ShieldCheck, "98%", "Patient satisfaction"],
            ].map(([Icon, n, l]) => {
              const I = Icon as typeof Users;
              return (
                <li key={l as string} className="rounded-2xl border border-border bg-card p-5">
                  <I className="size-6 text-primary" aria-hidden />
                  <p className="mt-3 font-display text-2xl font-extrabold text-navy md:text-3xl">{n as string}</p>
                  <p className="text-sm text-muted-foreground">{l as string}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Services */}
        <section id="services" aria-labelledby="services-title" className="scroll-mt-24 bg-muted/60 py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="services-title" eyebrow="Our services" title="Complete care for every stage of life" text="Ten departments working together so you get the right care, quickly." />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {departments.map((d) => (
                <li key={d.id} className="group flex flex-col rounded-2xl bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
                  <span className="grid size-12 place-items-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><d.icon className="size-6" aria-hidden /></span>
                  <h3 className="mt-4 text-lg font-bold text-navy">{d.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{d.blurb}</p>
                  <a href="#book" className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary">Book <span className="sr-only">{d.name}</span><ArrowRight className="size-4" aria-hidden /></a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-title" className="container-x scroll-mt-24 grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
          <img src={aboutImg} alt="A Romkan doctor listening to an elderly patient" width={1024} height={768} loading="lazy" className="w-full rounded-3xl object-cover shadow-soft" />
          <div>
            <SectionHead id="about-title" eyebrow="Why Romkan" title="Medicine with a human touch" text="Since 2008, Romkan Hospital has combined clinical excellence with the kind of care you'd want for your own family." />
            <ul className="mt-6 space-y-3">
              {["Internationally trained specialists", "Modern lab, imaging and theatres", "Short waiting times & online booking", "Insurance-friendly, transparent pricing"].map((t) => (
                <li key={t} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </section>

        {/* Booking */}
        <section id="book" aria-labelledby="book-title" className="scroll-mt-24 bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="book-title" eyebrow="Book online" title="Book an appointment in 4 easy steps" text="Choose a department, pick a time, tell us a little about how you feel, and confirm." />
            <div className="mt-10"><Booking /></div>
          </div>
        </section>

        {/* Doctors */}
        <section id="doctors" aria-labelledby="doctors-title" className="container-x scroll-mt-24 py-16 md:py-24">
          <SectionHead id="doctors-title" eyebrow="Our team" title="Meet some of our specialists" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d, i) => (
              <li key={d.name} className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className={`mx-auto grid size-20 place-items-center rounded-full font-display text-2xl font-extrabold ${i % 2 ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`} aria-hidden>{d.initials}</div>
                <h3 className="mt-4 font-bold text-navy">{d.name}</h3>
                <p className="text-sm text-muted-foreground">{d.role}</p>
                <p className="mt-2 text-xs font-semibold text-teal">{d.years} years experience</p>
              </li>
            ))}
          </ul>
        </section>

        {/* AI chat */}
        <section id="assistant" aria-labelledby="ai-title" className="scroll-mt-24 bg-navy py-16 text-navy-foreground md:py-24">
          <div className="container-x grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Health assistant</p>
              <h2 id="ai-title" className="mt-2 text-3xl font-extrabold md:text-4xl">Questions at 2am? Ask Romi.</h2>
              <p className="mt-3 text-lg opacity-85">Get quick answers about symptoms, departments, opening hours and bookings — any time of day.</p>
              <p className="mt-4 text-sm opacity-70">Romi gives general information only and does not replace a doctor. In an emergency, call {contact.emergency}.</p>
            </div>
            <div className="text-foreground"><AiChat /></div>
          </div>
        </section>

        {/* Testimonials */}
        <section aria-labelledby="t-title" className="container-x py-16 md:py-24">
          <SectionHead id="t-title" eyebrow="Patient stories" title="What our patients say" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name} className="rounded-2xl bg-card p-6 shadow-soft">
                <Quote className="size-7 text-teal" aria-hidden />
                <blockquote className="mt-3 text-foreground">“{t.quote}”</blockquote>
                <p className="mt-4 font-semibold text-navy">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Blog */}
        <section id="blog" aria-labelledby="blog-title" className="scroll-mt-24 bg-muted/60 py-16 md:py-24">
          <div className="container-x">
            <SectionHead id="blog-title" eyebrow="Health blog" title="Advice from our doctors" />
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {posts.map((p, i) => (
                <li key={p.slug}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft">
                    <div aria-hidden className={`h-36 ${["bg-secondary", "bg-accent", "bg-gradient-primary"][i]}`} />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-teal">{p.category}</p>
                      <h3 className="mt-2 text-lg font-bold text-navy">{p.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                      <p className="mt-4 text-xs text-muted-foreground"><time>{p.date}</time> · {p.read} read</p>
                      <a href="#blog" className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary">Read article<span className="sr-only">: {p.title}</span><ArrowRight className="size-4" aria-hidden /></a>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead id="faq-title" eyebrow="FAQ" title="Frequently asked questions" />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="min-h-12 text-left text-base font-semibold text-navy">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="container-x scroll-mt-24 pb-16 md:pb-24">
          <div className="grid gap-8 rounded-3xl bg-gradient-primary p-8 text-primary-foreground md:grid-cols-2 md:p-12">
            <div>
              <h2 id="contact-title" className="text-3xl font-extrabold">Get in touch</h2>
              <p className="mt-2 opacity-90">We're here to help — call, email, WhatsApp or visit us.</p>
              <SocialLinks className="mt-6" />
            </div>
            <ul className="space-y-4">
              <li><a href="tel:+254700123456" className="flex min-h-11 items-center gap-3 hover:underline"><Phone className="size-5 shrink-0" aria-hidden /> {contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="flex min-h-11 items-center gap-3 break-all hover:underline"><Mail className="size-5 shrink-0" aria-hidden /> {contact.email}</a></li>
              <li className="flex min-h-11 items-center gap-3"><MapPin className="size-5 shrink-0" aria-hidden /> {contact.address}</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-navy-foreground">
        <div className="container-x grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div><Logo invert /><p className="mt-3 text-sm opacity-75">Compassionate, modern healthcare for Nairobi and beyond.</p></div>
          <nav aria-label="Footer"><h3 className="font-bold">Explore</h3><ul className="mt-3 space-y-1 text-sm opacity-80">{["services", "doctors", "book", "blog", "contact"].map((s) => <li key={s}><a href={`#${s}`} className="inline-flex min-h-9 items-center capitalize hover:underline">{s}</a></li>)}</ul></nav>
          <div><h3 className="font-bold">Hours</h3><p className="mt-3 text-sm opacity-80">Mon–Sat: 7:30am – 8:00pm<br />Emergency & Pharmacy: 24/7</p></div>
          <div><h3 className="font-bold">Follow us</h3><SocialLinks className="mt-3" /></div>
        </div>
        <p className="border-t border-navy-foreground/15 py-5 text-center text-xs opacity-70">© 2026 Romkan Hospital. All rights reserved.</p>
      </footer>

      {/* Floating WhatsApp */}
      <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Romkan Hospital on WhatsApp"
        className="fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-teal text-primary-foreground shadow-glow transition-transform hover:scale-105">
        <SocialIcon name="WhatsApp" className="size-7" />
      </a>
    </div>
  );
}
