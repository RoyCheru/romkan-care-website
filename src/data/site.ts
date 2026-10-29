import {
  HeartPulse,
  Baby,
  Bone,
  Brain,
  Stethoscope,
  Eye,
  Siren,
  FlaskConical,
  Smile,
  Activity,
  type LucideIcon,
} from "lucide-react";

export type Department = {
  id: string;
  name: string;
  icon: LucideIcon;
  blurb: string;
  doctors: string[];
};

export const departments: Department[] = [
  { id: "cardiology", name: "Cardiology", icon: HeartPulse, blurb: "Heart checks, ECGs and long-term care for blood pressure and heart conditions.", doctors: ["Dr. Daniel Otieno", "Dr. Amina Yusuf"] },
  { id: "pediatrics", name: "Pediatrics", icon: Baby, blurb: "Gentle care for newborns, children and teens, including vaccines and growth checks.", doctors: ["Dr. Grace Wanjiru", "Dr. Peter Kamau"] },
  { id: "orthopedics", name: "Orthopedics", icon: Bone, blurb: "Treatment for bones, joints and sports injuries, from first visit to rehab.", doctors: ["Dr. Samuel Mwangi"] },
  { id: "neurology", name: "Neurology", icon: Brain, blurb: "Care for headaches, epilepsy, stroke recovery and nerve conditions.", doctors: ["Dr. Faith Achieng"] },
  { id: "general", name: "General Medicine", icon: Stethoscope, blurb: "Everyday health concerns, check-ups and referrals for the whole family.", doctors: ["Dr. Kevin Njoroge", "Dr. Mercy Atieno"] },
  { id: "maternity", name: "Maternity", icon: Activity, blurb: "Antenatal clinics, safe delivery and postnatal support for mothers.", doctors: ["Dr. Lucy Chebet"] },
  { id: "ophthalmology", name: "Eye Care", icon: Eye, blurb: "Eye tests, glasses, cataract and glaucoma care.", doctors: ["Dr. Brian Ouma"] },
  { id: "dental", name: "Dental", icon: Smile, blurb: "Cleaning, fillings, braces and cosmetic dentistry.", doctors: ["Dr. Ruth Nyambura"] },
  { id: "laboratory", name: "Lab & Imaging", icon: FlaskConical, blurb: "Blood tests, X-ray, ultrasound and CT with fast, secure results.", doctors: ["Lab team"] },
  { id: "emergency", name: "Emergency 24/7", icon: Siren, blurb: "Round-the-clock emergency and ambulance service.", doctors: ["On-call team"] },
];

export const doctors = [
  { name: "Dr. Daniel Otieno", role: "Consultant Cardiologist", years: 15, initials: "DO" },
  { name: "Dr. Grace Wanjiru", role: "Pediatrician", years: 11, initials: "GW" },
  { name: "Dr. Faith Achieng", role: "Neurologist", years: 9, initials: "FA" },
  { name: "Dr. Samuel Mwangi", role: "Orthopedic Surgeon", years: 13, initials: "SM" },
];

export const testimonials = [
  { quote: "From reception to discharge, every person made me feel safe. The booking took two minutes.", name: "Esther M.", detail: "Maternity patient" },
  { quote: "Dr. Otieno explained everything clearly. I finally understand how to manage my blood pressure.", name: "Joseph K.", detail: "Cardiology patient" },
  { quote: "The children's ward is so warm and friendly. My son actually wanted to go back!", name: "Halima A.", detail: "Parent" },
];

export const posts = [
  { slug: "heart-health", title: "5 everyday habits for a healthier heart", excerpt: "Small changes to food, sleep and movement that make a real difference.", category: "Cardiology", date: "Oct 21, 2026", read: "4 min", img: "heart" },
  { slug: "child-vaccines", title: "Your child's vaccine schedule, made simple", excerpt: "A clear guide to which vaccines your child needs and when.", category: "Pediatrics", date: "Oct 12, 2026", read: "6 min", img: "child" },
  { slug: "malaria-season", title: "Staying safe during the rainy season", excerpt: "How to spot early malaria signs and protect your family.", category: "General", date: "Oct 3, 2026", read: "5 min", img: "malaria" },
];

export const faqs = [
  { q: "Do you accept insurance?", a: "Yes. We work with NHIF/SHA and most major private insurers. Bring your card on your visit." },
  { q: "What are your opening hours?", a: "Outpatient clinics run Monday–Saturday, 7:30am–8:00pm. Emergency is open 24/7." },
  { q: "Can I change or cancel my appointment?", a: "Yes, call or WhatsApp us at least 2 hours before your appointment." },
  { q: "What should I bring?", a: "Your ID, insurance card, any previous results and a list of medicines you take." },
];

export const timeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "11:00", "11:30", "14:00", "14:30", "15:00", "16:00", "17:00"];

export const contact = {
  phone: "+254 700 123 456",
  emergency: "+254 711 999 000",
  email: "care@romkanhospital.co.ke",
  address: "Ngong Road, Nairobi, Kenya",
  whatsapp: "https://wa.me/254700123456",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  x: "https://x.com",
  linkedin: "https://linkedin.com",
};
