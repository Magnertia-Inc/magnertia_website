import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Zap,
  Clock,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Flame,
  Calculator,
  Sliders,
  Award,
  Users,
  Wrench,
} from "lucide-react";
import { Reveal, SectionHeading, Particles } from "@/components/site/motion-kit";
import { BrandButton } from "@/components/site/BrandButton";
import { InquiryModal } from "@/components/site/InquiryModal";
import { COMPANY } from "@/data/site";
import { cn } from "@/lib/utils";
import { usePersistentTimer } from "@/lib/usePersistentTimer";

export const Route = createFileRoute("/offer")({
  component: OfferPage,
  head: () => ({
    meta: [
      { title: "Limited Launch Offer — Magnertia Autonomous Wireless EV Charging" },
      {
        name: "description",
        content:
          "Claim 25% OFF Magnertia wireless module and robotic charging hardware. Reserve your early-adopter pilot bay with free IoT telemetry and white-glove setup.",
      },
      { property: "og:title", content: "25% OFF Launch Offer — Magnertia" },
      { property: "og:description", content: "Limited early-adopter pilot reservations for autonomous EV charging hardware." },
      { property: "og:url", content: "/offer" },
    ],
    links: [{ rel: "canonical", href: "/offer" }],
  }),
});

function OfferPage() {
  const [inquiry, setInquiry] = useState<string | null>(null);

  // Persistent Countdown timer state (Phase 1 deadline)
  const timeLeft = usePersistentTimer();

  // ROI Calculator state
  const [fleetSize, setFleetSize] = useState(5);
  const [dailyKm, setDailyKm] = useState(80);
  const [vehicleType, setVehicleType] = useState<"2w" | "passenger" | "heavy">("passenger");

  const getSavings = () => {
    const multiplier = vehicleType === "2w" ? 1.5 : vehicleType === "passenger" ? 6.5 : 22.0;
    const annualFuelSavings = Math.round(fleetSize * dailyKm * 300 * multiplier);
    const laborHoursSaved = Math.round(fleetSize * 0.75 * 300); // 45 mins saved per charge cycle
    const paybackMonths = Math.max(4, Math.round(36 / Math.sqrt(fleetSize)));
    return { annualFuelSavings, laborHoursSaved, paybackMonths };
  };

  const savings = getSavings();

  // Custom Hardware Configurator state
  const [selectedPower, setSelectedPower] = useState("3.3 kW");
  const [selectedDeploy, setSelectedDeploy] = useState("Stand Alone");
  const [selectedSoftware, setSelectedSoftware] = useState("Fleet AI Dashboard");
  const [appliedPromo] = useState("MAG-PILOT2026");

  const getConfigPrice = () => {
    let finalPrice = 35000;
    if (selectedPower === "3.3 kW") finalPrice = 35000;
    if (selectedPower === "7.2 kW") finalPrice = 49000;
    if (selectedPower === "11 kW") finalPrice = 300000;
    if (selectedPower === "30 kW") finalPrice = 700000;

    if (selectedDeploy === "Robotic Arm") {
      finalPrice += 80000;
    }

    let softExtra = selectedSoftware === "Fleet AI Dashboard" ? 12000 : selectedSoftware === "OCPP Enterprise API" ? 25000 : 0;
    finalPrice += softExtra;

    const originalTotal = Math.round(finalPrice / 0.75);
    const discount = originalTotal - finalPrice;

    return { originalTotal, discount, finalPrice };
  };

  const configPrice = getConfigPrice();

  return (
    <>
      {/* Top Promotional Announcement Ribbon */}
      <div className="bg-gradient-to-r from-accent via-navy-soft to-primary text-white py-2.5 text-center text-xs font-semibold tracking-wide">
        <div className="shell flex items-center justify-center gap-3">
          <Flame className="size-4 animate-bounce text-amber-300" />
          <span>Early Adopter Phase 1: <strong>25% OFF</strong> All Hardware & Free 1-year IoT Telemetry</span>
          <span className="hidden md:inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
            14 Bays Remaining
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-accent/15 blur-[160px]" />
        <Particles count={25} />

        <div className="shell relative text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold tracking-wider text-accent uppercase backdrop-blur-md mb-6">
              <Sparkles className="size-3.5" />
              Exclusive Pilot Program Offer 2026
            </div>
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-extrabold tracking-tight text-primary sm:text-6xl sm:leading-[1.15]">
              Pioneer Autonomous Charging with <span className="text-accent underline decoration-accent/40">25% OFF</span> Launch Savings
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Reserve your Magnertia wireless charging bay or autonomous robotic arm today. Get priority hardware manufacturing, zero-cost telemetry, and white-glove site setup.
            </p>
          </Reveal>

          {/* Live Countdown & Bay Tracker Card */}
          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 max-w-3xl glass rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-lift)] border border-white/80">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Countdown Timer */}
                <div className="text-left">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-primary/70 uppercase mb-3">
                    <Clock className="size-4 text-accent" />
                    Phase 1 Offer Ends In:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    {[
                      { label: "Days", val: timeLeft.days },
                      { label: "Hours", val: timeLeft.hours },
                      { label: "Mins", val: timeLeft.minutes },
                      { label: "Secs", val: timeLeft.seconds },
                    ].map((t) => (
                      <div key={t.label} className="rounded-2xl border border-border bg-white/90 p-2.5">
                        <span className="block font-display text-2xl font-bold text-primary">{String(t.val).padStart(2, "0")}</span>
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slots Remaining Bar */}
                <div className="text-left border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                  <div className="flex items-center justify-between text-xs font-bold text-primary mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                      Limited Reservation Slots
                    </span>
                    <span className="text-accent">14 / 50 Remaining</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent to-navy-soft transition-all duration-1000" style={{ width: "72%" }} />
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    ⚡ 36 pilot bays claimed this week by fleets across Bengaluru & Tamil Nadu.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-center gap-4">
                <BrandButton size="lg" onClick={() => setInquiry("Phase 1 Launch Offer (25% OFF)")}>
                  Claim 25% Off Pilot Offer
                </BrandButton>
                <a
                  href="#roi-calculator"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent/10"
                >
                  <Calculator className="size-4 text-accent" />
                  Calculate Fleet ROI
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive ROI & Savings Calculator */}
      <section id="roi-calculator" className="py-20 bg-accent/5 relative">
        <div className="shell">
          <SectionHeading
            eyebrow="Interactive ROI Estimator"
            title="See how much your fleet saves with autonomous wireless charging"
            description="Autonomous charging eliminates human plug-in labor, prevents downtime, and extends battery lifespan with automated micro-charging."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Input Controls */}
            <Reveal className="lg:col-span-6">
              <div className="surface-card rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between border border-border">
                <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2 mb-6">
                  <Sliders className="size-5 text-accent" />
                  Fleet Operational Parameters
                </h3>

                <div className="space-y-6">
                  {/* Vehicle Type selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Vehicle Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: "2w", label: "4 Wheeler" },
                        { id: "passenger", label: "Passenger EV" },
                        { id: "heavy", label: "Depot / Bus" },
                      ].map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setVehicleType(v.id as any)}
                          className={cn(
                            "rounded-xl py-3 text-xs font-bold transition-all border",
                            vehicleType === v.id
                              ? "bg-accent text-white border-accent shadow-md"
                              : "bg-white text-primary border-border hover:border-accent/40",
                          )}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fleet size slider */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-muted-foreground">Fleet Size</span>
                      <span className="text-accent font-bold text-lg">{fleetSize} Vehicles</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={fleetSize}
                      onChange={(e) => setFleetSize(Number(e.target.value))}
                      className="w-full h-2 rounded-lg bg-slate-200 accent-accent cursor-pointer"
                    />
                  </div>

                  {/* Daily Km slider */}
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-muted-foreground">Daily Distance per Vehicle</span>
                      <span className="text-accent font-bold text-lg">{dailyKm} km / day</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={300}
                      step={10}
                      value={dailyKm}
                      onChange={(e) => setDailyKm(Number(e.target.value))}
                      className="w-full h-2 rounded-lg bg-slate-200 accent-accent cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-accent/10 p-4 text-xs text-primary/80 flex items-start gap-2 border border-accent/20">
                  <ShieldCheck className="size-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    Calculations based on standard electricity tariffs vs diesel/petrol fleet operating benchmarks across Indian metropolitan zones.
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Calculated Output Display */}
            <Reveal delay={0.15} className="lg:col-span-6">
              <div className="gradient-border surface-card rounded-3xl p-8 h-full flex flex-col justify-between bg-gradient-to-br from-white via-slate-50 to-accent/5">
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                    <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                      <TrendingUp className="size-5 text-accent" />
                      Estimated Annual Financial Impact
                    </h3>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 uppercase tracking-wider">
                      Live Estimate
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                      <span className="text-xs font-semibold text-muted-foreground block mb-1">Annual Energy Savings</span>
                      <span className="font-display text-3xl font-extrabold text-accent">
                        <span className="inr-symbol">₹</span>{savings.annualFuelSavings.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] text-emerald-600 font-semibold block mt-1">vs fossil fuel operational cost</span>
                    </div>

                    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                      <span className="text-xs font-semibold text-muted-foreground block mb-1">Labor Time Saved</span>
                      <span className="font-display text-3xl font-extrabold text-primary">
                        {savings.laborHoursSaved.toLocaleString()} <span className="text-lg">hrs</span>
                      </span>
                      <span className="text-[11px] text-muted-foreground block mt-1">no manual cable handling required</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-navy via-primary to-navy-soft p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-white/70 block uppercase tracking-wider font-semibold">Estimated Payback Period</span>
                        <span className="font-display text-4xl font-black text-amber-300 mt-1 block">
                          ~{savings.paybackMonths} Months
                        </span>
                      </div>
                      <div className="size-14 rounded-full bg-white/10 grid place-items-center border border-white/20">
                        <Zap className="size-7 text-amber-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <BrandButton
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setInquiry(`ROI Consultation (${fleetSize} EVs, ${vehicleType.toUpperCase()})`)}
                  >
                    Lock In Savings & Request Detailed ROI Report
                  </BrandButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Launch Offer Packages */}
      <section className="py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Special Launch Packages"
            title="Pick your autonomous charging platform & claim launch benefits"
            description="All pilot packages include hardware warranty, software suite, IoT cloud telemetry, and Magnertia setup assistance."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Magnertia 3.3 kW Smart",
                category: "Compact Charger",
                power: "3.3 kW",
                discount: "25% OFF",
                originalPrice: "₹46,667",
                offerPrice: "₹35,000",
                features: ["Compact IP67 module", "SAE J2954 aligned", "Free 2-yr IoT telemetry", "±75 mm tolerance"],
                badge: "Popular Entry",
                highlight: false,
              },
              {
                title: "Magnertia 7.2 kW Pro",
                category: "Fast AC Charger",
                power: "7.2 kW",
                discount: "25% OFF",
                originalPrice: "₹65,333",
                offerPrice: "₹49,000",
                features: ["IP68 waterproof module", "Auto-guided alignment", "Free OCPP 2.0 integration", "White-glove installation"],
                badge: "Best Value",
                highlight: true,
              },
              {
                title: "Magnertia 11 kW Enterprise",
                category: "Commercial Bay",
                power: "11 kW",
                discount: "25% OFF",
                originalPrice: "₹4,00,000",
                offerPrice: "₹3,00,000",
                features: ["Dual-vehicle load balancing", "High-efficiency coupling", "Free OCPP 2.0 integration", "White-glove installation"],
                badge: "Commercial Grade",
                highlight: false,
              },
              {
                title: "Magnertia 30 kW Robotic",
                category: "Autonomous DC Fast",
                power: "30 kW DC",
                discount: "25% OFF",
                originalPrice: "₹9,33,333",
                offerPrice: "₹7,00,000",
                features: ["6-Axis robotic arm", "Computer vision alignment", "Free structural site survey", "Dedicated SLA support"],
                badge: "Next Gen AI",
                highlight: false,
              },
            ].map((pkg, i) => (
              <Reveal key={pkg.title} delay={i * 0.1}>
                <div
                  className={cn(
                    "surface-card rounded-3xl p-6 flex flex-col justify-between h-full relative transition-all duration-300 hover-lift border",
                    pkg.highlight
                      ? "border-accent ring-2 ring-accent/30 shadow-[var(--shadow-glow)]"
                      : "border-border shadow-sm",
                  )}
                >
                  {pkg.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                      {pkg.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-2">
                      <span>{pkg.category}</span>
                      <span className="rounded-full bg-accent/10 text-accent font-bold px-2 py-0.5">{pkg.power}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-primary">{pkg.title}</h3>

                    <div className="mt-4 pb-4 border-b border-border">
                      <span className="text-xs text-muted-foreground line-through block">{pkg.originalPrice}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-3xl font-extrabold text-primary">{pkg.offerPrice}</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {pkg.discount}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2.5 text-xs text-primary/80">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-accent shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <BrandButton
                      variant={pkg.highlight ? "primary" : "outline"}
                      size="sm"
                      className="w-full justify-center"
                      onClick={() => setInquiry(`Package Offer: ${pkg.title} (${pkg.offerPrice})`)}
                    >
                      Claim Package
                    </BrandButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Custom Hardware & Offer Configurator */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-32 right-0 size-[500px] bg-accent/20 blur-[180px] rounded-full" />
        <Particles count={20} />

        <div className="shell relative">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent tracking-widest uppercase mb-3">
              <Wrench className="size-4" />
              Build Your Custom Package
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">
              Interactive Hardware Offer Configurator
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Customize power specs, installation styles, and software add-ons. Promo code <strong className="text-amber-300">MAG-PILOT2026</strong> is automatically applied.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Options Selector */}
            <div className="lg:col-span-7 space-y-6">
              {/* Power level */}
              <div className="glass-dark rounded-2xl p-6 border border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  1. Power Rating
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["3.3 kW", "7.2 kW", "11 kW", "30 kW"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPower(p)}
                      className={cn(
                        "rounded-xl py-3 px-2 text-xs font-bold border transition-all text-center",
                        selectedPower === p
                          ? "bg-accent text-white border-accent shadow-lg scale-[1.02]"
                          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deployment Type */}
              <div className="glass-dark rounded-2xl p-6 border border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  2. Installation & Alignment Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Stand Alone", "Robotic Arm"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDeploy(d)}
                      className={cn(
                        "rounded-xl py-3 px-3 text-xs font-bold border transition-all text-center",
                        selectedDeploy === d
                          ? "bg-accent text-white border-accent shadow-lg scale-[1.02]"
                          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10",
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Software Addon */}
              <div className="glass-dark rounded-2xl p-6 border border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  3. Software Suite & Connectivity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Standard Telemetry", "Fleet AI Dashboard", "OCPP Enterprise API"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSoftware(s)}
                      className={cn(
                        "rounded-xl py-3 px-3 text-xs font-bold border transition-all text-center",
                        selectedSoftware === s
                          ? "bg-accent text-white border-accent shadow-lg scale-[1.02]"
                          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Configured Pricing Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 text-white shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300">Live Configuration</span>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold px-3 py-1 uppercase">
                    25% Off Code Applied
                  </span>
                </div>

                <dl className="space-y-3 text-xs text-slate-300 mb-6">
                  <div className="flex justify-between">
                    <dt>Base Hardware ({selectedPower}):</dt>
                    <dd className="font-mono text-white font-semibold">Configured</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Deployment Mount:</dt>
                    <dd className="font-mono text-white font-semibold">{selectedDeploy}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Software Suite:</dt>
                    <dd className="font-mono text-white font-semibold">{selectedSoftware}</dd>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <dt>Applied Voucher:</dt>
                    <dd className="font-mono text-amber-300 font-bold">{appliedPromo}</dd>
                  </div>
                </dl>

                <div className="rounded-2xl bg-black/40 p-5 border border-white/10 mb-6">
                  <span className="text-[11px] text-slate-400 block line-through">
                    Standard List Price: <span className="inr-symbol">₹</span>{configPrice.originalTotal.toLocaleString("en-IN")}
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xs text-emerald-400 font-bold">You Save <span className="inr-symbol">₹</span>{configPrice.discount.toLocaleString("en-IN")}</span>
                    <span className="font-display text-3xl font-black text-white">
                      <span className="inr-symbol">₹</span>{configPrice.finalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <BrandButton
                  size="lg"
                  className="w-full justify-center"
                  onClick={() =>
                    setInquiry(
                      `Custom Configured (${selectedPower}, ${selectedDeploy}, ${selectedSoftware}) — ₹${configPrice.finalPrice.toLocaleString(
                        "en-IN",
                      )}`,
                    )
                  }
                >
                  Reserve Configured System
                </BrandButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Adopter Guarantees & Perks */}
      <section className="py-20 bg-white">
        <div className="shell">
          <SectionHeading
            eyebrow="Magnertia Guarantee"
            title="White-glove deployment & full lifetime support"
            description="We stand behind every wireless charging module and robotic system built in our facilities."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "IP68 & F.O.D. Safety Protection",
                desc: "Submersible weatherproofing with instant Foreign Object Detection that cuts power in milliseconds if metallic objects enter the air gap.",
              },
              {
                icon: Award,
                title: "White-Glove Engineer Setup",
                desc: "Our senior hardware engineers conduct full site structural audits, electrical wiring, and calibration for guaranteed peak efficiency.",
              },
              {
                icon: Users,
                title: "Dedicated Account Manager",
                desc: "Direct access to Magnertia R&D leads with 24/7 SLA response times, OTA updates, and fleet analytics onboarding.",
              },
            ].map((g, i) => (
              <Reveal key={g.title} delay={i * 0.1}>
                <div className="surface-card rounded-3xl p-8 border border-border hover-lift h-full">
                  <div className="size-12 rounded-2xl bg-accent/10 border border-accent/20 grid place-items-center text-accent mb-6">
                    <g.icon className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary">{g.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final Offer CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy via-primary to-navy-soft text-white relative overflow-hidden">
        <Particles count={15} />
        <div className="shell relative text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold max-w-3xl mx-auto">
              Ready to Upgrade to Autonomous Charging?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/80">
              Claim your 25% launch discount before Phase 1 pilot reservation slots fill up. Contact our engineers directly at {COMPANY.phone}.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <BrandButton size="lg" onClick={() => setInquiry("Final CTA 25% Offer Claim")}>
                Reserve Pilot Bay Now
              </BrandButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        open={inquiry !== null}
        onClose={() => setInquiry(null)}
        product={inquiry ?? undefined}
      />
    </>
  );
}
