import { useEffect, useRef, useState } from "react";
import { Send, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "bot"; text: string };

const suggestions = ["What are your opening hours?", "I have a fever and headache", "How do I book a pediatrician?", "Do you accept insurance?"];

function reply(q: string): string {
  const t = q.toLowerCase();
  if (/chest|breath|bleed|unconscious|emergency/.test(t)) return "That could be serious. Please call our 24/7 emergency line on +254 711 999 000 or come straight to the Emergency department.";
  if (/hour|open|time/.test(t)) return "Outpatient clinics are open Monday–Saturday, 7:30am–8:00pm. Emergency and the pharmacy are open 24/7.";
  if (/insur|nhif|sha|pay/.test(t)) return "We accept SHA/NHIF and most major private insurers, plus M-Pesa and card payments.";
  if (/fever|headache|cough|flu|malaria/.test(t)) return "Fever with headache can have many causes, including malaria. Drink plenty of water and rest. If it lasts more than 2 days, is very high, or you feel confused, please see a doctor. I'd suggest booking General Medicine — tap “Book Appointment” above.";
  if (/child|baby|pediatric|kid/.test(t)) return "Our Pediatrics team sees children from newborn to 17. In the booking section, choose Pediatrics, then a date and time that suits you.";
  if (/book|appoint/.test(t)) return "You can book in under 2 minutes: scroll to “Book an appointment”, choose a department, pick a date and time, add your details and confirm.";
  return "Thanks for your question. I can help with opening hours, departments, bookings and general health guidance. For anything urgent, please call +254 711 999 000.";
}

export function AiChat() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: "Hi, I'm Romi, Romkan's health assistant. How can I help you today?" }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function send(q: string) {
    if (!q.trim() || typing) return;
    setMsgs((m) => [...m, { role: "user", text: q.trim() }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: reply(q) }]);
      setTyping(false);
    }, 900);
  }

  return (
    <div className="flex h-[32rem] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-3 border-b border-border bg-navy px-5 py-4 text-navy-foreground">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal"><HeartPulse className="size-5" aria-hidden /></span>
        <div className="min-w-0">
          <p className="font-display font-bold">Romi · Health Assistant</p>
          <p className="text-xs opacity-80">Demo assistant · not medical advice</p>
        </div>
      </div>
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4" role="log" aria-live="polite" aria-label="Chat messages">
        {msgs.map((m, i) => (
          <div key={i} className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed", m.role === "user" ? "ml-auto rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-muted text-foreground")}>
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="flex w-16 gap-1 rounded-2xl bg-muted px-4 py-4" aria-label="Assistant is typing">
            {[0, 1, 2].map((i) => <span key={i} className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.15}s` }} />)}
          </div>
        )}
      </div>
      {msgs.length < 3 && (
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          {suggestions.map((s) => (
            <button key={s} onClick={() => send(s)} className="min-h-10 shrink-0 rounded-full border border-border px-3 text-xs font-medium text-foreground hover:border-primary">{s}</button>
          ))}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex gap-2 border-t border-border p-3">
        <label htmlFor="chat-input" className="sr-only">Type your question</label>
        <input id="chat-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about symptoms, hours, bookings…"
          className="min-h-12 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-base placeholder:text-muted-foreground" />
        <button type="submit" aria-label="Send message" disabled={!text.trim() || typing} className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-primary text-primary-foreground disabled:opacity-50">
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
}
