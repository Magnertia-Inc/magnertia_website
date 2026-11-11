import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LogoMark, Wordmark } from "./LogoMark";
import { BrandButton } from "./BrandButton";
import { NAV_LINKS } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { scrollY } = useScroll();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const checkAuthStatus = () => {
    if (typeof window !== "undefined") {
      setIsAuth(sessionStorage.getItem("magnertia_admin_auth") === "true");
    }
  };

  useEffect(() => {
    checkAuthStatus();
    const handleAuthEvent = () => checkAuthStatus();
    window.addEventListener("admin_auth_change", handleAuthEvent);
    window.addEventListener("storage", handleAuthEvent);
    return () => {
      window.removeEventListener("admin_auth_change", handleAuthEvent);
      window.removeEventListener("storage", handleAuthEvent);
    };
  }, [path]);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const handleAuthAction = () => {
    const currentAuth = typeof window !== "undefined" && sessionStorage.getItem("magnertia_admin_auth") === "true";
    if (currentAuth) {
      sessionStorage.removeItem("magnertia_admin_auth");
      setIsAuth(false);
      window.dispatchEvent(new CustomEvent("admin_auth_change"));
      toast.info("Logged out successfully.");
      navigate({ to: "/login" });
    } else {
      navigate({ to: "/login" });
    }
  };

  const darkHeroRoutes = ["/"];
  const isDarkHeroRoute = darkHeroRoutes.some((r) => (r === "/" ? path === "/" : path.startsWith(r)));
  const isDarkHero = !scrolled && isDarkHeroRoute;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-slate-200/80 bg-white/85 py-3 backdrop-blur-xl shadow-md text-primary"
          : isDarkHero
            ? "border-b border-white/15 bg-slate-950/40 py-4 backdrop-blur-xl shadow-2xl text-white"
            : "border-b border-transparent bg-transparent py-5 text-primary",
      )}
    >
      <nav className="shell flex items-center justify-between gap-4 sm:gap-6">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3" aria-label="Magnertia home">
          <motion.span whileHover={{ rotate: -6, scale: 1.08 }} transition={{ type: "spring" }}>
            <LogoMark className="h-9 w-9 sm:h-12 sm:w-12" />
          </motion.span>
          <Wordmark className={cn("block transition-colors text-lg sm:text-2xl font-extrabold", isDarkHero ? "text-white drop-shadow-sm" : "text-primary")} />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => {
            const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "underline-link relative inline-flex items-center gap-1.5 text-sm transition-colors font-medium",
                    isDarkHero
                      ? active
                        ? "text-sky-300 font-extrabold"
                        : "text-white/85 hover:text-white"
                      : active
                        ? "text-accent font-extrabold"
                        : "text-slate-700 hover:text-primary",
                  )}
                >
                  {l.label}
                  {Boolean((l as { badge?: string }).badge) && (
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-bold tracking-wider animate-pulse border",
                      isDarkHero
                        ? "bg-sky-400/20 text-sky-200 border-sky-400/40"
                        : "bg-accent/15 text-accent border-accent/30"
                    )}>
                      {(l as { badge?: string }).badge}
                    </span>
                  )}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full [background:var(--gradient-accent)]"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 shrink-0">
          <BrandButton
            onClick={handleAuthAction}
            variant={isDarkHero ? "accent" : "login"}
            size="sm"
            className="hidden sm:inline-flex shrink-0 whitespace-nowrap shadow-lg min-w-[105px] px-5 py-2 cursor-pointer"
            arrow={false}
          >
            {isAuth ? (
              <>
                <LogOut className="size-4 text-red-300 shrink-0 transition-transform group-hover:scale-110" />
                <span className="whitespace-nowrap">Logout</span>
              </>
            ) : (
              <>
                <LogIn className="size-4 text-sky-200 shrink-0 transition-transform group-hover:scale-110" />
                <span className="whitespace-nowrap">Login</span>
              </>
            )}
          </BrandButton>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={cn(
              "grid size-11 place-items-center rounded-full border backdrop-blur-md lg:hidden transition-colors",
              isDarkHero
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-border bg-white/70 text-primary hover:bg-white",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="shell pt-3 pb-6">
              <div className={cn("rounded-3xl p-3 border shadow-2xl backdrop-blur-2xl max-h-[78vh] overflow-y-auto", isDarkHero ? "bg-slate-900/95 border-white/15" : "glass")}>
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-5 py-3.5 text-base font-medium transition-colors",
                        isDarkHero
                          ? "text-white hover:bg-white/10"
                          : "text-primary hover:bg-white/70"
                      )}
                    >
                      <span>{l.label}</span>
                      {Boolean((l as { badge?: string }).badge) && (
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wider border",
                          isDarkHero
                            ? "bg-sky-400/20 text-sky-200 border-sky-400/40"
                            : "bg-accent/15 text-accent border-accent/30"
                        )}>
                          {(l as { badge?: string }).badge}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-3 px-2">
                  <BrandButton
                    onClick={() => {
                      setOpen(false);
                      handleAuthAction();
                    }}
                    variant={isDarkHero ? "accent" : "login"}
                    size="md"
                    className="w-full justify-center cursor-pointer"
                    arrow={false}
                  >
                    {isAuth ? (
                      <>
                        <LogOut className="size-4 text-red-300" />
                        <span>Logout</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="size-4 text-sky-200" />
                        <span>Login</span>
                      </>
                    )}
                  </BrandButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
