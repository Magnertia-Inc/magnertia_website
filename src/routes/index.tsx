import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Zap,
  ShieldCheck,
  Smartphone,
  CloudSun,
  Radio,
  Cpu,
  Activity,
  Bot,
  Wifi,
  Bike,
  Car,
  Truck,
  Container,
  Home,
  Building2,
  Boxes,
  Wallet,
  Wrench,
  ShieldAlert,
  BatteryCharging,
  Check,
  Flame,
  Clock,
  Sparkles,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Calculator,
  Minus,
  X,
  CreditCard,
  PieChart,
  Play,
  Pause,
  Maximize2,
  SlidersHorizontal,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroVideo from "@/assets/hero_video.mp4";
import { BrandButton } from "@/components/site/BrandButton";
import { Reveal, SectionHeading, Counter, Particles, TiltCard } from "@/components/site/motion-kit";
import { InquiryModal } from "@/components/site/InquiryModal";
import { PRODUCTS } from "@/data/site";
import { LogoMark } from "@/components/site/LogoMark";
import { usePersistentTimer } from "@/lib/usePersistentTimer";

function TypewriterText({
  line1 = "AUTOMATIC &",
  line2 = "SIMPLE",
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseDuration = 2200,
}: {
  line1?: string;
  line2?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}) {
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const totalLength = line1.length + line2.length;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && charCount < totalLength) {
      timer = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, typingSpeed);
    } else if (!isDeleting && charCount === totalLength) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && charCount > 0) {
      timer = setTimeout(() => {
        setCharCount((prev) => prev - 1);
      }, deletingSpeed);
    } else if (isDeleting && charCount === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, totalLength, typingSpeed, deletingSpeed, pauseDuration]);

  const displayedLine1 = line1.substring(0, Math.min(charCount, line1.length));
  const displayedLine2 = charCount > line1.length ? line2.substring(0, charCount - line1.length) : "";
  const cursorOnLine1 = charCount <= line1.length;

  return (
    <span className="inline-flex flex-col items-center lg:items-start align-top">
      {/* Line 1: AUTOMATIC & */}
      <span className="relative inline-block min-h-[1.1em] whitespace-nowrap">
        <span className="invisible opacity-0 aria-hidden select-none pointer-events-none whitespace-nowrap" aria-hidden="true">
          {line1}
        </span>
        <span className="absolute left-0 top-0 h-full inline-flex items-center whitespace-nowrap">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-accent to-emerald-300">
            {displayedLine1}
          </span>
          {cursorOnLine1 && (
            <span className="inline-block w-[3px] sm:w-[4px] h-[0.85em] bg-accent ml-1 animate-pulse rounded-full align-middle shadow-[0_0_12px_#2E8BFF]" />
          )}
        </span>
      </span>

      {/* Line 2: SIMPLE */}
      <span className="relative inline-block min-h-[1.1em] whitespace-nowrap">
        <span className="invisible opacity-0 aria-hidden select-none pointer-events-none whitespace-nowrap" aria-hidden="true">
          {line2}
        </span>
        <span className="absolute left-0 top-0 h-full inline-flex items-center whitespace-nowrap">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-accent to-emerald-300">
            {displayedLine2}
          </span>
          {!cursorOnLine1 && (
            <span className="inline-block w-[3px] sm:w-[4px] h-[0.85em] bg-accent ml-1 animate-pulse rounded-full align-middle shadow-[0_0_12px_#2E8BFF]" />
          )}
        </span>
      </span>
    </span>
  );
}

function HeroVideo({ isPlaying, onTogglePlay }: { isPlaying?: boolean; onTogglePlay?: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.defaultMuted = true;
      v.muted = true;
      if (isPlaying !== false) {
        v.play().catch((err) => {
          console.warn("Autoplay notice:", err);
        });
      } else {
        v.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="relative group overflow-hidden rounded-[16px] sm:rounded-[24px] border border-white/20 shadow-2xl bg-black/70">
      {/* Clean Top Status Badge */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-slate-950/85 border border-white/20 px-2 sm:px-3.5 py-0.5 sm:py-1.5 text-[9px] xs:text-[10px] sm:text-xs font-bold text-white backdrop-blur-md shadow-lg">
          <span className="size-1.5 sm:size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Autonomous & Wireless EV Charging Demo</span>
        </div>
      </div>

      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full min-h-[200px] xs:min-h-[250px] sm:min-h-[340px] max-h-[460px] object-cover pointer-events-none"
      >
        <source src={heroVideo} type="video/mp4" />
        <source src="/Autonomous_EV_charging_commercial_202608041642.mp4" type="video/mp4" />
      </video>

      {/* Clean Bottom Control Bar */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 z-20 flex items-center justify-between bg-slate-950/85 backdrop-blur-md border border-white/15 rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2.5">
        <div>
          <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">Magnertia Commercial Deployment</div>
          <div className="text-[8px] sm:text-[10px] text-slate-300 font-mono">Real-World Field Test</div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
          <Zap className="size-2.5 sm:size-3" />
          <span>4K Live</span>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Magnertia — Making EV Charging Simple | Smarter Charging. Simpler Living." },
      {
        name: "description",
        content:
          "Magnertia is an Indian technology company focused on making electric vehicle charging smarter. Smart EV charging stations, wireless charging technology, automatic charging systems and fleet solutions.",
      },
      { property: "og:title", content: "Magnertia — Making EV Charging Simple" },
      {
        property: "og:description",
        content: "Smart EV charging solutions that make charging easier, faster, and more convenient for everyone.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const chips = [
  { icon: Zap, label: "Automatic & Wireless Charging" },
  { icon: ShieldCheck, label: "Quick, Safe & Effortless" },
  { icon: Smartphone, label: "Smart Business Software" },
];

const whatWeDoServices = [
  {
    number: "01",
    title: "Smart EV Charging Stations",
    body: "Intelligent charging hardware engineered for private residential communities, workplaces, and high-traffic public hubs.",
    icon: BatteryCharging,
  },
  {
    number: "02",
    title: "Automatic Charging Systems",
    body: "Autonomous computer-guided systems that eliminate manual plugs and cables. Park and let intelligent systems handle the rest.",
    icon: Bot,
  },
  {
    number: "03",
    title: "Wireless Charging Technology",
    body: "High-efficiency resonant power transfer module for cable-free, effortless power transfer the instant vehicles align.",
    icon: Radio,
  },
  {
    number: "04",
    title: "Charging Software for Businesses",
    body: "Smart management dashboards, user authentication, live energy monitoring, and SaaS analytics for operators.",
    icon: Smartphone,
  },
  {
    number: "05",
    title: "Fleet Charging Solutions",
    body: "Depot-scale bulk charging deployments, automated load balancing, and energy management for logistics and commercial fleets.",
    icon: Truck,
  },
  {
    number: "06",
    title: "EV Charging Infrastructure",
    body: "End-to-end turnkey site assessment, civil installation, electrical integration, and safety commissioning across India.",
    icon: Building2,
  },
];

const sixRevenueStreams = [
  {
    number: "01",
    title: "1. Hardware Sales",
    intro: "We earn revenue by selling:",
    bullets: [
      "EV charging stations",
      "Wireless and automatic charging systems",
      "Supporting infrastructure components",
    ],
    conclusion: "This includes one-time purchase revenue from businesses, developers, and fleet operators.",
    icon: Zap,
  },
  {
    number: "02",
    title: "2. Installation & Setup Services",
    intro: "We provide end-to-end deployment services such as:",
    bullets: [
      "Site assessment and planning",
      "Installation and commissioning",
      "Electrical integration and safety setup",
    ],
    conclusion: "These services generate project-based revenue.",
    icon: Wrench,
  },
  {
    number: "03",
    title: "3. Software & Platform Subscriptions",
    intro: "Our smart charging platform is offered as a subscription service, including:",
    bullets: [
      "Charging management dashboard",
      "User authentication systems",
      "Energy monitoring and analytics",
      "Mobile app access for users and operators",
    ],
    conclusion: "Revenue is generated through monthly or annual SaaS plans.",
    icon: Smartphone,
  },
  {
    number: "04",
    title: "4. Charging Transaction Fees",
    intro: "For public charging networks, we earn a small fee per charging session. This includes:",
    bullets: [
      "Per-unit energy usage charges",
      "Platform service fees",
      "Dynamic pricing margins based on demand",
    ],
    conclusion: "Continuous recurring revenue per charging session.",
    icon: CreditCard,
  },
  {
    number: "05",
    title: "5. Revenue Sharing with Charging Site Owners",
    intro: "In public locations like malls, hotels, and parking spaces:",
    bullets: [
      "Revenue is shared between Magnertia and property owners",
      "Owners earn passive income from EV charging demand",
      "Magnertia manages operations and technology",
    ],
    conclusion: "Win-win passive revenue model with zero property owner hassle.",
    icon: PieChart,
  },
  {
    number: "06",
    title: "6. Fleet & Enterprise Contracts",
    intro: "We offer long-term contracts for logistics companies, delivery fleets, and corporate EV fleets.",
    bullets: [
      "Bulk charging infrastructure deployment",
      "Maintenance contracts",
      "Energy management services",
    ],
    conclusion: "Long-term recurring contracts with guaranteed SLA maintenance.",
    icon: Truck,
  },
];

function OfferSection({ onInquire }: { onInquire: (p: string) => void }) {
  const timeLeft = usePersistentTimer();

  // ROI Calculator state
  const [vehicleType, setVehicleType] = useState<"2w" | "4w" | "fleet">("4w");
  const [fleetSize, setFleetSize] = useState(5);
  const [dailyKm, setDailyKm] = useState(80);

  // Package Configurator state
  const [selectedPower, setSelectedPower] = useState("3.3 kW");
  const [selectedDeploy, setSelectedDeploy] = useState("Stand Alone");

  const calcROI = () => {
    const ratePerKm = vehicleType === "2w" ? 1.5 : vehicleType === "4w" ? 4.5 : 9.0;
    const annualFuelSavings = Math.round(fleetSize * dailyKm * 365 * ratePerKm * 0.45);
    const laborHoursSaved = Math.round(fleetSize * 0.75 * 300);
    const paybackMonths = Math.max(8, Math.min(36, Math.round(180000 / (annualFuelSavings / 12 || 1))));
    return { annualFuelSavings, laborHoursSaved, paybackMonths };
  };

  const savings = calcROI();

  const calcConfigPrice = () => {
    let finalPrice = 35000;
    if (selectedPower === "3.3 kW") finalPrice = 35000;
    if (selectedPower === "7.2 kW") finalPrice = 49000;
    if (selectedPower === "11 kW") finalPrice = 300000;
    if (selectedPower === "30 kW") finalPrice = 700000;

    if (selectedDeploy === "Robotic Arm") {
      finalPrice += 80000;
    }

    const originalTotal = Math.round(finalPrice / 0.75);
    const discount = originalTotal - finalPrice;

    return { originalTotal, discount, finalPrice };
  };

  const configPrice = calcConfigPrice();

  return (
    <section id="launch-offer" className="pt-8 pb-24 bg-gradient-to-b from-slate-900 via-navy to-slate-950 text-white relative overflow-hidden font-display">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[750px] -translate-x-1/2 rounded-full bg-accent/20 blur-[190px]" />
      <Particles count={30} className="opacity-50" />

      <div className="shell relative z-10 font-display">
        <SectionHeading
          eyebrow="Exclusive Launch Offer"
          title={<span className="block text-white font-display font-extrabold text-xl sm:text-3xl lg:text-[2.6rem] leading-snug">Reserve Your Smart Charging Station with 25% OFF</span>}
          description="Claim early-adopter pilot pricing, free 1-year software dashboard access, and end-to-end setup by Magnertia engineers."
          tone="dark"
          className="max-w-6xl mx-auto"
        />

        {/* --- COUNTDOWN TIMER & SLOT BADGES --- */}
        <Reveal delay={0.1} className="font-display">
          <div className="mt-6 sm:mt-12 max-w-4xl mx-auto rounded-[24px] sm:rounded-[36px] bg-white/10 border border-white/20 p-4 sm:p-11 backdrop-blur-3xl shadow-2xl text-center font-display relative overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-navy via-accent to-sky-400 absolute top-0 inset-x-0" />
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-accent font-display">
              Phase 1 Offer Ends In:
            </p>

            <div className="mt-4 sm:mt-6 grid grid-cols-4 gap-1.5 sm:gap-6 max-w-xl mx-auto font-display">
              {[
                { label: "Days", val: timeLeft.days },
                { label: "Hours", val: timeLeft.hours },
                { label: "Mins", val: timeLeft.minutes },
                { label: "Secs", val: timeLeft.seconds },
              ].map((t) => (
                <div key={t.label} className="rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 p-2 sm:p-5 backdrop-blur-md shadow-inner font-display text-center">
                  <span className="font-display text-lg sm:text-4xl font-extrabold text-white block leading-none">
                    {String(t.val).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-xs font-bold text-white/80 uppercase tracking-widest block mt-1 sm:mt-2 font-display">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 border-t border-white/15 pt-5 font-display text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/50 px-4 py-1.5 text-[11px] sm:text-xs font-bold text-emerald-300 backdrop-blur-md shadow-sm font-display">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                Pilot Slots Available: 14 / 50 Left
              </span>
              <span className="text-xs sm:text-sm text-white/90 font-medium font-display">
                ⚡ 36 stations claimed by communities and fleets this month.
              </span>
            </div>
          </div>
        </Reveal>

        {/* --- INTERACTIVE CALCULATOR & CONFIGURATOR DUAL GRID --- */}
        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 lg:grid-cols-2 items-stretch font-display">
          {/* Card A: Interactive Operational Cost Estimator */}
          <Reveal direction="left" className="flex flex-col font-display">
            <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col font-display">
              <div className="surface-card group relative overflow-hidden rounded-[24px] sm:rounded-[36px] border border-white/20 bg-white/10 backdrop-blur-3xl p-4.5 sm:p-11 shadow-2xl flex flex-col justify-between h-full hover:border-accent/60 hover:shadow-[0_28px_60px_rgba(46,139,255,0.25)] transition-all duration-500 font-display">
                <div className="h-1.5 w-full bg-gradient-to-r from-accent via-sky-400 to-emerald-400 absolute top-0 inset-x-0" />
                <div className="relative z-10 font-display">
                  <div className="flex flex-wrap items-center justify-between border-b border-white/15 pb-4 mb-5 gap-2 font-display">
                    <div>
                      <h3 className="font-display text-base sm:text-2xl font-bold text-white">
                        Interactive Operational Cost Estimator
                      </h3>
                    </div>
                    <span className="rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-[10px] font-extrabold text-accent uppercase tracking-wider font-display shadow-sm">
                      Live Calculation
                    </span>
                  </div>

                  {/* Vehicle Type Switcher */}
                  <div className="mb-5 font-display">
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 font-display">
                      Vehicle Category
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 font-display">
                      {[
                        { id: "2w", label: "4 Wheeler" },
                        { id: "4w", label: "Passenger EV" },
                        { id: "fleet", label: "Depot / Bus" },
                      ].map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVehicleType(v.id as any)}
                          className={`rounded-xl py-2.5 px-1 text-[11px] sm:text-xs font-extrabold border transition-all cursor-pointer text-center font-display ${vehicleType === v.id
                            ? "bg-accent border-accent text-white shadow-lg"
                            : "bg-white/5 border-white/15 text-white/80 hover:bg-white/15"
                            }`}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-4 mb-5 font-display">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-200 mb-1.5 font-display">
                        <span>Number of Vehicles</span>
                        <span className="text-accent font-display">{fleetSize} Vehicles</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={fleetSize}
                        onChange={(e) => setFleetSize(Number(e.target.value))}
                        className="w-full h-2 rounded-lg bg-white/15 accent-accent cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-200 mb-1.5 font-display">
                        <span>Daily Distance / Vehicle</span>
                        <span className="text-accent font-display">{dailyKm} km / day</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="300"
                        step="10"
                        value={dailyKm}
                        onChange={(e) => setDailyKm(Number(e.target.value))}
                        className="w-full h-2 rounded-lg bg-white/15 accent-accent cursor-pointer"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-white/70 italic mb-5 font-display">
                    Calculated on Indian commercial electricity benchmarks vs fossil fuel operational costs.
                  </p>

                  {/* Financial Results Grid */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3 font-display">
                    <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 p-2.5 sm:p-3.5 text-center shadow-inner font-display">
                      <span className="text-[9px] sm:text-[10px] text-white/80 block font-bold font-display leading-tight">Annual Savings</span>
                      <span className="font-display text-xs sm:text-base font-black text-accent block mt-1">
                        <span className="inr-symbol">₹</span>{savings.annualFuelSavings.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 p-2.5 sm:p-3.5 text-center shadow-inner font-display">
                      <span className="text-[9px] sm:text-[10px] text-white/80 block font-bold font-display leading-tight">Labor Saved</span>
                      <span className="font-display text-xs sm:text-base font-extrabold text-white block mt-1">
                        {savings.laborHoursSaved.toLocaleString()} <span className="text-[9px] sm:text-[10px] text-white/70 font-semibold font-display">hrs</span>
                      </span>
                    </div>

                    <div className="rounded-xl sm:rounded-2xl border border-emerald-400/40 bg-emerald-950/50 p-2.5 sm:p-3.5 text-center shadow-inner font-display">
                      <span className="text-[9px] sm:text-[10px] text-emerald-300 block font-bold font-display leading-tight">Payback Period</span>
                      <span className="font-display text-xs sm:text-base font-black text-emerald-300 block mt-1">
                        ~{savings.paybackMonths} Mo
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onInquire(`Lock in 25% Off Pilot Station (${fleetSize} EVs, ${vehicleType.toUpperCase()})`)}
                  className="mt-6 sm:mt-8 w-full rounded-xl sm:rounded-2xl bg-accent hover:bg-sky-400 text-white font-extrabold py-3.5 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm transition-all shadow-xl text-center cursor-pointer font-display hover:scale-[1.01]"
                >
                  Lock In 25% Off & Reserve Pilot Station →
                </button>
              </div>
            </TiltCard>
          </Reveal>

          {/* Card B: Custom Station Configurator */}
          <Reveal direction="right" className="flex flex-col font-display">
            <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col font-display">
              <div className="surface-card group relative overflow-hidden rounded-[24px] sm:rounded-[36px] border border-white/20 bg-white/10 backdrop-blur-3xl p-4.5 sm:p-11 shadow-2xl flex flex-col justify-between h-full hover:border-emerald-400/60 hover:shadow-[0_28px_60px_rgba(16,185,129,0.25)] transition-all duration-500 font-display">
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-accent absolute top-0 inset-x-0" />
                <div className="relative z-10 font-display">
                  <div className="flex flex-wrap items-center justify-between border-b border-white/15 pb-4 mb-5 gap-2 font-display">
                    <div>
                      <h3 className="font-display text-base sm:text-2xl font-bold text-white">
                        Build Your Custom Charging Package
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-[10px] font-extrabold text-emerald-300 uppercase tracking-wider font-display shadow-sm">
                      MAG-PILOT2026 | 25% OFF
                    </span>
                  </div>

                  {/* Power Rating Selection */}
                  <div className="mb-5 font-display">
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 font-display">
                      Select Power Rating
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 font-display">
                      {["3.3 kW", "7.2 kW", "11 kW", "30 kW"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setSelectedPower(p)}
                          className={`rounded-xl py-2.5 px-1 text-[11px] sm:text-xs font-extrabold border transition-all cursor-pointer text-center font-display ${selectedPower === p
                            ? "bg-accent border-accent text-white shadow-lg"
                            : "bg-white/5 border-white/15 text-white/80 hover:bg-white/15"
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deployment Style Selection */}
                  <div className="mb-5 font-display">
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 font-display">
                      Select Deployment Style
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 font-display">
                      {["Stand Alone", "Robotic Arm"].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDeploy(d)}
                          className={`rounded-xl py-2.5 px-1 text-[11px] sm:text-xs font-extrabold border transition-all cursor-pointer text-center font-display ${selectedDeploy === d
                            ? "bg-accent border-accent text-white shadow-lg"
                            : "bg-white/5 border-white/15 text-white/80 hover:bg-white/15"
                            }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Pricing Summary Box */}
                  <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black/40 p-4 sm:p-5 backdrop-blur-md space-y-2 font-display">
                    <div className="flex justify-between text-xs text-white/70 font-display">
                      <span>List Price:</span>
                      <span className="line-through font-display"><span className="inr-symbol">₹</span>{configPrice.originalTotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-xs text-emerald-400 font-bold font-display">
                      <span>Savings:</span>
                      <span className="font-display"><span className="inr-symbol">₹</span>{configPrice.discount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base font-extrabold text-white pt-2 border-t border-white/15 font-display">
                      <span>Final Offer Price</span>
                      <span className="text-emerald-300 text-lg sm:text-xl font-display"><span className="inr-symbol">₹</span>{configPrice.finalPrice.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onInquire(`Custom Configured Station (${selectedPower}, ${selectedDeploy}) — ₹${configPrice.finalPrice.toLocaleString("en-IN")}`)
                  }
                  className="mt-6 sm:mt-8 w-full rounded-xl sm:rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm transition-all shadow-xl text-center cursor-pointer font-display hover:scale-[1.01]"
                >
                  Reserve Configured Station →
                </button>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const [inquiry, setInquiry] = useState<string | null>(null);

  return (
    <div className="font-display antialiased text-primary selection:bg-accent/20 selection:text-accent">
      {/* ---------- HERO SECTION: ULTRA-LUXURY 1-PAGE MONOLITH STAGE ---------- */}
      <section className="relative min-h-screen lg:h-screen lg:max-h-[920px] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-6 bg-gradient-to-b from-[#040E1E] via-[#091F3C] to-[#040F20] text-white font-display selection:bg-accent/30 selection:text-white border-b border-white/10">
        {/* Radial Starlight Glow & Ambient Particles */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#2E8BFF_1.4px,transparent_1.4px)] [background-size:36px_36px] opacity-15" />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[900px] rounded-full bg-accent/25 blur-[220px]" />
        <div className="pointer-events-none absolute top-1/3 left-1/4 size-[450px] rounded-full bg-sky-500/10 blur-[150px] animate-pulse" />
        <Particles count={32} className="opacity-50" />

        <div className="shell relative z-10 w-full flex-1 flex flex-col justify-between font-display my-auto">
          {/* MAIN 2-COLUMN SPLIT GRID (FIT EXACTLY 1 PAGE FOLD) */}
          <div className="mt-3 sm:mt-2 mb-auto py-3 sm:py-4 grid gap-8 lg:grid-cols-12 items-center font-display">
            {/* LEFT COLUMN: TITLE, DESCRIPTION & CTAS */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 space-y-4 sm:space-y-5 font-display flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <h1 className="font-display text-xl xs:text-2xl sm:text-5xl lg:text-[4rem] xl:text-[4.6rem] font-extrabold tracking-tight leading-snug sm:leading-[1.08] uppercase text-center lg:text-left">
                <span className="text-white drop-shadow-lg block mb-1 sm:mb-2">MAKING EV CHARGING</span>
                <TypewriterText line1="AUTOMATIC &" line2="SIMPLE" />
              </h1>

              <p className="text-xs sm:text-base leading-relaxed text-slate-200 font-normal max-w-xl text-center lg:text-left">
                Park your electric vehicle and have it charge automatically—without cables, manual plugs, or hassle. High-efficiency wireless resonant module, robotic auto-docking, and smart cloud software.
              </p>

              {/* HIGH-ATTRACTION LIVE FEATURE PILLS */}
              <div className="pt-0.5 sm:pt-1 flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-extrabold text-white">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/20 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md">
                  <Radio className="size-3 sm:size-3.5 text-emerald-400" /> Wireless Inductive
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/20 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md">
                  <Bot className="size-3 sm:size-3.5 text-sky-400" /> Auto Alignment
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/20 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md">
                  <ShieldCheck className="size-3 sm:size-3.5 text-amber-400" /> 100% Certified
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-1 sm:pt-2 flex flex-wrap justify-center lg:justify-start items-center gap-4">
                <a
                  href="#launch-offer"
                  className="group relative inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-accent hover:bg-sky-400 px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-extrabold text-white shadow-[0_0_30px_rgba(46,139,255,0.5)] hover:scale-105 transition-all duration-300 font-display overflow-hidden"
                >
                  <span className="relative z-10">Claim 25% Off Offer</span>
                  <ArrowRight className="relative z-10 size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: COMPACT AUTONOMOUS MEDIA STAGE SHOWCASE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.35 }}
              className="mt-4 sm:mt-0 lg:col-span-6 font-display"
            >
              <div className="relative rounded-[22px] sm:rounded-[28px] border border-white/25 bg-slate-950/90 p-2 sm:p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden">
                <HeroVideo />
              </div>
            </motion.div>
          </div>

          {/* BOTTOM METALLIC SPECIFICATIONS STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/15 flex flex-wrap items-center justify-around sm:justify-between gap-4 font-display text-white/80"
          >
            <div className="flex items-center gap-6 sm:gap-14 font-display">
              <div className="flex flex-col font-display text-center sm:text-left">
                <span className="font-display text-lg sm:text-3xl font-black text-accent leading-none">
                  <Counter to={100} suffix="%" />
                </span>
                <span className="text-[8px] sm:text-[9px] font-extrabold tracking-widest uppercase text-white/80 mt-1 font-display">AUTOMATIC & WIRELESS</span>
              </div>

              <div className="h-6 w-[1px] bg-white/20" />

              <div className="flex flex-col font-display text-center sm:text-left">
                <span className="font-display text-lg sm:text-3xl font-black text-white leading-none">
                  <Counter to={24} suffix="/7" />
                </span>
                <span className="text-[8px] sm:text-[9px] font-extrabold tracking-widest uppercase text-white/80 mt-1 font-display">IOT TELEMETRY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- WHO WE ARE (CRISP WHITE LUXURY BENTO GRID) ---------- */}
      <section className="py-20 bg-white border-y border-slate-100 relative overflow-hidden font-display">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-sky-500/5 blur-[180px]" />

        <div className="shell relative z-10 font-display">
          <SectionHeading
            eyebrow="Who We Are"
            title={<span className="block font-display tracking-tight text-3xl sm:text-5xl font-extrabold text-primary">Making Electric Vehicle Charging Smarter</span>}
          />

          {/* BENTO GRID LAYOUT */}
          <div className="mt-12 max-w-5xl mx-auto space-y-6 font-display">
            {/* Top Main Statement Card */}
            <Reveal direction="up" className="font-display">
              <div className="rounded-[32px] border border-slate-200/90 bg-gradient-to-r from-sky-50/70 via-white to-emerald-50/70 p-8 sm:p-11 shadow-lg text-center hover:border-accent/40 transition-all duration-500 relative overflow-hidden">
                <div className="h-1.5 w-24 bg-gradient-to-r from-accent via-sky-400 to-emerald-400 rounded-full mx-auto mb-6" />
                <motion.p
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-xl sm:text-2xl font-bold text-primary font-display leading-snug cursor-pointer origin-center select-none"
                >
                  Magnertia is an Indian technology company focused on making electric vehicle charging smarter.
                </motion.p>
                <motion.p
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="mt-4 text-base sm:text-lg text-slate-600 font-normal font-display max-w-3xl mx-auto leading-relaxed cursor-pointer origin-center select-none hover:text-primary"
                >
                  We combine engineering, robotics, software, and innovation to build charging systems that are easy to use and ready for the future.
                </motion.p>
              </div>
            </Reveal>

            {/* Core Mission Banner */}
            <Reveal delay={0.15} className="mt-8 font-display">
              <TiltCard intensity={6} floatAnimation={true}>
                <div className="rounded-[32px] [background:var(--gradient-primary)] text-white p-8 sm:p-11 shadow-xl border border-white/20 text-center relative overflow-hidden font-display group">
                  <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-96 rounded-full bg-accent/25 blur-3xl group-hover:scale-125 transition-transform duration-700 energy-glow" />
                  <Particles count={18} className="opacity-40" />
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-accent font-display shadow-sm mb-4 backdrop-blur-md">
                    <Sparkles className="size-3.5 text-accent animate-spin" />
                    Our Core Mission
                  </span>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug drop-shadow-md max-w-3xl mx-auto">
                    “To make charging as easy as parking your vehicle.”
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- WHAT WE DO (6 NEAT MODULAR COMMAND CARDS) ---------- */}
      <section className="pt-10 pb-12 tech-grid-bg relative overflow-hidden font-display">
        <div className="shell font-display">
          <SectionHeading
            eyebrow="What We Do"
            title={<span className="block font-display tracking-tight text-3xl sm:text-5xl font-extrabold">Our Products & Solutions</span>}
            description="Turnkey hardware, software, robotics, and charging infrastructure engineered for every scale."
          />

          <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-7 lg:grid-cols-3 font-display">
            {whatWeDoServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07} className="flex flex-col font-display">
                <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col font-display">
                  <article className="surface-card group relative overflow-hidden rounded-[22px] sm:rounded-[36px] border border-slate-200/90 bg-white/95 backdrop-blur-2xl shadow-xl p-4 sm:p-10 flex flex-col justify-between h-full hover:border-accent/60 hover:shadow-[0_28px_60px_rgba(46,139,255,0.22)] transition-all duration-500 font-display">
                    {/* Top Laser Underline Beam */}
                    <div className="h-1.5 w-8 sm:w-12 group-hover:w-full bg-accent transition-all duration-500 rounded-full absolute top-0 inset-x-0" />
                    <div className="pointer-events-none absolute -top-16 -right-16 size-36 rounded-full bg-accent/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative z-10 font-display">
                      <div className="flex items-center justify-between pb-3 sm:pb-5 border-b border-slate-100 font-display">
                        <span className="font-display text-base sm:text-2xl font-extrabold text-accent">{s.number}</span>
                        <div className="size-10 sm:size-13 rounded-xl sm:rounded-2xl bg-accent/10 text-accent grid place-items-center border border-accent/20 shadow-md group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 font-display">
                          <s.icon className="size-4.5 sm:size-6 transition-transform duration-700 group-hover:rotate-[360deg]" />
                        </div>
                      </div>

                      <h3 className="mt-3 sm:mt-6 font-display text-xs sm:text-xl font-bold text-primary group-hover:text-accent transition-colors leading-snug">
                        {s.title}
                      </h3>

                      <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-sm leading-relaxed text-slate-600 font-normal font-display">
                        {s.body}
                      </p>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- EXCLUSIVE LAUNCH OFFER SECTION ---------- */}
      <OfferSection onInquire={setInquiry} />

      {/* ---------- FRANCHISE MODEL: TWO KEY CHARGING ECOSYSTEMS ---------- */}
      <section className="py-16 sm:py-28 tech-grid-bg relative overflow-hidden font-display">
        <div className="shell font-display">
          <SectionHeading
            eyebrow="Franchise Model"
            title={<span className="block font-display tracking-tight text-2xl sm:text-5xl font-extrabold">Two Key Charging Ecosystems</span>}
            description="Magnertia operates through two key charging ecosystems to serve both public and private needs."
          />

          <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 lg:grid-cols-2 items-stretch font-display">
            {/* Private Charging Solutions */}
            <Reveal direction="left" className="flex flex-col font-display">
              <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col font-display">
                <div className="surface-card group relative overflow-hidden rounded-[24px] sm:rounded-[36px] border border-slate-200/90 bg-white/95 backdrop-blur-2xl shadow-2xl p-5 sm:p-12 flex flex-col justify-between h-full hover:border-accent/60 hover:shadow-[0_28px_60px_rgba(46,139,255,0.22)] transition-all duration-500 font-display">
                  <div className="h-2 w-full bg-gradient-to-r from-navy via-accent to-sky-400 absolute top-0 inset-x-0" />
                  <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-accent/15 blur-3xl group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative z-10 font-display flex flex-col justify-between h-full">
                    <div>
                      <div className="border-b border-slate-100 pb-4 mb-6 font-display">
                        <span className="inline-flex items-center gap-2.5 rounded-full bg-accent/10 border border-accent/25 px-3.5 py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-accent font-display shadow-sm">
                          <span className="size-2 rounded-full bg-accent animate-ping" />
                          01 // Private Ecosystem
                        </span>
                      </div>

                      <h2 className="font-display text-xl sm:text-3xl font-extrabold text-primary tracking-tight leading-snug">
                        1. Private Charging Solutions
                      </h2>
                      <div className="h-1 w-12 group-hover:w-28 bg-accent transition-all duration-500 rounded-full mt-2.5 mb-5" />

                      <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-normal font-display">
                        We provide dedicated charging systems for controlled environments where users have regular and exclusive access.
                      </p>

                      <div className="mt-5 space-y-2.5 font-display">
                        <h4 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider font-display">These Include:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-primary/85 font-display">
                          {[
                            "Residential apartments & gated communities",
                            "Corporate offices & employee parking areas",
                            "Industrial facilities and warehouses",
                            "Fleet depots for logistics & transport",
                            "Private commercial properties",
                          ].map((item) => (
                            <li key={item} className="flex items-center gap-2 font-display">
                              <CheckCircle2 className="size-4 text-accent shrink-0" />
                              <span className="font-display">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200/90 p-4 text-xs space-y-1.5 font-display">
                        <p className="font-bold text-primary uppercase font-display">How It Works:</p>
                        <p className="text-slate-600 leading-relaxed font-display">• Charging stations are installed for specific users or organizations</p>
                        <p className="text-slate-600 leading-relaxed font-display">• Access is managed through smart software or authentication systems</p>
                        <p className="text-slate-600 leading-relaxed font-display">• Energy usage is tracked and optimized for cost efficiency</p>
                        <p className="text-slate-600 leading-relaxed font-display">• Ideal for predictable, daily charging needs</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 font-display">
                      <p className="text-xs font-bold text-accent uppercase mb-2 font-display">Key Benefits:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-primary font-medium font-display">
                        <span className="font-display">✓ Guaranteed availability</span>
                        <span className="font-display">✓ Lower operational cost</span>
                        <span className="font-display">✓ Easy management & monitoring</span>
                        <span className="font-display">✓ Custom setup per user requirements</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Public Charging Network */}
            <Reveal direction="right" className="flex flex-col font-display">
              <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col font-display">
                <div className="surface-card group relative overflow-hidden rounded-[24px] sm:rounded-[36px] border border-white/20 [background:var(--gradient-primary)] text-white p-5 sm:p-12 flex flex-col justify-between h-full hover:border-accent/70 hover:shadow-[0_28px_60px_rgba(13,47,86,0.4)] transition-all duration-500 font-display">
                  <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-accent/25 blur-3xl group-hover:scale-125 transition-transform duration-700" />
                  <Particles count={14} className="opacity-40" />

                  <div className="relative z-10 font-display flex flex-col justify-between h-full">
                    <div>
                      <div className="border-b border-white/15 pb-4 mb-6 font-display">
                        <span className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/20 px-3.5 py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-accent font-display backdrop-blur-md shadow-sm">
                          <span className="size-2 rounded-full bg-accent animate-ping" />
                          02 // Public Network
                        </span>
                      </div>

                      <h2 className="font-display text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                        2. Public Charging Network
                      </h2>
                      <div className="h-1 w-12 group-hover:w-28 bg-accent transition-all duration-500 rounded-full mt-2.5 mb-5" />

                      <p className="text-sm sm:text-base leading-relaxed text-white/95 font-normal font-display">
                        We also build and support open charging stations accessible to all EV users.
                      </p>

                      <div className="mt-5 space-y-2.5 font-display">
                        <h4 className="text-[11px] sm:text-xs font-bold text-accent uppercase tracking-wider font-display">These Include:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90 font-display">
                          {[
                            "Highway charging stations",
                            "Shopping malls and retail centers",
                            "Hotels and restaurants",
                            "Hospitals and public spaces",
                            "City parking zones",
                            "Government-supported EV infrastructure",
                          ].map((item) => (
                            <li key={item} className="flex items-center gap-2 font-display">
                              <CheckCircle2 className="size-4 text-accent shrink-0" />
                              <span className="font-display">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 rounded-2xl bg-black/30 border border-white/10 p-4 text-xs space-y-1.5 font-display">
                        <p className="font-bold text-accent uppercase font-display">How It Works:</p>
                        <p className="text-white/85 leading-relaxed font-display">• Open access for any EV user</p>
                        <p className="text-white/85 leading-relaxed font-display">• Integrated with mobile app for discovery, navigation, and payment</p>
                        <p className="text-white/85 leading-relaxed font-display">• Flexible revenue models for property owners and operators</p>
                        <p className="text-white/85 leading-relaxed font-display">• Scalable for high-demand locations</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/15 font-display">
                      <p className="text-xs font-bold text-accent uppercase mb-2 font-display">Key Benefits:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white/90 font-medium font-display">
                        <span className="font-display">✓ Additional revenue stream for locations</span>
                        <span className="font-display">✓ Attracts EV drivers & footfall</span>
                        <span className="font-display">✓ Enhances brand value & sustainability</span>
                        <span className="font-display">✓ Managed by smart cloud software</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- REVENUE MODEL ---------- */}
      <section className="pt-20 pb-10 bg-accent/5 relative overflow-hidden font-display">
        <div className="shell font-display relative">
          <SectionHeading
            eyebrow="Revenue Model"
            title={<span className="block font-display tracking-tight text-3xl sm:text-5xl font-extrabold">Multi-Stream Revenue Generation</span>}
            description="Magnertia generates revenue through multiple streams across hardware, software, and energy services."
          />

          <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-7 lg:grid-cols-3 font-display">
            {sixRevenueStreams.map((stream, i) => (
              <Reveal key={stream.title} delay={i * 0.08} className="flex flex-col font-display">
                <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col font-display">
                  <article className="surface-card group relative overflow-hidden rounded-[22px] sm:rounded-[32px] p-4 sm:p-9 border border-slate-200/90 h-full flex flex-col justify-between shadow-xl bg-white/95 backdrop-blur-2xl font-display hover:border-accent/60 hover:shadow-[0_28px_60px_rgba(46,139,255,0.22)] transition-all duration-500">
                    <div className="font-display">
                      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 font-display">
                        <span className="font-display text-xl sm:text-3xl font-extrabold text-accent">{stream.number}</span>
                        <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-accent/10 text-accent grid place-items-center border border-accent/20 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm font-display">
                          <stream.icon className="size-4.5 sm:size-6 transition-transform duration-700 group-hover:rotate-[360deg]" />
                        </div>
                      </div>

                      <h3 className="mt-3 sm:mt-6 font-display text-xs sm:text-xl font-bold text-primary group-hover:text-accent transition-colors leading-snug">{stream.title}</h3>
                      <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-xs font-semibold text-slate-500 font-display">{stream.intro}</p>

                      <ul className="mt-2.5 sm:mt-4 space-y-1.5 sm:space-y-2.5 text-[10px] sm:text-xs text-primary/85 font-display">
                        {stream.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-1.5 sm:gap-2 font-display">
                            <CheckCircle2 className="size-3.5 sm:size-4 text-accent shrink-0 mt-0.5" />
                            <span className="leading-snug font-display">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 sm:mt-8 pt-2 sm:pt-4 border-t border-slate-100 font-display">
                      <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed italic font-display">{stream.conclusion}</p>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- JOIN THE EV REVOLUTION (HERO CTA BANNER) ---------- */}
      <section className="pt-20 pb-20 bg-gradient-to-b from-[#040E1E] via-[#091F3C] to-[#040F20] text-white relative overflow-hidden font-display border-t border-white/10">
        <div className="pointer-events-none absolute -top-40 left-1/2 size-[850px] -translate-x-1/2 rounded-full bg-accent/25 blur-[220px] energy-glow" />
        <Particles count={36} className="opacity-60" />

        <div className="shell relative z-10 text-center max-w-6xl mx-auto font-display">
          <Reveal direction="up" className="font-display">
            <div className="mb-5 inline-flex items-center justify-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.2em] text-accent font-display">
              <span className="h-0.5 w-6 rounded-full bg-accent" />
              <span>JOIN THE EV REVOLUTION</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-lg uppercase mt-2">
              <span className="block sm:whitespace-nowrap">The Future of Transportation</span>
              <span className="block sm:whitespace-nowrap">is Electric</span>
            </h2>

            <p className="mt-6 text-base sm:text-xl leading-relaxed text-slate-200 font-normal font-display max-w-3xl mx-auto">
              Magnertia is helping build that future—one smart charging solution at a time. Whether you’re an EV owner, a business, or an organization planning for tomorrow, we’re here to help you power the journey.
            </p>

            {/* Tagline Monolith */}
            <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-white/15 font-display">
              <p className="text-[10px] sm:text-sm font-extrabold tracking-[0.25em] sm:tracking-[0.4em] uppercase text-accent font-display">
                MAGNERTIA &nbsp;|&nbsp; SMARTER CHARGING &nbsp;|&nbsp; SIMPLER LIVING
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <InquiryModal
        open={inquiry !== null}
        onClose={() => setInquiry(null)}
        product={inquiry ?? undefined}
      />
    </div>
  );
}
