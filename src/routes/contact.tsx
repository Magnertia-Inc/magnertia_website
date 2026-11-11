import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Car,
  ShieldCheck,
  Clock,
  Cpu,
  CheckCircle2,
  User,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading, Particles, TiltCard } from "@/components/site/motion-kit";
import { BrandButton } from "@/components/site/BrandButton";
import { COMPANY } from "@/data/site";
import { LogoMark } from "@/components/site/LogoMark";
import { saveContact, type InquiryRecord } from "@/lib/api-client";
import { saveSubmissionLocally } from "@/lib/excel-client";

export const Route = createFileRoute("/contact")({
  component: ContactUsPage,
  head: () => ({
    meta: [
      { title: "Contact Us — Magnertia Private Limited" },
      {
        name: "description",
        content:
          "Get in touch with Magnertia Private Limited for autonomous and wireless EV charging deployments, pilots and partnerships.",
      },
      { property: "og:title", content: "Contact Us — Magnertia" },
      { property: "og:description", content: "Talk to the Magnertia engineering and sales team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

const labelCls = "mb-2 block text-xs font-semibold tracking-[0.14em] text-primary/80 uppercase font-display";

const faqs = [
  {
    icon: Car,
    tag: "Charging Ecosystems",
    q: "What is the difference between Private and Public Charging Solutions?",
    a: "Private solutions provide dedicated, controlled charging for apartments, corporate offices, warehouses, and fleet depots with authentication and optimized energy usage. Public charging networks offer open, on-the-go access across highways, malls, hotels, hospitals, and city parking zones.",
  },
  {
    icon: ShieldCheck,
    tag: "Why Choose Magnertia",
    q: "Why choose Magnertia for our charging infrastructure?",
    a: "We believe technology should make life easier. Our solutions are easy to use, safe, reliable, smart, and future-ready with Foreign Object Detection, weatherproofing, and automated operation that removes the hassle of cables.",
  },
  {
    icon: Clock,
    tag: "Revenue Sharing",
    q: "How does revenue sharing work for charging site owners?",
    a: "Property owners in malls, hotels, and commercial spaces earn passive income from EV charging demand while Magnertia manages all operations, installations, and technology seamlessly.",
  },
  {
    icon: Cpu,
    tag: "Software & Subscriptions",
    q: "What software features are included for businesses?",
    a: "Our smart charging platform provides charging management dashboards, user authentication systems, energy monitoring, analytics, and mobile app access through monthly or annual SaaS subscriptions.",
  },
];

function ContactUsPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [, setLastSubmittedRecord] = useState<InquiryRecord | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }

    const record: InquiryRecord = {
      type: "contact",
      fullName: String(parsed.data.fullName || ""),
      email: String(parsed.data.email || ""),
      phone: String(parsed.data.phone || ""),
      message: String(parsed.data.message || ""),
    };

    setErrors({});
    saveSubmissionLocally(record);
    setLastSubmittedRecord(record);

    try {
      await saveContact(record);
    } catch (err) {
      console.error("Failed to save contact to MongoDB:", err);
    }

    form.reset();
    setSent(true);
    toast.success("Message sent — our team will respond within one business day.");
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-20 sm:pt-40 pb-10 sm:pb-20 tech-grid-bg">
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[650px] -translate-x-1/2 rounded-full bg-accent/15 blur-[160px] energy-glow" />
        <Particles count={24} />
        <div className="shell relative">
          <SectionHeading
            eyebrow="Contact Us"
            title={<span className="block font-display tracking-tight text-2xl sm:text-5xl font-extrabold text-primary">Let's build your charging future</span>}
            description="Tell us about your site, fleet or partnership idea and our team will respond within one business day."
          />
        </div>
      </section>

      {/* Main Content: Form & Company Details */}
      <section className="pb-16 sm:pb-24 tech-grid-bg">
        <div className="shell grid gap-6 sm:gap-8 lg:grid-cols-12 items-stretch">
          {/* Animated Movie-Like Moving Form Card */}
          <Reveal direction="left" className="lg:col-span-7 flex flex-col">
            <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col">
              <div className="surface-card relative overflow-hidden rounded-[24px] sm:rounded-[36px] border border-slate-200/90 bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col justify-between h-full hover:border-accent/40 transition-all duration-500">
                {/* Top Luxury Gradient Accent Line */}
                <div className="h-2 w-full bg-gradient-to-r from-navy via-accent to-navy-soft" />

                <div className="p-5 sm:p-11 flex-1 flex flex-col justify-center">
                  {/* Luxury Form Title */}
                  <div className="border-b border-slate-100 pb-4 sm:pb-6 mb-5 sm:mb-7">
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                      <span className="h-1.5 w-5 sm:w-6 rounded-full bg-accent" />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Direct Contact</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-3xl font-extrabold text-primary tracking-tight">
                      Send Us a Message
                    </h3>
                  </div>

                  {sent ? (
                    <div className="flex flex-col items-center py-8 sm:py-12 text-center my-auto">
                      <div className="size-12 sm:size-16 rounded-full bg-accent/10 border border-accent/20 grid place-items-center text-accent mb-3 sm:mb-4">
                        <CheckCircle2 className="size-6 sm:size-8" />
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-primary">Message sent</h3>
                      <p className="mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        Thank you for reaching out! Our team has received your message and will respond shortly.
                      </p>
                      <div className="mt-6 sm:mt-8">
                        <button
                          type="button"
                          onClick={() => setSent(false)}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-slate-50 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary transition-all hover:bg-slate-100 hover:border-accent/40 cursor-pointer shadow-sm"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={submit} className="space-y-4 sm:space-y-6">
                      {/* Full Name */}
                      <div>
                        <label className={labelCls} htmlFor="fullName">Full Name</label>
                        <div className="relative group">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 sm:pl-4.5 text-slate-400 group-focus-within:text-accent transition-colors">
                            <User className="size-4 sm:size-4.5" />
                          </div>
                          <input
                            id="fullName"
                            name="fullName"
                            className="w-full rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/70 pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-xs sm:text-sm font-display text-primary outline-none transition-all placeholder:text-slate-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 focus:shadow-[var(--shadow-glow)]"
                            placeholder="Your Name"
                          />
                        </div>
                        {errors.fullName && <p className="mt-1.5 text-xs text-destructive font-medium">{errors.fullName}</p>}
                      </div>

                      {/* Email & Phone */}
                      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                        <div>
                          <label className={labelCls} htmlFor="email">Email</label>
                          <div className="relative group">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 sm:pl-4.5 text-slate-400 group-focus-within:text-accent transition-colors">
                              <Mail className="size-4 sm:size-4.5" />
                            </div>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              className="w-full rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/70 pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-xs sm:text-sm font-display text-primary outline-none transition-all placeholder:text-slate-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 focus:shadow-[var(--shadow-glow)]"
                              placeholder="name@gmail.com"
                            />
                          </div>
                          {errors.email && <p className="mt-1.5 text-xs text-destructive font-medium">{errors.email}</p>}
                        </div>

                        <div>
                          <label className={labelCls} htmlFor="phone">Phone</label>
                          <div className="relative group">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 sm:pl-4.5 text-slate-400 group-focus-within:text-accent transition-colors">
                              <Phone className="size-4 sm:size-4.5" />
                            </div>
                            <input
                              id="phone"
                              name="phone"
                              className="w-full rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/70 pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-xs sm:text-sm font-display text-primary outline-none transition-all placeholder:text-slate-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 focus:shadow-[var(--shadow-glow)]"
                              placeholder="+91 ..."
                            />
                          </div>
                          {errors.phone && <p className="mt-1.5 text-xs text-destructive font-medium">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className={labelCls} htmlFor="message">Message</label>
                        <div className="relative group">
                          <div className="pointer-events-none absolute top-3.5 sm:top-4 left-0 flex items-center pl-3.5 sm:pl-4.5 text-slate-400 group-focus-within:text-accent transition-colors">
                            <MessageSquare className="size-4 sm:size-4.5" />
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            className="w-full rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/70 pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-xs sm:text-sm font-display text-primary outline-none transition-all placeholder:text-slate-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 focus:shadow-[var(--shadow-glow)]"
                            placeholder="How can we help?"
                          />
                        </div>
                        {errors.message && <p className="mt-1.5 text-xs text-destructive font-medium">{errors.message}</p>}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-1 sm:pt-2">
                        <BrandButton type="submit" size="lg" className="w-full justify-center shadow-xl py-3 sm:py-4 text-xs sm:text-base hover:scale-[1.01] transition-transform">
                          Send Message
                        </BrandButton>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Animated Movie-Like Moving Company Details Card */}
          <Reveal direction="right" className="lg:col-span-5 flex flex-col">
            <TiltCard intensity={8} floatAnimation={true} className="h-full flex flex-col">
              <div className="surface-card relative overflow-hidden rounded-[24px] sm:rounded-[36px] border border-white/25 [background:var(--gradient-primary)] text-white p-5 sm:p-11 shadow-2xl flex flex-col justify-between h-full hover:border-accent/60 transition-all duration-500">
                {/* Subtle Ambient Particle & Glow */}
                <div className="pointer-events-none absolute -top-24 -right-24 size-[340px] rounded-full bg-accent/25 blur-[120px]" />
                <Particles count={16} />

                <div className="relative z-10">
                  {/* Brand Header */}
                  <div className="flex items-center gap-3 sm:gap-4 border-b border-white/15 pb-5 sm:pb-7">
                    <LogoMark className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-white/10 p-2 sm:p-3 shadow-lg backdrop-blur-md border border-white/20 hover:scale-105 transition-transform" />
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">{COMPANY.name}</h3>
                      <p className="text-[10px] sm:text-xs font-semibold text-accent uppercase tracking-widest mt-0.5">{COMPANY.tagline}</p>
                    </div>
                  </div>

                  {/* Contact List */}
                  <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                    {[
                      { icon: MapPin, label: "Address", value: `${COMPANY.addressLine1} ${COMPANY.addressLine2}`, href: null },
                      { icon: Phone, label: "Phone", value: `Ph: ${COMPANY.phone}`, href: `tel:${COMPANY.phone}` },
                      { icon: Mail, label: "Email", value: `Mail: ${COMPANY.email}`, href: `mailto:${COMPANY.email}` },
                      { icon: Globe, label: "Website", value: COMPANY.website, href: `https://${COMPANY.website}` },
                    ].map((c) => (
                      <li
                        key={c.label}
                        className="group rounded-xl sm:rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-3 sm:p-4 transition-all duration-300 hover:bg-white/20 hover:border-accent/50 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-accent text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                            <c.icon className="size-4 sm:size-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-white/70 uppercase">{c.label}</p>
                            {c.href ? (
                              <a
                                href={c.href}
                                target={c.label === "Website" ? "_blank" : undefined}
                                rel={c.label === "Website" ? "noreferrer" : undefined}
                                className="mt-0.5 block text-xs sm:text-sm font-semibold text-white transition-colors group-hover:text-accent truncate"
                              >
                                {c.value}
                              </a>
                            ) : (
                              <p className="mt-0.5 text-xs sm:text-sm font-semibold text-white/95 leading-relaxed">{c.value}</p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden pb-12 sm:pb-[60px]">
        <div className="pointer-events-none absolute -bottom-32 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
        <div className="shell relative max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title={<span className="block font-display tracking-tight text-2xl sm:text-5xl font-extrabold text-primary">Frequently Asked Questions</span>}
            description="Have questions about autonomous charging, vehicle compatibility, or deployment timelines? Find answers below."
          />
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="mt-8 sm:mt-12 flex flex-col gap-3 sm:gap-4">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="surface-card hover-lift group overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-white/70 px-4 sm:px-6 py-1 backdrop-blur-xl transition-all duration-300 data-[state=open]:border-primary/40 data-[state=open]:bg-white/95 data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="py-3.5 sm:py-5 text-left transition-all hover:no-underline [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:bg-primary [&[data-state=open]>svg]:text-white [&>svg]:size-6 sm:[&>svg]:size-8 [&>svg]:rounded-full [&>svg]:bg-primary/10 [&>svg]:p-1.5 sm:[&>svg]:p-2 [&>svg]:text-primary [&>svg]:transition-all [&>svg]:duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                        <f.icon className="size-4 sm:size-5" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-accent uppercase">
                          {f.tag}
                        </span>
                        <h4 className="mt-0.5 font-display text-xs sm:text-lg font-semibold text-primary">
                          {f.q}
                        </h4>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-1 border-t border-border/40 pt-3 sm:pt-4 pb-4 sm:pb-5 pl-12 sm:pl-[3.75rem] pr-2 sm:pr-4 text-xs sm:text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
