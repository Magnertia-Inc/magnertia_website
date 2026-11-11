import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  Car,
  Zap,
  Smartphone,
  Wrench,
  Building2,
  BatteryCharging,
  Radio,
  Truck,
  ShieldCheck,
  Activity,
  X,
  Clock,
  Sliders,
  Home,
  Boxes,
  Container,
  Flame,
  Check,
} from "lucide-react";
import { Reveal, SectionHeading, Particles, TiltCard } from "@/components/site/motion-kit";
import { BrandButton } from "@/components/site/BrandButton";
import { COMPANY } from "@/data/site";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Magnertia Turnkey EV Charging Solutions" },
      {
        name: "description",
        content:
          "End-to-end installation and setup services, software & platform subscriptions, fleet & enterprise contracts, and EV charging infrastructure by Magnertia.",
      },
      { property: "og:title", content: "Services — Magnertia" },
      { property: "og:description", content: "Turnkey smart EV charging deployment from assessment to 24/7 monitoring." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

const whatWeDoServices = [
  {
    title: "Smart EV Charging Stations",
    body: "Turnkey hardware deployment for residential apartments, corporate offices, and high-traffic commercial spaces.",
    icon: BatteryCharging,
  },
  {
    title: "Automatic Charging Systems",
    body: "Robotic and computer-guided charging systems that eliminate manual handling, cables, and human error.",
    icon: Bot,
  },
  {
    title: "Wireless Charging Technology",
    body: "High-efficiency resonant inductive power transfer module for seamless on-the-go and depot power transfer.",
    icon: Radio,
  },
  {
    title: "Charging Software for Businesses",
    body: "Subscription-based charging management dashboards, user authentication, energy analytics, and operator mobile app access.",
    icon: Smartphone,
  },
  {
    title: "Fleet Charging Solutions",
    body: "Bulk charging infrastructure deployment, automated load balancing, and energy management for delivery and logistics fleets.",
    icon: Truck,
  },
  {
    title: "EV Charging Infrastructure",
    body: "Complete electrical integration, safety setup, civil foundation, and grid interconnection across private and public locations.",
    icon: Building2,
  },
];

const whoCanBenefitList = [
  { label: "EV owners", desc: "Effortless, seamless wireless power daily.", icon: Car },
  { label: "Businesses", desc: "High-ROI amenity for customers and employees.", icon: Building2 },
  { label: "Apartment communities", desc: "Dedicated controlled parking bays with smart billing.", icon: Home },
  { label: "Offices", desc: "Corporate sustainability and workplace charging perk.", icon: Building2 },
  { label: "Shopping malls", desc: "Footfall attraction and retail dwell time booster.", icon: Boxes },
  { label: "Hotels", desc: "Premium guest hospitality amenity with revenue share.", icon: Building2 },
  { label: "Hospitals", desc: "Critical healthcare fleet and visitor vehicle power.", icon: Container },
  { label: "Industries", desc: "High-duty factory and logistics forklift automation.", icon: Wrench },
  { label: "Fleet operators", desc: "Automated depot turnaround and reduced downtime.", icon: Truck },
  { label: "Government organizations", desc: "Public charging infrastructure and municipal support.", icon: ShieldCheck },
];

function ServicesPage() {
  return (
    <>
      {/* ---------- WHAT WE DO GRID ---------- */}
      <section className="pt-20 sm:pt-28 pb-10 sm:pb-24 tech-grid-bg">
        <div className="shell space-y-8 sm:space-y-12">
          <SectionHeading
            eyebrow="Our Services"
            title={<span className="block font-display tracking-tight text-2xl sm:text-5xl font-extrabold text-primary">Hardware, Robotics & Cloud Platform</span>}
          />

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {whatWeDoServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <article className="surface-card hover-lift group h-full p-4 sm:p-8 rounded-[22px] sm:rounded-[32px] border border-slate-200/90 shadow-lg bg-white relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -right-16 -top-16 size-36 rounded-full bg-accent/8 blur-2xl group-hover:bg-accent/15 transition-colors" />
                  <div>
                    <div className="grid size-10 sm:size-14 place-items-center rounded-xl sm:rounded-2xl [background:var(--gradient-primary)] text-white shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <s.icon className="size-4.5 sm:size-6" />
                    </div>
                    <h3 className="mt-3 sm:mt-6 text-xs sm:text-lg font-bold text-primary group-hover:text-accent transition-colors leading-snug">{s.title}</h3>
                    <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-sm leading-relaxed text-slate-600 font-normal">{s.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY IT MATTERS (ULTRA-LUXURY KINETIC COMMAND CARDS) ---------- */}
      <section className="py-10 sm:py-24 tech-grid-bg relative overflow-hidden font-display">
        <div className="shell relative font-display">
          <SectionHeading
            eyebrow="Why It Matters"
            title={
              <span className="inline-block max-w-4xl text-center leading-snug sm:leading-tight font-display text-xl sm:text-4xl font-extrabold text-primary">
                <span className="block font-display">As more people switch to electric vehicles,</span>
                <span className="block mt-1 sm:mt-2 font-display">charging should become simpler—not more complicated.</span>
              </span>
            }
            description="Magnertia is working to remove everyday problems like:"
          />

          <div className="mt-10 sm:mt-16 max-w-6xl mx-auto font-display">
            {/* 4 Interactive Kinetic Command Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 font-display">
              {[
                { title: "Carrying charging cables", icon: Radio, num: "01", tag: "No Heavy Cables" },
                { title: "Waiting for available charging points", icon: Clock, num: "02", tag: "Zero Queues" },
                { title: "Complicated charging processes", icon: Sliders, num: "03", tag: "One-Touch Auto" },
                { title: "Time-consuming operations", icon: Activity, num: "04", tag: "Instant Power" },
              ].map((item, idx) => (
                <Reveal key={item.title} delay={idx * 0.08} className="flex flex-col font-display">
                  <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col font-display">
                    <div className="surface-card group relative overflow-hidden rounded-[22px] sm:rounded-[32px] border border-slate-200/90 bg-white/95 backdrop-blur-2xl shadow-xl p-4 sm:p-7 flex flex-col justify-between h-full hover:border-accent/60 hover:shadow-[0_24px_50px_rgba(46,139,255,0.2)] transition-all duration-500 font-display">
                      {/* Top Gradient Trim */}
                      <div className="h-1.5 w-full bg-gradient-to-r from-navy via-accent to-sky-400 absolute top-0 inset-x-0" />
                      <div className="pointer-events-none absolute -top-16 -right-16 size-36 rounded-full bg-accent/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                      <div className="relative z-10 font-display flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center justify-between mb-4 sm:mb-6 font-display">
                            <div className="size-9 sm:size-12 rounded-xl sm:rounded-2xl bg-accent/10 text-accent border border-accent/20 grid place-items-center shadow-sm group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                              <item.icon className="size-4.5 sm:size-6 transition-transform duration-700 group-hover:rotate-[360deg]" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-300 group-hover:text-accent transition-colors font-display">
                              {item.num}
                            </span>
                          </div>

                          <h3 className="text-xs sm:text-base font-bold text-primary leading-snug group-hover:text-accent transition-colors font-display">
                            • {item.title}
                          </h3>
                          {/* Animated Underline Beam */}
                          <div className="h-0.5 w-6 sm:w-8 group-hover:w-full bg-accent transition-all duration-500 rounded-full mt-2 sm:mt-3" />
                        </div>

                        <div className="mt-4 sm:mt-8 pt-2.5 sm:pt-3.5 border-t border-slate-100 flex items-center justify-between font-display">
                          <span className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-500 group-hover:text-accent transition-colors font-display">
                            {item.tag}
                          </span>
                          <span className="size-1.5 sm:size-2 rounded-full bg-accent animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>

            {/* Clean Promise Sovereign Glass Card */}
            <Reveal delay={0.25} className="font-display">
              <TiltCard intensity={5} floatAnimation={true}>
                <div className="mt-6 sm:mt-10 rounded-[22px] sm:rounded-[32px] [background:var(--gradient-primary)] text-white p-5 sm:p-10 text-center shadow-2xl border border-white/20 relative overflow-hidden font-display">
                  <Particles count={12} className="opacity-40" />
                  <p className="font-display text-base sm:text-3xl font-extrabold tracking-tight relative z-10 text-white">
                    “We want EV charging to be quick, safe, and effortless.”
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- WHO CAN BENEFIT? ---------- */}
      <section className="py-10 sm:py-16">
        <div className="shell">
          <SectionHeading
            eyebrow="Who Can Benefit?"
            title={<span className="block font-display tracking-tight text-2xl sm:text-5xl font-extrabold text-primary">Our solutions are designed for</span>}
          />

          <div className="mt-8 sm:mt-12 surface-card rounded-[24px] sm:rounded-[32px] p-4 sm:p-10 border border-slate-200/90 shadow-md bg-white">
            <div className="grid gap-2.5 sm:gap-3.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {whoCanBenefitList.map((b, idx) => (
                <Reveal key={b.label} delay={idx * 0.05}>
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/70 hover-lift flex flex-col justify-between h-full group hover:border-accent/40 transition-all">
                    <div>
                      <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-accent/10 text-accent grid place-items-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform">
                        <b.icon className="size-4 sm:size-5" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-primary leading-snug">
                        {b.label}
                      </h3>
                      <p className="mt-1 text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

