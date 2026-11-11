import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote, Award, Target, Rocket, Users, Building2, ShoppingBag, Truck, Coins, Wrench, Smartphone, CreditCard, PieChart, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Reveal, SectionHeading, Particles, TiltCard } from "@/components/site/motion-kit";
import { LogoMark } from "@/components/site/LogoMark";
import { BrandButton } from "@/components/site/BrandButton";
import { COMPANY } from "@/data/site";

export const Route = createFileRoute("/franchise")({
  component: BusinessModelPage,
  head: () => ({
    meta: [
      { title: "Franchise & Revenue Streams — Magnertia" },
      {
        name: "description",
        content:
          "Explore Magnertia's franchise model and multi-stream revenue architecture across hardware sales, SaaS subscriptions, revenue sharing and enterprise fleet contracts.",
      },
      { property: "og:title", content: "Franchise — Magnertia" },
      { property: "og:description", content: "Two charging ecosystems and six high-growth revenue streams." },
      { property: "og:url", content: "/franchise" },
    ],
    links: [{ rel: "canonical", href: "/franchise" }],
  }),
});

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


function BusinessModelPage() {
  return (
    <div className="font-display antialiased text-primary selection:bg-accent/20 selection:text-accent">
      {/* ---------- HERO SECTION ---------- */}
      <section className="relative overflow-hidden pt-40 pb-20 tech-grid-bg font-display">
        <div className="pointer-events-none absolute -top-32 -left-32 size-[560px] rounded-full bg-accent/15 blur-[160px] energy-glow" />
        <Particles count={24} />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] font-display">
          <div>
            <SectionHeading
              eyebrow="Franchise & Revenue Ecosystem"
              title="Franchise Model"
              description="Magnertia operates through two key charging ecosystems to serve both public and private needs, generating multi-stream revenue across hardware, software, and energy services."
              align="left"
            />
            <div className="mt-8 flex flex-wrap gap-4 font-display">
              <a
                href="#revenue-model"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-slate-50 shadow-sm hover:border-accent/40 font-display"
              >
                Explore 6 Revenue Streams ↓
              </a>
            </div>
          </div>

          <Reveal direction="scale" className="font-display">
            <TiltCard intensity={8} floatAnimation={true}>
              <div className="surface-card relative grid aspect-4/3 place-items-center overflow-hidden rounded-[36px] [background:var(--gradient-primary)] shadow-2xl p-8 text-white text-center border border-white/20 font-display">
                <Particles count={14} />
                <div className="relative font-display">
                  <LogoMark className="mx-auto h-20 w-20 bg-white/10 p-2 rounded-full backdrop-blur-md shadow-lg" />
                  <h3 className="mt-6 font-display text-2xl font-bold">{COMPANY.name}</h3>
                  <p className="mt-2 text-xs tracking-widest text-accent uppercase font-bold font-display">{COMPANY.tagline}</p>
                  <p className="mt-4 text-xs text-white/80 max-w-sm leading-relaxed font-display">
                    Connecting property owners, fleets, and EV drivers with intelligent autonomous infrastructure.
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ---------- TWO KEY CHARGING ECOSYSTEMS ---------- */}
      <section className="pb-16 sm:pb-24 tech-grid-bg font-display">
        <div className="shell font-display">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-10 sm:mb-14 font-display">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent font-display">
              <span className="h-0.5 w-6 rounded-full bg-accent" />
              <span className="font-display">Two Key Charging Ecosystems</span>
            </div>
            <h2 className="mt-1 font-display text-2xl sm:text-5xl font-bold text-primary tracking-tight text-center">
              Two Key Charging Ecosystems
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-muted-foreground font-medium text-center max-w-4xl mx-auto font-display">
              Magnertia operates through two key charging ecosystems to serve both public and private needs.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-stretch font-display">
            {/* Private Charging Solutions */}
            <Reveal direction="left" className="flex flex-col font-display">
              <TiltCard intensity={6} floatAnimation={true} className="h-full flex flex-col font-display">
                <div className="surface-card group hover-lift rounded-[24px] sm:rounded-[32px] p-4.5 sm:p-10 border border-slate-200/90 h-full flex flex-col justify-between shadow-xl bg-white/95 backdrop-blur-2xl font-display">
                  {/* Top Luxury Gradient Accent Bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-navy via-accent to-navy-soft absolute top-0 inset-x-0 rounded-t-3xl" />
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-primary pt-2">
                      1. Private Charging Solutions
                    </h3>
                    <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground font-display">
                      We provide dedicated charging systems for controlled environments where users have regular and exclusive access.
                    </p>

                    <div className="mt-5 space-y-2.5 font-display">
                      <h4 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider font-display">These include:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-primary/80 font-display">
                        {[
                          "Residential apartments & gated communities",
                          "Corporate offices & employee parking areas",
                          "Industrial facilities and warehouses",
                          "Fleet depots for logistics and transport",
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
                      <p className="font-bold text-primary uppercase font-display">How it works:</p>
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
                      <span className="font-display">✓ Lower operational cost per charge</span>
                      <span className="font-display">✓ Easy management & monitoring</span>
                      <span className="font-display">✓ Custom setup based on user needs</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Public Charging Network */}
            <Reveal direction="right" className="flex flex-col font-display">
              <TiltCard intensity={6} floatAnimation={true} className="h-full flex flex-col font-display">
                <div className="surface-card group hover-lift rounded-[24px] sm:rounded-[32px] p-4.5 sm:p-10 border border-white/20 h-full flex flex-col justify-between shadow-xl [background:var(--gradient-primary)] text-white font-display relative overflow-hidden">
                  <div className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-accent/20 blur-3xl" />
                  <Particles count={14} className="opacity-40" />
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white relative z-10 pt-2">
                      2. Public Charging Network
                    </h3>
                    <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-white/80 font-display relative z-10">
                      We also build and support open charging stations accessible to all EV users.
                    </p>

                    <div className="mt-5 space-y-2.5 font-display relative z-10">
                      <h4 className="text-[11px] sm:text-xs font-bold text-accent uppercase tracking-wider font-display">These include:</h4>
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

                    <div className="mt-5 rounded-2xl bg-black/30 border border-white/10 p-4 text-xs space-y-1.5 font-display relative z-10">
                      <p className="font-bold text-accent uppercase font-display">How it works:</p>
                      <p className="text-white/85 leading-relaxed font-display">• Open access for any EV user</p>
                      <p className="text-white/85 leading-relaxed font-display">• Pay-per-use or subscription-based charging</p>
                      <p className="text-white/85 leading-relaxed font-display">• Smart location-based availability through apps</p>
                      <p className="text-white/85 leading-relaxed font-display">• Fast and efficient charging for on-the-go users</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20 font-display relative z-10">
                    <p className="text-xs font-bold text-accent uppercase mb-2 font-display">Key Benefits:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white font-medium font-display">
                      <span className="font-display">✓ Wide accessibility for all EV drivers</span>
                      <span className="font-display">✓ Convenient travel charging</span>
                      <span className="font-display">✓ Revenue generation for owners</span>
                      <span className="font-display">✓ Supports large-scale EV adoption</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- REVENUE MODEL SECTION: 6 STREAMS ---------- */}
      <section id="revenue-model" className="py-24 bg-accent/5 relative overflow-hidden font-display">
        <div className="shell font-display relative">
          <SectionHeading
            eyebrow="Revenue Model"
            title="Multi-Stream Revenue Generation"
            description="Magnertia generates revenue through multiple streams across hardware, software, and energy services."
          />

          <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 font-display">
            {sixRevenueStreams.map((stream, i) => (
              <Reveal key={stream.title} delay={i * 0.08} className="flex flex-col font-display">
                <TiltCard intensity={6} floatAnimation={true} className="h-full flex flex-col font-display">
                  <article className="surface-card group hover-lift rounded-[22px] sm:rounded-[28px] p-4 sm:p-8 border border-slate-200/90 h-full flex flex-col justify-between shadow-lg bg-white/95 backdrop-blur-xl font-display hover:border-accent/40 hover:shadow-2xl transition-all duration-500">
                    <div className="font-display">
                      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 font-display">
                        <span className="font-display text-xl sm:text-3xl font-extrabold text-accent">{stream.number}</span>
                        <div className="size-10 sm:size-11 rounded-xl sm:rounded-2xl bg-accent/10 text-accent grid place-items-center border border-accent/20 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm">
                          <stream.icon className="size-4.5 sm:size-5" />
                        </div>
                      </div>

                      <h3 className="mt-3 sm:mt-5 font-display text-xs sm:text-xl font-bold text-primary group-hover:text-accent transition-colors leading-snug">{stream.title}</h3>
                      <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-xs font-semibold text-slate-500 font-display">{stream.intro}</p>

                      <ul className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2.5 text-[10px] sm:text-xs text-primary/85 font-display">
                        {stream.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-1.5 sm:gap-2 font-display">
                            <CheckCircle2 className="size-3.5 sm:size-4 text-accent shrink-0 mt-0.5" />
                            <span className="leading-snug font-display">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 sm:mt-6 pt-2 sm:pt-4 border-t border-slate-100 font-display">
                      <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed italic font-display">{stream.conclusion}</p>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

