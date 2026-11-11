import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { COMPANY } from "@/data/site";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left [background:var(--gradient-accent)]"
    />
  );
}

export function MouseGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <>
      <div
        className="pointer-events-none fixed z-[55] hidden size-[420px] rounded-full opacity-60 blur-[120px] lg:block"
        style={{
          left: pos.x - 210,
          top: pos.y - 210,
          background: "radial-gradient(circle, rgba(46,139,255,0.22), transparent 70%)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[70] hidden size-6 rounded-full border border-accent/70 lg:block"
        animate={{ x: pos.x - 12, y: pos.y - 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.4 }}
      />
    </>
  );
}

export function WhatsAppIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.733 0-3.418-.46-4.9-1.332l-.351-.208-3.644.956.973-3.553-.228-.363a9.88 9.88 0 01-1.517-5.26c0-5.454 4.437-9.892 9.897-9.892 2.64 0 5.12 1.03 6.984 2.898a9.825 9.825 0 012.89 6.993c0 5.456-4.437 9.896-9.894 9.896M12.05 0C5.402 0 0 5.404 0 12.051c0 2.122.553 4.195 1.604 6.015L0 24l6.104-1.601a12.008 12.008 0 005.946 1.572h.005c6.647 0 12.052-5.406 12.052-12.054C24.107 5.404 18.702 0 12.05 0" />
    </svg>
  );
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-3.5 bottom-4 sm:right-6 sm:bottom-7 z-[65] flex flex-col items-end gap-2.5 sm:gap-3.5">
      <div className="group relative flex items-center">
        <span className="pointer-events-none absolute right-16 hidden rounded-xl bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
        <a
          href="https://wa.me/917708100362"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp with 7708100362"
          className="relative flex size-12 sm:size-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] border border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_30px_rgba(37,211,102,0.65)] active:scale-95"
        >
          <span className="absolute inset-0 size-full animate-ping rounded-full bg-[#25D366]/30 opacity-75" />
          <WhatsAppIcon className="relative size-6 sm:size-7 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
        </a>
      </div>

      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="grid size-10 sm:size-12 place-items-center rounded-full border border-border bg-white/85 text-primary shadow-md backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-[var(--shadow-glow)] active:scale-95"
          >
            <ArrowUp className="size-4 sm:size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
