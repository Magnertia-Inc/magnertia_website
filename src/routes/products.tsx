import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Cpu, ShieldCheck, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading, Particles, TiltCard } from "@/components/site/motion-kit";
import { BrandButton } from "@/components/site/BrandButton";
import { InquiryModal } from "@/components/site/InquiryModal";
import { PRODUCTS } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Products — Magnertia Autonomous & Wireless Chargers" },
      {
        name: "description",
        content:
          "Explore the Magnertia catalog: W2 two-wheeler module, P11 passenger EV, R30 robotic arm and F120 fleet platform with full specifications.",
      },
      { property: "og:title", content: "Products — Magnertia" },
      { property: "og:description", content: "Four autonomous charging platforms, fully specified." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
});

function renderRupeeText(text: string) {
  if (!text || !text.includes("₹")) return text;
  const parts = text.split("₹");
  return (
    <>
      {parts[0]}
      <span className="inr-symbol">₹</span>
      {parts.slice(1).join("₹")}
    </>
  );
}

function ProductsPage() {
  const [inquiry, setInquiry] = useState<string | null>(null);

  return (
    <div className="font-display antialiased text-primary selection:bg-accent/20 selection:text-accent">
      {/* ---------- HERO SECTION ---------- */}
      <section className="relative overflow-hidden pt-20 sm:pt-40 pb-10 sm:pb-20 tech-grid-bg font-display">
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[650px] -translate-x-1/2 rounded-full bg-accent/15 blur-[160px] energy-glow" />
        <Particles count={24} />
        <div className="shell relative font-display">
          <SectionHeading
            eyebrow="Product Catalog"
            title={<span className="block font-display tracking-tight text-2xl sm:text-5xl font-extrabold">Autonomous & Wireless Charging Platforms</span>}
            description="Each Magnertia platform ships with international safety certification, IoT telemetry, and over-the-air intelligence built in."
          />
        </div>
      </section>

      {/* ---------- PRODUCT HARDWARE GALLERY GRID ---------- */}
      <section className="pb-16 sm:pb-24 tech-grid-bg font-display">
        <div className="shell grid gap-6 sm:gap-8 lg:grid-cols-2 items-stretch font-display">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="flex flex-col font-display">
              <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col font-display">
                <article className="surface-card group hover-lift flex h-full flex-col overflow-hidden rounded-[24px] sm:rounded-[36px] bg-white/95 backdrop-blur-2xl shadow-2xl border border-slate-200/90 hover:border-accent/60 hover:shadow-[0_28px_60px_rgba(46,139,255,0.22)] transition-all duration-500 font-display">
                  {/* Visual Banner Stage */}
                  <div className="relative h-48 sm:h-60 overflow-hidden [background:var(--gradient-primary)] font-display">
                    {/* Top Accent Beam */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-navy via-accent to-sky-400 absolute top-0 inset-x-0 z-20" />
                    <Particles count={16} className="opacity-45" />

                    <div className="absolute inset-0 grid place-items-center font-display">
                      <div className="relative font-display">
                        <div className="grid size-20 sm:size-28 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-2xl transition-transform duration-700 group-hover:scale-110 font-display">
                          <span className="font-display text-xl sm:text-3xl font-extrabold text-white">{p.power}</span>
                        </div>
                        <span className="pulse-ring absolute inset-0 rounded-full border border-accent/60" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-6 sm:right-6 flex items-center justify-between z-10 font-display">
                      <span className="rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold tracking-widest text-white/95 uppercase backdrop-blur-md font-display shadow-sm">
                        {p.category}
                      </span>
                      <span className="rounded-full bg-emerald-500/25 border border-emerald-400/50 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-emerald-300 backdrop-blur-md shadow-sm flex items-center gap-1 sm:gap-1.5 font-display">
                        <span className="size-1.5 sm:size-2 rounded-full bg-emerald-400 animate-pulse" />
                        {renderRupeeText(p.offerPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Content Details & Alignment */}
                  <div className="flex flex-1 flex-col p-4 sm:p-9 font-display justify-between">
                    <div>
                      <div className="flex flex-row items-baseline justify-between gap-2 border-b border-slate-100 pb-4 font-display">
                        <div>
                          <h2 className="font-display text-xl sm:text-3xl font-extrabold text-primary group-hover:text-accent transition-colors tracking-tight">
                            {p.name}
                          </h2>
                          <div className="h-0.5 w-8 group-hover:w-full bg-accent transition-all duration-500 rounded-full mt-1.5" />
                        </div>
                        <div className="text-right shrink-0 font-display">
                          <span className="text-[10px] sm:text-xs text-muted-foreground line-through block font-display">{renderRupeeText(p.price)}</span>
                          <span className="text-base sm:text-xl font-extrabold text-emerald-600 font-display">{renderRupeeText(p.offerPrice)}</span>
                        </div>
                      </div>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal font-display">
                        {p.blurb}
                      </p>

                      {/* Specifications Grid */}
                      <div className="mt-5 flex-1 font-display">
                        <p className="text-[10px] sm:text-[0.68rem] font-bold tracking-wider text-slate-400 uppercase mb-2.5 font-display">
                          Technical Specifications
                        </p>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 font-display">
                          {p.specs.map((s) => {
                            const isLaunchPrice = s.label.toLowerCase().includes("launch price");
                            return (
                              <div
                                key={s.label}
                                className={cn(
                                  "rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 border transition-all flex flex-col justify-center font-display",
                                  isLaunchPrice
                                    ? "bg-emerald-50/90 border-emerald-200/90 col-span-2 flex-row items-center justify-between gap-1 shadow-sm font-display"
                                    : "bg-slate-50/80 border-slate-200/80 hover:border-accent/40 font-display"
                                )}
                              >
                                <span className="text-[9px] sm:text-[0.68rem] font-bold text-slate-500 uppercase tracking-wider font-display">
                                  {s.label}
                                </span>
                                <span
                                  className={cn(
                                    "text-[11px] sm:text-xs font-bold mt-0.5 sm:mt-0 font-display",
                                    isLaunchPrice ? "text-emerald-700 text-xs sm:text-sm font-extrabold" : "text-primary"
                                  )}
                                >
                                  {renderRupeeText(s.value)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <BrandButton className="mt-6 sm:mt-8 w-full justify-center shadow-lg font-display text-xs sm:text-sm py-3" onClick={() => setInquiry(p.name)}>
                      Enquire Specs
                    </BrandButton>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
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
