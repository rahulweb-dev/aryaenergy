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

export const centers = [
  { name: "ATS India — Delhi NCR",  address: "Plot 14, Industrial Area Phase-II, New Delhi 110020",   phone: "+91 11 4000 1200", hours: "Mon–Sat · 8AM–8PM" },
  { name: "ATS India — Mumbai",     address: "MIDC Andheri East, Mumbai, Maharashtra 400093",         phone: "+91 22 4000 1200", hours: "Mon–Sat · 8AM–8PM" },
  { name: "ATS India — Bengaluru",  address: "Peenya Industrial Estate, Bengaluru, Karnataka 560058", phone: "+91 80 4000 1200", hours: "Mon–Sat · 8AM–8PM" },
  { name: "ATS India — Hyderabad",  address: "Balanagar Industrial Area, Hyderabad, Telangana 500037",phone: "+91 40 4000 1200", hours: "Mon–Sat · 8AM–8PM" },
];

export const pricing = [
  { title: "Two Wheeler",       price: 500,  features: ["Full automated inspection", "Digital certificate", "VAHAN sync", "Under 10 minutes"] },
  { title: "Car",               price: 1000, features: ["8-parameter testing", "PDF + QR certificate", "Roadside assistance voucher", "Priority slot"], highlight: true },
  { title: "Commercial Vehicle",price: 1500, features: ["Load-simulated brake test", "Fleet dashboard access", "Bulk booking discount", "Dedicated lane"] },
  { title: "Heavy Vehicle",     price: 2500, features: ["Axle-wise inspection", "Undercarriage AI scan", "Compliance report", "On-site coordinator"] },
];

export const faqs = [
  ["What is an Automated Testing Station (ATS)?", "An ATS is a MoRTH-approved facility that tests vehicle fitness using automated equipment with no manual intervention, ensuring transparent, tamper-proof results."],
  ["Is a fitness certificate mandatory?", "Yes. All commercial vehicles and older private vehicles must obtain a fitness certificate under the Central Motor Vehicles Rules."],
  ["How long does testing take?", "Most vehicles complete testing in 10–15 minutes from lane entry to certificate."],
  ["Do I need an appointment?", "Walk-ins are accepted but booking online guarantees a slot and skips the queue."],
  ["Which documents are required?", "RC, valid insurance, previous PUC, owner ID and (for commercial vehicles) permit and tax receipt."],
  ["What happens if my vehicle fails?", "You get a detailed defect report free of cost and can re-test after repairs at 50% of the original fee within 15 days."],
  ["Is the certificate linked to VAHAN?", "Yes. Results are pushed to the Government of India VAHAN portal in real time."],
  ["How do I download my certificate?", "Use the Track Vehicle page or the WhatsApp bot with your vehicle number."],
  ["Do you test EVs?", "Yes, dedicated EV lanes with high-voltage safety protocols are available at all centres."],
  ["Can I book for a fleet?", "Yes, our fleet dashboard supports bulk bookings and consolidated invoicing."],
  ["What payment methods are accepted?", "UPI, all major cards, net banking and corporate invoicing."],
  ["Are prices fixed?", "Prices follow the state transport authority notified schedule and are displayed transparently."],
  ["Can I reschedule my slot?", "Yes, up to 2 hours before the appointment via the booking link on your WhatsApp."],
  ["Is testing available on Sundays?", "Select centres operate on Sundays. Check the Locations page."],
  ["How is bias eliminated?", "All measurements are captured by calibrated sensors and streamed to a central server without operator input."],
  ["Are the sensors calibrated?", "Yes, calibrated every 6 months by NABL-accredited agencies. Reports are available on request."],
  ["Do you provide roadside assistance?", "A complimentary RSA voucher is bundled with car and above categories."],
  ["What is the validity of the certificate?", "1 year for transport vehicles under 8 years, 6 months thereafter, subject to CMVR."],
  ["Can I get an English + Hindi certificate?", "Certificates are bilingual by default."],
  ["Who do I contact for support?", "Call 1800 200 1200 or WhatsApp us at +91 90000 12345, 24×7."],
] as [string, string][];

export const images = {
  hero: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1400&q=80",
  lane: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1400&q=80",
  brake: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80",
  suspension: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=80",
  emission: "https://images.unsplash.com/photo-1518065896235-bd77b8e04b1c?w=1200&q=80",
  headlight: "https://images.unsplash.com/photo-1518987048-93e29699e79a?w=1200&q=80",
  noise: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
  inspection: "https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1200&q=80",
  facility: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=1400&q=80",
  control: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200&q=80",
  certificate: "https://images.unsplash.com/photo-1584931423298-c576fda54bd2?w=1200&q=80",
};
