export const COMPANY = {
  name: "Magnertia",
  legalName: "Magnertia Private Limited",
  short: "Magnertia",
  tagline: "Smarter Charging. Simpler Living.",
  missionStatement: "Making EV Charging Simple",
  website: "www.magnertia.in",
  phone: "7708100362",
  email: "magnertia@gmail.com",
  addressLine1: "585/18/2, Lakshminagar, Kottakadu, Pallipalayam.",
  addressLine2: "Namakkal-638008.",
  location: "585/18/2, Lakshminagar, Kottakadu, Pallipalayam, Namakkal-638008",
  whatsapp: "917708100362",
  linkedin: "https://www.linkedin.com/company/magnertia",
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  power: string;
  price: string;
  offerPrice: string;
  specs: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "smart-charging-stations",
    name: "Smart EV Charging Stations",
    category: "Private & Public Stations",
    blurb:
      "Intelligent EV charging stations engineered for apartments, corporate offices, public commercial parking, and highway charging hubs.",
    power: "11 kW",
    price: "₹4,00,000",
    offerPrice: "₹3,00,000",
    specs: [
      { label: "Launch Offer", value: "25% OFF Early Pilot" },
      { label: "Power Output", value: "11 kW AC" },
      { label: "Ecosystem", value: "Private & Public Charging" },
      { label: "Authentication", value: "Smart App / RFID / OTP" },
      { label: "Software", value: "Business Management Dashboard" },
      { label: "Safety", value: "Surge · Thermal · Overcurrent" },
      { label: "Connectivity", value: "OCPP 2.0.1 · 4G · Wi-Fi" },
      { label: "Target", value: "Apartments, Offices & Malls" },
    ],
  },
  {
    slug: "automatic-charging-systems",
    name: "Automatic Charging Systems",
    category: "Robotics & Automation",
    blurb:
      "Fully automatic charging systems that eliminate manual cables and human intervention. Effortless, quick, and safe vehicle connection.",
    power: "30 kW DC",
    price: "₹9,33,333",
    offerPrice: "₹7,00,000",
    specs: [
      { label: "Launch Offer", value: "Priority Early Adopter" },
      { label: "Power Output", value: "30 kW DC Fast Charging" },
      { label: "Operation", value: "100% Automatic Connection" },
      { label: "Connection Time", value: "< 25 seconds" },
      { label: "Safety", value: "Active Foreign Object Detection" },
      { label: "Standards", value: "CCS2 · IEC 61851 Compliant" },
      { label: "Management", value: "Fleet API & Cloud Telemetry" },
      { label: "Target", value: "Fleets, Depots & Commercial" },
    ],
  },
  {
    slug: "wireless-charging-technology",
    name: "Wireless Charging Technology",
    category: "Resonant Inductive module",
    blurb:
      "Cable-free resonant wireless power transfer. Park your vehicle and let it charge automatically without searching for cables or plugging in.",
    power: "3.3 kW – 7.2 kW",
    price: "₹46,667",
    offerPrice: "₹35,000",
    specs: [
      { label: "Launch Price", value: "₹35,000 (25% OFF)" },
      { label: "Power Range", value: "3.3 kW to 7.2 kW" },
      { label: "Efficiency", value: "93% Resonant Coupling" },
      { label: "Air Gap", value: "40 – 180 mm" },
      { label: "Standards", value: "SAE J2954 Aligned" },
      { label: "Weatherproofing", value: "IP68 Submersible Sealed" },
      { label: "Safety System", value: "Millisecond F.O.D. Cutoff" },
      { label: "Target", value: "EV Owners & Urban Communities" },
    ],
  },
  {
    slug: "fleet-charging-infrastructure",
    name: "Fleet & Enterprise Infrastructure",
    category: "High-Power Depots",
    blurb:
      "Depot-scale charging infrastructure and energy management software for logistics fleets, delivery networks, and transport operators.",
    power: "120 kW – 360 kW",
    price: "₹10,50,000",
    offerPrice: "₹8,50,000",
    specs: [
      { label: "Launch Offer", value: "Enterprise Bulk Contract" },
      { label: "Power Output", value: "120 kW (scalable to 360 kW)" },
      { label: "Software Suite", value: "AI Load Balancing & Analytics" },
      { label: "Billing / SaaS", value: "Per-unit & Subscription Plans" },
      { label: "Uptime SLA", value: "24/7 Priority Maintenance" },
      { label: "Deployment", value: "End-to-end Turnkey Setup" },
      { label: "Integration", value: "Fleet Management SCADA / API" },
      { label: "Target", value: "Logistics, Buses & Heavy Fleets" },
    ],
  },
];

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Franchise", to: "/franchise" },
  { label: "About", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

