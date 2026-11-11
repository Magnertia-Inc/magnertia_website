import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Reveal, Particles } from "@/components/site/motion-kit";
import { COMPANY } from "@/data/site";
import { LogoMark } from "@/components/site/LogoMark";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: `Terms of Service — ${COMPANY.name}` },
      {
        name: "description",
        content: `Terms of Service governing the use of ${COMPANY.name} autonomous charging platforms and services.`,
      },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-[60px] lg:pt-40">
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-accent/12 blur-[150px]" />
        <Particles count={20} />
        <div className="shell relative max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <FileText className="size-8" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-[60px]">
        <div className="shell max-w-3xl">
          <Reveal delay={0.1}>
            <div className="surface-card rounded-3xl p-8 sm:p-12 space-y-10 text-primary/85 leading-relaxed text-base">
              <div className="flex items-center gap-3 border-b border-border pb-6">
                <LogoMark className="h-12 w-12" />
                <div>
                  <h2 className="font-display text-lg font-bold text-primary">{COMPANY.name}</h2>
                  <p className="text-xs text-muted-foreground">{COMPANY.addressLine1} {COMPANY.addressLine2}</p>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using autonomous charging stations, web software, or hardware provided by {COMPANY.name} ("Magnertia"), you agree to be bound by these Terms of Service. If you do not agree, do not use our products or services.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">2. Autonomous Hardware & Charging Operation</h3>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 size-4.5 shrink-0 text-accent" />
                    <span><strong>Interoperability & Standards:</strong> Charging hardware operates in accordance with SAE J2954 and OCPP 2.0.1 specifications. Vehicles must adhere to approved power transfer protocols.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 size-4.5 shrink-0 text-accent" />
                    <span><strong>Foreign Object Safety:</strong> Automatic Foreign Object Detection (F.O.D.) sensors will suspend charging if unapproved metallic or organic objects are detected on the module.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">3. Intellectual Property</h3>
                <p>
                  All proprietary power transfer coil designs, robotic arm software, AI load balancing algorithms, trademarks, and documentation are the exclusive property of {COMPANY.name}.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">4. Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by applicable law, {COMPANY.name} shall not be liable for indirect, incidental, or consequential damages resulting from unauthorized hardware modifications or improper installation outside approved guidelines.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">5. Governing Law</h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts in Tamil Nadu, India.
                </p>
              </div>

              <div className="pt-6 border-t border-border flex justify-between items-center">
                <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
                  <ArrowLeft className="size-4" /> Back to Home
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
