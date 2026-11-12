import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  FileSpreadsheet,
  Download,
  RefreshCw,
  Search,
  LogOut,
  UserCheck,
  Inbox,
  MessageSquare,
  Eye,
  X,
  Building2,
  Mail,
  Phone,
  Calendar,
  Layers,
  FileText,
  Clock,
  Trash2,
} from "lucide-react";
import { Reveal, Particles } from "@/components/site/motion-kit";
import { BrandButton } from "@/components/site/BrandButton";
import { LogoMark } from "@/components/site/LogoMark";
import {
  getSubmissions,
  deleteSubmission,
  adminLogin,
  clearAdminSession,
  isAdminLoggedIn,
  UnauthorizedError,
  type SubmissionDocument,
} from "@/lib/api-client";
import { downloadExcelSheet, downloadCsvSheet } from "@/lib/excel-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login — Magnertia Dashboard" },
      {
        name: "description",
        content: "Sign in to the Magnertia dashboard to monitor your autonomous charging network.",
      },
      { property: "og:title", content: "Login — Magnertia" },
      { property: "og:description", content: "Access your Magnertia charging telemetry dashboard." },
      { property: "og:url", content: "/login" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(1, "Password is required").max(100),
});

const field =
  "w-full rounded-2xl border border-border bg-white/70 px-4 py-3.5 text-sm outline-none backdrop-blur-md transition-all placeholder:text-muted-foreground/70 focus:border-accent focus:shadow-[var(--shadow-glow)] font-display";
const labelCls = "mb-2 block text-xs font-semibold tracking-[0.14em] text-primary/70 uppercase font-display";

function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"inquiries" | "contacts">("inquiries");
  const [inquiries, setInquiries] = useState<SubmissionDocument[]>([]);
  const [contacts, setContacts] = useState<SubmissionDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Record<string, any> | null>(null);
  const [isMongoDBConnected, setIsMongoDBConnected] = useState<boolean>(true);

  useEffect(() => {
    const syncAuth = () => {
      const sessionAuth = isAdminLoggedIn();
      setIsAuthenticated(sessionAuth);
      if (sessionAuth) {
        fetchData();
      }
    };
    syncAuth();
    window.addEventListener("admin_auth_change", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("admin_auth_change", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getSubmissions();
      if (res && res.success) {
        setInquiries(res.inquiries || []);
        setContacts(res.contacts || []);
        setIsMongoDBConnected(res.isMongoDB !== false);
      } else {
        toast.error("Could not fetch data from MongoDB.");
        setIsMongoDBConnected(false);
      }
    } catch (err) {
      console.error("Failed to load records:", err);
      if (err instanceof UnauthorizedError) {
        toast.error(err.message);
        setIsAuthenticated(false);
      } else {
        toast.error("Failed to reach the API server.");
        setIsMongoDBConnected(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const [signingIn, setSigningIn] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }

    setSigningIn(true);
    try {
      await adminLogin(parsed.data.email, parsed.data.password);
      setErrors({});
      setPassword("");
      setIsAuthenticated(true);
      toast.success("Signed in — welcome to Admin Dashboard.");
      fetchData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid email or password.";
      setErrors({
        email: message,
        password: "Please check your credentials.",
      });
      toast.error(message);
    } finally {
      setSigningIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    clearAdminSession();
    toast.info("Logged out.");
  };

  const handleDownloadAllExcel = () => {
    try {
      downloadExcelSheet(inquiries, contacts);
      toast.success("Downloading all submissions (.xlsx)...");
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Failed to download Excel file.");
    }
  };

  const handleDownloadCsv = () => {
    try {
      downloadCsvSheet(inquiries, contacts, activeTab);
      toast.success(`Downloading submissions (.csv)...`);
    } catch (err) {
      console.error("CSV Download error:", err);
      toast.error("Failed to download CSV file.");
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission from MongoDB?")) {
      try {
        const type = activeTab === "inquiries" ? "inquiry" : "contact";
        const res = await deleteSubmission(type, id);
        if (res && res.success) {
          toast.success("Submission deleted successfully!");
        } else {
          toast.error("Failed to delete from MongoDB.");
        }
        fetchData();
      } catch (err) {
        console.error("Delete error:", err);
        toast.error(err instanceof UnauthorizedError ? err.message : "Failed to delete record.");
        if (err instanceof UnauthorizedError) setIsAuthenticated(false);
      }
    }
  };

  // Filtered dataset
  const currentList = activeTab === "inquiries" ? inquiries : contacts;
  const filteredList = currentList.filter((row) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return Object.values(row).some((val) => String(val || "").toLowerCase().includes(q));
  });

  return (
    <section className="relative min-h-screen pt-20 sm:pt-32 pb-16 sm:pb-24 overflow-hidden font-display">
      <div className="pointer-events-none absolute -top-40 -left-32 size-[560px] rounded-full bg-accent/15 blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 -bottom-40 size-[560px] rounded-full bg-primary/12 blur-[150px]" />
      <Particles count={24} />

      <div className="shell relative z-10">
        {!isAuthenticated ? (
          /* STANDARD CLEAN LOGIN FORM */
          <div className="grid place-items-center py-6 sm:py-10">
            <Reveal direction="scale" className="relative w-full max-w-md">
              <div className="glass rounded-[24px] sm:rounded-[32px] border border-white/40 p-5 sm:p-11 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <LogoMark className="h-16 w-16 sm:h-24 sm:w-24" />
                  <h1 className="mt-4 sm:mt-5 text-xl font-bold tracking-tight text-primary sm:text-3xl">Welcome back</h1>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
                    Sign in to your Magnertia dashboard
                  </p>
                </div>

                <form onSubmit={handleLogin} className="mt-6 sm:mt-9 grid gap-4 sm:gap-5">
                  <div>
                    <label className={labelCls} htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={field}
                      placeholder="name@gmail.com"
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="password">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={field}
                      placeholder="••••••••"
                    />
                    {errors.password && <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>}
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <label className="flex cursor-pointer items-center gap-2 text-muted-foreground text-xs">
                      <input type="checkbox" name="remember" className="size-4 accent-accent" />
                      Remember me
                    </label>
                    <a href="#" className="text-xs text-accent underline-link">Forgot password?</a>
                  </div>
                  <BrandButton type="submit" variant="login" size="lg" disabled={signingIn} className="mt-2 w-full shadow-xl cursor-pointer py-3 text-xs sm:text-base">
                    {signingIn ? "Signing in…" : "Sign In"}
                  </BrandButton>
                </form>

                <div className="mt-5 sm:mt-7 text-center">
                  <Link to="/" className="text-xs sm:text-sm text-muted-foreground underline-link">
                    Back Home
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        ) : (
          /* ELEGANT, PERFECTLY ALIGNED ADMIN EXCEL DASHBOARD */
          <div className="max-w-6xl mx-auto space-y-7 font-display">
            {/* Header Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-border bg-white/80 p-4 sm:p-7 shadow-xl backdrop-blur-xl font-display">
              <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between font-display">

                {/* Left: Title & File info */}
                <div className="flex items-center gap-3 sm:gap-4 font-display">
                  <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary text-white shadow-md font-display">
                    <FileSpreadsheet className="size-5 sm:size-6" />
                  </div>
                  <div className="font-display">
                    <h1 className="text-lg font-bold text-primary sm:text-2xl font-display">
                      Admin Dashboard
                    </h1>
                    <div className="mt-0.5 sm:mt-1 flex items-center gap-2 text-xs font-display">
                      <span className="text-muted-foreground text-[11px] sm:text-xs">Database:</span>
                      {isMongoDBConnected ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2 sm:px-2.5 py-0.5 text-[0.65rem] sm:text-[0.7rem] font-bold text-emerald-700 font-display">
                          <span className="size-1.5 sm:size-2 rounded-full bg-emerald-500 animate-pulse" />
                          MongoDB Connected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2 sm:px-2.5 py-0.5 text-[0.65rem] sm:text-[0.7rem] font-bold text-amber-700 font-display">
                          <span className="size-1.5 sm:size-2 rounded-full bg-amber-500 animate-ping" />
                          Offline (Local Fallback)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadAllExcel}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-3 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs font-semibold text-white transition-all shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-95 cursor-pointer"
                  >
                    <Download className="size-3.5 sm:size-4 text-accent" />
                    Download (.xlsx)
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadCsv}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-600 px-3 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs font-semibold text-white transition-all shadow-md hover:bg-emerald-700 hover:shadow-lg active:scale-95 cursor-pointer"
                  >
                    <FileText className="size-3.5 sm:size-4 text-white" />
                    Download CSV (.csv)
                  </button>

                  <button
                    type="button"
                    onClick={fetchData}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-border bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 text-[11px] sm:text-xs font-medium text-foreground transition-all hover:bg-slate-50 cursor-pointer"
                  >
                    <RefreshCw className={`size-3 sm:size-3.5 text-slate-600 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            {/* Controls Bar: Tabs & Search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Tabs */}
              <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1.5 rounded-2xl bg-white/80 p-1 border border-border shadow-sm backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setActiveTab("inquiries")}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${activeTab === "inquiries"
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100"
                    }`}
                >
                  <Inbox className="size-3.5" />
                  Enquire Specs
                  <span className={`rounded-full px-1.5 sm:px-2 py-0.5 text-[0.65rem] sm:text-[0.68rem] font-bold ${activeTab === "inquiries" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}>
                    {inquiries.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("contacts")}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${activeTab === "contacts"
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100"
                    }`}
                >
                  <MessageSquare className="size-3.5" />
                  Contact Messages
                  <span className={`rounded-full px-1.5 sm:px-2 py-0.5 text-[0.65rem] sm:text-[0.68rem] font-bold ${activeTab === "contacts" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}>
                    {contacts.length}
                  </span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search entries..."
                  className="w-full rounded-2xl border border-border bg-white pl-8.5 sm:pl-9 pr-8 py-2 text-xs text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-display"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* TABLE - WITH SMOOTH MOBILE HORIZONTAL SCROLLING */}
            <div className="rounded-xl sm:rounded-2xl border border-border bg-white shadow-xl overflow-x-auto font-display">
              <table className="w-full text-left text-xs border-collapse font-display min-w-[600px]">
                <thead className="font-display">
                  <tr className="bg-slate-50 border-b border-border text-slate-600 font-semibold uppercase tracking-wider text-[0.65rem] sm:text-[0.7rem] font-display">
                    <th className="py-3 px-3 sm:py-3.5 sm:px-4 w-12 sm:w-16 text-center font-display">S.NO</th>
                    <th className="py-3 px-3 sm:py-3.5 sm:px-4 w-36 sm:w-44 font-display">Submitted On</th>
                    <th className="py-3 px-3 sm:py-3.5 sm:px-4 w-48 sm:w-60 font-display">Submitted By</th>
                    <th className="py-3 px-3 sm:py-3.5 sm:px-4 font-display">Summary & Details</th>
                    <th className="py-3 px-3 sm:py-3.5 sm:px-4 w-36 sm:w-40 text-right font-display">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-display">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 sm:py-14 text-center text-muted-foreground font-display">
                        <RefreshCw className="mx-auto size-5 sm:size-6 animate-spin text-accent" />
                        <p className="mt-2 text-xs font-medium font-display">Loading records from MongoDB...</p>
                      </td>
                    </tr>
                  ) : filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 sm:py-16 text-center text-muted-foreground font-display">
                        <Inbox className="mx-auto size-8 sm:size-10 text-slate-300" />
                        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-semibold text-slate-700 font-display">No submissions found</p>
                        <p className="mt-1 text-[11px] sm:text-xs text-slate-500 font-display">
                          {searchQuery
                            ? "No entries match your search criteria."
                            : "Form submissions will appear here automatically when submitted."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredList.map((row, idx) => {
                      const name = row["Full Name"] || row["fullName"] || "Anonymous";
                      const email = row["Email"] || row["email"] || "-";
                      const phone = row["Phone"] || row["phone"] || "-";
                      const timestamp = row["Submission Timestamp"] || (row["createdAt"] ? new Date(row["createdAt"]).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) : "-");

                      return (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/80 transition-colors font-display text-[11px] sm:text-xs"
                        >
                          <td className="py-3 px-3 sm:py-4 sm:px-4 text-center font-display text-slate-400 font-medium">{idx + 1}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-4 whitespace-nowrap text-slate-600 font-medium">
                            <div className="flex items-center gap-1.5">
                              <Clock className="size-3.5 text-slate-400 shrink-0" />
                              <span>{timestamp}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-4">
                            <div className="font-bold text-primary text-[11px] sm:text-xs">{name}</div>
                            <div className="text-[0.68rem] sm:text-[0.72rem] text-slate-500 mt-0.5 truncate max-w-[180px] sm:max-w-[220px]">
                              {email} {phone !== "-" ? `· ${phone}` : ""}
                            </div>
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-4">
                            {activeTab === "inquiries" ? (
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <span className="font-semibold text-primary">
                                  {row["Product Requested"] || row["product"] || "General Enquiry"}
                                </span>
                                {(row["Business Type"] || row["businessType"]) && (
                                  <span className="inline-flex rounded-md bg-sky-50 px-1.5 sm:px-2 py-0.5 text-[0.65rem] sm:text-[0.68rem] font-bold text-sky-700 border border-sky-200">
                                    {row["Business Type"] || row["businessType"]}
                                  </span>
                                )}
                                {(row["Company Name"] || row["company"]) && (
                                  <span className="text-[0.68rem] sm:text-[0.72rem] text-slate-500">
                                    at {row["Company Name"] || row["company"]}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <p className="text-slate-600 line-clamp-2 text-[11px] sm:text-xs leading-relaxed max-w-xl">
                                {row["Message"] || row["message"] || "-"}
                              </p>
                            )}
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-4 text-right">
                            <div className="flex items-center justify-end gap-1 sm:gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedRecord(row)}
                                className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                              >
                                <Eye className="size-3 sm:size-3.5" />
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRecord(row._id || (row as any).id || String(idx))}
                                className="inline-flex items-center gap-1 rounded-lg bg-red-50 text-red-600 border border-red-200/80 px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer"
                                title="Delete record"
                              >
                                <Trash2 className="size-3 sm:size-3.5" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* GORGEOUS VIEW DETAILS MODAL */}
            {selectedRecord && (
              <div
                className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-slate-900/50 p-3 sm:p-4 backdrop-blur-md"
                onClick={() => setSelectedRecord(null)}
              >
                <div
                  className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-8 shadow-2xl border border-slate-200 font-display my-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3.5 sm:pb-5">
                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                      <div className="flex size-9 sm:size-11 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary">
                        {activeTab === "inquiries" ? <Inbox className="size-4.5 sm:size-6" /> : <MessageSquare className="size-4.5 sm:size-6" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="inline-flex rounded-full bg-accent/20 px-2 sm:px-2.5 py-0.5 text-[0.62rem] sm:text-[0.68rem] font-bold text-accent uppercase tracking-wider">
                            {activeTab === "inquiries" ? "Specification Enquiry" : "Contact Message"}
                          </span>
                          <span className="text-[10px] sm:text-xs text-slate-400">
                            {selectedRecord["Submission Timestamp"] || selectedRecord["timestamp"] || ""}
                          </span>
                        </div>
                        <h3 className="mt-0.5 sm:mt-1 text-base sm:text-xl font-bold text-primary">
                          {selectedRecord["Full Name"] || selectedRecord["fullName"] || "Submission Record"}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedRecord(null)}
                      className="rounded-full bg-slate-100 p-1.5 sm:p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all cursor-pointer"
                    >
                      <X className="size-3.5 sm:size-4" />
                    </button>
                  </div>

                  {/* Modal Content Sections */}
                  <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5 max-h-[60vh] overflow-y-auto pr-1">

                    {/* Submitter Info Card */}
                    <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                      <p className="text-[0.65rem] sm:text-[0.68rem] font-bold tracking-wider text-slate-400 uppercase">
                        Contact Information
                      </p>
                      <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 text-[11px] sm:text-xs">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail className="size-3.5 sm:size-4 text-accent shrink-0" />
                          <span className="font-semibold text-primary">Email:</span>
                          <span className="truncate">{selectedRecord["Email"] || selectedRecord["email"] || "-"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone className="size-3.5 sm:size-4 text-accent shrink-0" />
                          <span className="font-semibold text-primary">Phone:</span>
                          <span>{selectedRecord["Phone"] || selectedRecord["phone"] || "-"}</span>
                        </div>
                        {(selectedRecord["Company Name"] || selectedRecord["company"]) && (
                          <div className="flex items-center gap-2 text-slate-700">
                            <Building2 className="size-3.5 sm:size-4 text-accent shrink-0" />
                            <span className="font-semibold text-primary">Company:</span>
                            <span>{selectedRecord["Company Name"] || selectedRecord["company"]}</span>
                          </div>
                        )}
                        {(selectedRecord["Location / City"] || selectedRecord["location"]) && (
                          <div className="flex items-center gap-2 text-slate-700">
                            <span className="font-semibold text-primary">Location:</span>
                            <span>{selectedRecord["Location / City"] || selectedRecord["location"]}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Specification / Request Card (for Inquiries) */}
                    {activeTab === "inquiries" && (
                      <div className="rounded-xl sm:rounded-2xl bg-sky-50/60 border border-sky-200/80 p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                        <p className="text-[0.65rem] sm:text-[0.68rem] font-bold tracking-wider text-sky-800 uppercase">
                          Product Specifications Requested
                        </p>
                        <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 text-[11px] sm:text-xs">
                          <div>
                            <span className="text-slate-500">Product:</span>{" "}
                            <span className="font-bold text-primary">{selectedRecord["Product Requested"] || selectedRecord["product"] || "-"}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Quantity:</span>{" "}
                            <span className="font-bold text-primary">{selectedRecord["Quantity"] || selectedRecord["quantity"] || "-"}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Business Type:</span>{" "}
                            <span className="font-semibold text-primary">{selectedRecord["Business Type"] || selectedRecord["businessType"] || "-"}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Timeline:</span>{" "}
                            <span className="font-semibold text-primary">{selectedRecord["Deployment Timeline"] || selectedRecord["deployment"] || "-"}</span>
                          </div>
                          {selectedRecord["GST / Tax ID"] && selectedRecord["GST / Tax ID"] !== "-" && (
                            <div>
                              <span className="text-slate-500">GST ID:</span>{" "}
                              <span className="font-mono text-primary font-semibold">{selectedRecord["GST / Tax ID"]}</span>
                            </div>
                          )}
                          {selectedRecord["Fleet Size"] && selectedRecord["Fleet Size"] !== "-" && (
                            <div>
                              <span className="text-slate-500">Fleet Size:</span>{" "}
                              <span className="font-semibold text-primary">{selectedRecord["Fleet Size"]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Details / Message Box */}
                    <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 p-3 sm:p-4">
                      <p className="text-[0.65rem] sm:text-[0.68rem] font-bold tracking-wider text-slate-400 uppercase mb-1.5 sm:mb-2">
                        {activeTab === "inquiries" ? "Requirements & Remarks" : "Full Message"}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {selectedRecord["Requirements & Details"] ||
                          selectedRecord["requirements"] ||
                          selectedRecord["Message"] ||
                          selectedRecord["message"] ||
                          "No additional details specified."}
                      </p>
                    </div>

                  </div>

                  {/* Modal Footer */}
                  <div className="mt-5 sm:mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:pt-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadAllExcel}
                        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-semibold text-white hover:bg-primary/90 transition-all cursor-pointer"
                      >
                        <Download className="size-3.5 text-accent" />
                        Download (.xlsx)
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadCsv}
                        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-all cursor-pointer"
                      >
                        <FileText className="size-3.5 text-white" />
                        Download CSV (.csv)
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedRecord(null)}
                      className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
}
