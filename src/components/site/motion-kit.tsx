import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------- Reveal ---------------- */
type Dir = "up" | "left" | "right" | "scale" | "blur";

const offsets: Record<Dir, { x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { y: 34 },
  left: { x: -40 },
  right: { x: 40 },
  scale: { scale: 0.94 },
  blur: { filter: "blur(14px)", y: 18 },
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Dir;
  className?: string;
}) {
  const from = offsets[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 0, y: 0, scale: 1, filter: "blur(0px)", ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Counter ---------------- */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(val)}
      {suffix}
    </span>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-4xl lg:max-w-5xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        tone === "dark" && "text-white",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <div
            className={cn(
              "mb-2.5 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em]",
              tone === "dark" ? "text-amber-300" : "text-accent",
            )}
          >
            <span className={cn("h-0.5 w-6 rounded-full", tone === "dark" ? "bg-amber-300" : "bg-accent")} />
            <span>{eyebrow}</span>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="mt-1 text-3xl leading-[1.12] sm:text-4xl lg:text-[44px]">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed",
              align === "center" ? "text-center mx-auto" : "text-left",
              tone === "dark" ? "text-white/75" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Magnetic button ---------------- */
export function MagneticButton({
  children,
  className,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 240, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 240, damping: 18 });

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ---------------- Particles ---------------- */
export function Particles({ count = 26, className }: { count?: number; className?: string }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    size: 2 + ((i * 7) % 4),
    delay: (i % 10) * 0.6,
    dur: 7 + ((i * 3) % 7),
  }));
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-accent/40"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
          }}
          animate={{ y: [0, -26, 0], opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ---------------- 3D Tilt & Moving Card ---------------- */
export function TiltCard({
  children,
  className,
  intensity = 10,
  floatAnimation = false,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  floatAnimation?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={floatAnimation ? { y: [0, -8, 0] } : undefined}
      transition={
        floatAnimation
          ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("perspective-[1200px] transition-all duration-200", className)}
    >
      {children}
    </motion.div>
  );
}
