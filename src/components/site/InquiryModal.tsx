import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { BrandButton } from "./BrandButton";
import { PRODUCTS } from "@/data/site";
import { saveInquiry, type InquiryRecord } from "@/lib/api-client";
import { saveSubmissionLocally } from "@/lib/excel-client";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  businessType: z.string().max(60),
  product: z.string().max(80),
  requirements: z.string().trim().max(1000),
  quantity: z.string().trim().max(20),
  deployment: z.string().trim().max(60),
  gst: z.string().trim().max(20).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  fleetSize: z.string().trim().max(20).optional().or(z.literal("")),
  purpose: z.string().trim().max(300).optional().or(z.literal("")),
});

const field =
  "w-full rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-foreground outline-none backdrop-blur-md transition-all placeholder:text-muted-foreground/70 focus:border-accent focus:shadow-[var(--shadow-glow)]";
const labelCls = "mb-2 block text-xs font-semibold tracking-[0.14em] text-primary/70 uppercase";

export function InquiryModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product?: string;
}) {
  const [isBusiness, setIsBusiness] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [lastSubmittedRecord, setLastSubmittedRecord] = useState<InquiryRecord | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      toast.error("Please review the highlighted fields.");
      return;
    }

    const record: InquiryRecord = {
      type: "inquiry",
      fullName: String(parsed.data.fullName || ""),
      email: String(parsed.data.email || ""),
      phone: String(parsed.data.phone || ""),
      company: String(parsed.data.company || data.companyName || ""),
      businessType: String(parsed.data.businessType || ""),
      product: String(parsed.data.product || ""),
      requirements: String(parsed.data.requirements || ""),
      quantity: String(parsed.data.quantity || ""),
      deployment: String(parsed.data.deployment || ""),
      gst: String(parsed.data.gst || ""),
      location: String(parsed.data.location || ""),
      fleetSize: String(parsed.data.fleetSize || ""),
      purpose: String(parsed.data.purpose || ""),
    };

    setErrors({});

    try {
      await saveInquiry(record);
    } catch (err) {
      console.error("Failed to save inquiry:", err);
      toast.error("We couldn't send your enquiry right now. Please try again in a moment.");
      return;
    }
    saveSubmissionLocally(record);
    setLastSubmittedRecord(record);

    setSent(true);
    toast.success("Enquiry received — stored securely for our admin team.");
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-primary/40 p-3 sm:p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass my-4 sm:my-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[24px] sm:rounded-[28px] p-5 sm:p-10"
          >
            {sent ? (
              <div className="flex flex-col items-center py-12 sm:py-16 text-center">
                <CheckCircle2 className="size-12 sm:size-14 text-accent" />
                <h3 className="mt-6 text-xl sm:text-2xl font-bold">Enquiry submitted</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Thank you — your specifications enquiry has been stored. A Magnertia specialist will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
                      Product Enquiry
                    </p>
                    <h3 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold">Request full specifications</h3>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                      Share a few details and we'll send the complete technical dossier.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-white/70 text-primary transition-colors hover:bg-white"
                  >
                    <X className="size-4.5" />
                  </button>
                </div>

                <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="fullName">
                      Full Name
                    </label>
                    <input id="fullName" name="fullName" className={field} placeholder="Your Name" />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="company">
                      Company
                    </label>
                    <input id="company" name="company" className={field} placeholder="Company" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={field}
                      placeholder="name@gmail.com"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="phone">
                      Phone
                    </label>
                    <input id="phone" name="phone" className={field} placeholder="+91 ..." />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="businessType">
                      Business Type
                    </label>
                    <select id="businessType" name="businessType" className={field}>
                      {[
                        "Individual",
                        "Fleet Operator",
                        "Charge Point Operator",
                        "OEM",
                        "Real Estate",
                        "Government",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="product">
                      Product Interested
                    </label>
                    <select
                      id="product"
                      name="product"
                      className={field}
                      defaultValue={product ?? PRODUCTS[0].name}
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.slug}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="quantity">
                      Quantity
                    </label>
                    <input id="quantity" name="quantity" className={field} placeholder="e.g. 25" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="deployment">
                      Expected Deployment
                    </label>
                    <input
                      id="deployment"
                      name="deployment"
                      className={field}
                      placeholder="Q1 2027"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="requirements">
                      Requirements
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={3}
                      className={field}
                      placeholder="Tell us about your site, vehicles and timelines."
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={isBusiness}
                      onChange={(e) => setIsBusiness(e.target.checked)}
                      className="size-4.5 accent-[#2E8BFF]"
                    />
                    <span className="text-sm text-foreground">
                      This is a business / enterprise enquiry
                    </span>
                  </label>

                  <AnimatePresence>
                    {isBusiness && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid gap-5 overflow-hidden sm:col-span-2 sm:grid-cols-2"
                      >
                        <div>
                          <label className={labelCls} htmlFor="companyName">
                            Company Name
                          </label>
                          <input id="companyName" name="companyName" className={field} />
                        </div>
                        <div>
                          <label className={labelCls} htmlFor="gst">
                            GST Number
                          </label>
                          <input id="gst" name="gst" className={field} />
                        </div>
                        <div>
                          <label className={labelCls} htmlFor="location">
                            Location
                          </label>
                          <input id="location" name="location" className={field} />
                        </div>
                        <div>
                          <label className={labelCls} htmlFor="fleetSize">
                            Fleet Size
                          </label>
                          <input id="fleetSize" name="fleetSize" className={field} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls} htmlFor="purpose">
                            Purpose
                          </label>
                          <textarea id="purpose" name="purpose" rows={2} className={field} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="sm:col-span-2">
                    <BrandButton type="submit" size="lg" className="w-full">
                      Submit Enquiry
                    </BrandButton>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
