import {
  Gauge, Waves, Wind, Lightbulb, Volume2, ClipboardCheck,
  ShieldCheck, Timer, FileCheck2, Database, Scale, Building2,
  Car, Truck, Bus, Zap, CarFront,
} from "lucide-react";

export const brand = {
  name: "ATS India Testing Services",
  short: "ATS India",
  tagline: "Automated Vehicle Fitness Testing for a Safer Tomorrow",
  email: "care@atsindia.test",
  phone: "+91 1800 200 1200",
  whatsapp: "+91 90000 12345",
  address: "Plot 14, Industrial Area Phase-II, New Delhi 110020",
  hours: "Mon–Sat · 8:00 AM – 8:00 PM",
  logo: "/images/brand/logo.png",
  logoWidth: 1672,
  logoHeight: 941,
};

export const stats = [
  { value: 50000, suffix: "+", label: "Vehicles Tested" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
  { value: 15, suffix: "", label: "Testing Lanes" },
  { value: 10, suffix: "", label: "Cities Served" },
];

export const heroChips = [
  { icon: Timer, label: "10 Minute Testing" },
  { icon: Database, label: "VAHAN Integrated" },
  { icon: ShieldCheck, label: "Government Approved" },
];

export const services = [
  { slug: "brake",       icon: Gauge,          title: "Brake Testing",       desc: "Roller-bench brake force and imbalance measurement to MoRTH spec." },
  { slug: "suspension",  icon: Waves,          title: "Suspension Testing",  desc: "EUSAMA plate analysis of shock absorber efficiency per axle." },
  { slug: "emission",    icon: Wind,           title: "Emission Testing",    desc: "BS-VI compliant PUC analysis for petrol, diesel, CNG and LPG." },
  { slug: "headlight",   icon: Lightbulb,      title: "Headlight Alignment", desc: "Optical beam alignment and luminous intensity certification." },
  { slug: "noise",       icon: Volume2,        title: "Noise Level Testing", desc: "Free-field dB(A) measurement calibrated to CMVR standards." },
  { slug: "inspection",  icon: ClipboardCheck, title: "Vehicle Inspection",  desc: "AI-assisted underbody, chassis and body fitness evaluation." },
  { slug: "speedometer", icon: Gauge,          title: "Speedometer Testing", desc: "Roller-based calibration of the vehicle's speed indicator." },
  { slug: "sideslip",    icon: Scale,          title: "Side Slip Testing",   desc: "Wheel-alignment side-slip plate for tracking accuracy." },
];

export const steps = [
  { n: "01", title: "Book Appointment",   desc: "Reserve a lane online in under 60 seconds." },
  { n: "02", title: "Vehicle Inspection", desc: "Documents verified, RC & PUC checked at gate." },
  { n: "03", title: "Automated Testing",  desc: "Zero-touch multi-lane test — no human bias." },
  { n: "04", title: "Receive Certificate",desc: "Digital fitness certificate on VAHAN + WhatsApp." },
];

export const benefits = [
  { icon: ShieldCheck, title: "Transparent Testing",  desc: "Every result is machine-generated and tamper-proof." },
  { icon: Timer,       title: "Fast Certification",    desc: "Average turnaround under 15 minutes end-to-end." },
  { icon: FileCheck2,  title: "Digital Records",       desc: "PDF certificate + QR verification for life of vehicle." },
  { icon: Database,    title: "VAHAN Integration",     desc: "Auto-sync of results with the Government of India VAHAN portal." },
  { icon: Scale,       title: "No Human Bias",         desc: "Sensors decide pass/fail, not operators." },
  { icon: Building2,   title: "Government Compliance", desc: "Accredited by MoRTH & state transport authorities." },
];

export const categories = [
  { icon: CarFront, title: "Passenger Cars",       image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80" },
  { icon: Car,      title: "SUVs",                 image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80" },
  { icon: Zap,      title: "Electric Vehicles",    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80" },
  { icon: Truck,    title: "Commercial Vehicles",  image: "https://images.unsplash.com/photo-1586191582056-b7f0538d0a1f?w=800&q=80" },
  { icon: Truck,    title: "Trucks",               image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800&q=80" },
  { icon: Bus,      title: "Buses",                image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80" },
];

export const testimonials = [
  { name: "Rahul Mehta",   role: "Fleet Manager, LogiCorp",     quote: "We put 40 trucks through ATS India in one morning. Zero paperwork, digital certificates on VAHAN before the last truck left the lane." },
  { name: "Anita Sharma",  role: "Owner, Individual",           quote: "Booked at 9, done by 9:20, PDF on WhatsApp by 9:22. This is what a modern government service should feel like." },
  { name: "Vikram Singh",  role: "Transport Supervisor, DTC",   quote: "The bus fleet audit was fully transparent. Every result timestamped — no operator can 'adjust' a reading." },
  { name: "Priya Nair",    role: "EV Owner",                    quote: "Loved the dedicated EV lane and the app-based booking. Felt more like a Tesla service centre than a fitness station." },
  { name: "Suresh Kumar",  role: "Taxi Operator",                quote: "I run 12 cars. ATS India saves me a full day each month vs. the old manual centres." },
];

export type Center = {
  slug: string;
  name: string;
  address: string;
  photos: string[];
};

function centerPhotos(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/images/centers/${folder}/${i + 1}.jpeg`);
}

export const centers: Center[] = [
  {
    slug: "tardeo-mumbai",
    name: "Tardeo (Mumbai)",
    address: "Regional Transport Office, Mumbai (Central), Old Bodyguard Lane, Tulshiwadi, Tardeo, Mumbai – 400034",
    photos: [],
  },
  {
    slug: "taloja-panvel",
    name: "Taloja (Panvel)",
    address: "Survey No. 113/1, Mauje-Taloje Majkur, Tal. Panvel, Dist. Raigad – 410208",
    photos: centerPhotos("taloja-panvel", 4),
  },
  {
    slug: "nandiwali-kalyan",
    name: "Nandiwali (Kalyan)",
    address: "Opposite Nandivali Talav, Kalyan (E), Kandivali Gaon, Tal. Kalyan, Dist. Thane – 421306",
    photos: [],
  },
  {
    slug: "murphy-thane",
    name: "Murphy (Thane)",
    address: "Regional Transport Office, Thane, Eastern Expressway, Louis Wadi, Thane – 400601",
    photos: centerPhotos("thane", 9),
  },
  {
    slug: "moshi-pimpri-chinchwad",
    name: "Moshi (Pimpri-Chinchwad)",
    address: "Survey No. 539, Peth No. 13, Mauje-Chikhali, Tal. Haveli, Dist. Pune – 411062",
    photos: centerPhotos("moshi", 9),
  },
  {
    slug: "dive-ghat-pune",
    name: "Dive Ghat (Pune)",
    address: "Dive RTO Office, Beside Old Jejuri Road, A/P Dive, Tal. Purandar, Dist. Pune – 412301",
    photos: centerPhotos("dive-ghat", 21),
  },
  {
    slug: "kolhapur",
    name: "Kolhapur",
    address: "Survey No. 66, Near Bharti University, A/P Morewadi, Tal. Karvir, Dist. Kolhapur – 416013",
    photos: [],
  },
  {
    slug: "hingana-nagpur",
    name: "Hingana (Nagpur)",
    address: "ST Central Workshop Hingna, Hingna Road, Wadi, Tal. Hingna, Dist. Nagpur – 440028",
    photos: [],
  },
  {
    slug: "amravati",
    name: "Amravati",
    address: "Anjangaon-Bari Road, Opposite Ram-Mege College, Amravati Bypass Road, Badnera, Tal. & Dist. Amravati – 444701",
    photos: centerPhotos("amravati", 8),
  },
  {
    slug: "aurangabad",
    name: "Aurangabad",
    address: "Regional Transport Office, Aurangabad, Survey No. 24, Dhule–Solapur National Highway, Karodi, Aurangabad – 431136",
    photos: [],
  },
];

export const registration = {
  url: "https://parivahan.gov.in",
  label: "Parivahan – Ministry of Road Transport & Highways",
  desc: "Complete vehicle registration, renewals, transfers and other RTO applications directly on the Government of India's official Parivahan portal — the same system used by every RTO in this network.",
};

export const departmentContacts = {
  hr: { title: "HR Department", email: "hr@aryaenergy.in", phone: "+91 86556 35534" },
  it: { title: "IT Support", email: "itsupport@aryaenergy.in", phone: "+91 86555 08929" },
};

export const companyOverview =
  "[Add company overview — 2–3 paragraphs on ATS India's history, the RTO centres it operates from, and its role in Maharashtra's vehicle fitness testing network.]";

export const founders: { name: string; role: string; bio: string }[] = [];

export const boardMembers: { name: string; role: string }[] = [];

export const pricing = [
  { title: "Two Wheeler",       price: 500,  features: ["Full automated inspection", "Digital certificate", "VAHAN sync", "Under 10 minutes"] },
  { title: "Car",               price: 1000, features: ["8-parameter testing", "PDF + QR certificate", "Roadside assistance voucher", "Priority slot"], highlight: true },
  { title: "Commercial Vehicle",price: 1500, features: ["Load-simulated brake test", "Fleet dashboard access", "Bulk booking discount", "Dedicated lane"] },
  { title: "Heavy Vehicle",     price: 2500, features: ["Axle-wise inspection", "Undercarriage AI scan", "Compliance report", "On-site coordinator"] },
];

export const images = {
  hero: "/images/centers/csn-unassigned/1.jpeg",
  lane: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1400&q=80",
  brake: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80",
  suspension: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=80",
  emission: "https://images.unsplash.com/photo-1518065896235-bd77b8e04b1c?w=1200&q=80",
  headlight: "https://images.unsplash.com/photo-1518987048-93e29699e79a?w=1200&q=80",
  noise: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
  inspection: "https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1200&q=80",
  facility: "/images/centers/csn-unassigned/1.jpeg",
  control: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200&q=80",
  certificate: "https://images.unsplash.com/photo-1584931423298-c576fda54bd2?w=1200&q=80",
};
