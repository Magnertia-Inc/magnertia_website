import * as XLSX from "xlsx";
import type { InquiryRecord } from "@/lib/api-client";

const STORAGE_KEY = "magnertia_form_submissions";

export function saveSubmissionLocally(record: InquiryRecord) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalSubmissions();
    existing.push({
      ...record,
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to save submission locally:", err);
  }
}

export function getLocalSubmissions(): Array<InquiryRecord & { timestamp?: string }> {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteLocalSubmission(type: "inquiry" | "contact", targetId: string) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalSubmissions();
    const filtered = existing.filter((item, idx) => {
      const itemType = item.type || "inquiry";
      const itemId = (item as any)._id || (item as any).id || `local_${itemType === "inquiry" ? "inq" : "cnt"}_${idx}`;
      if (itemId === targetId || String(idx) === targetId) {
        return false;
      }
      return true;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error("Failed to delete submission locally:", err);
  }
}

function triggerBlobDownload(wb: XLSX.WorkBook, filename: string) {
  if (typeof window === "undefined") return;
  try {
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; ++i) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }

    const blob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
      window.URL.revokeObjectURL(url);
    }, 200);
  } catch (err) {
    console.error("Blob download failed, fallback to XLSX.writeFile:", err);
    XLSX.writeFile(wb, filename);
  }
}

export function downloadExcelSheet(
  serverInquiries?: Record<string, any>[],
  serverContacts?: Record<string, any>[]
) {
  if (typeof window === "undefined") return;

  const submissions = getLocalSubmissions();
  
  let formattedInquiries: Record<string, any>[] = [];
  if (serverInquiries && serverInquiries.length > 0) {
    formattedInquiries = serverInquiries.map((data) => ({
      "Submission Timestamp": data["Submission Timestamp"] || data.timestamp || data.createdAt || "-",
      "Full Name": data["Full Name"] || data.fullName || "",
      "Email": data["Email"] || data.email || "",
      "Phone": data["Phone"] || data.phone || "",
      "Company Name": data["Company Name"] || data.company || "-",
      "Business Type": data["Business Type"] || data.businessType || "-",
      "Product Requested": data["Product Requested"] || data.product || "-",
      "Quantity": data["Quantity"] || data.quantity || "-",
      "Deployment Timeline": data["Deployment Timeline"] || data.deployment || "-",
      "GST / Tax ID": data["GST / Tax ID"] || data.gst || "-",
      "Location / City": data["Location / City"] || data.location || "-",
      "Fleet Size": data["Fleet Size"] || data.fleetSize || "-",
      "Primary Purpose": data["Primary Purpose"] || data.purpose || "-",
      "Requirements & Details": data["Requirements & Details"] || data.requirements || "-",
    }));
  } else {
    const inquiries = submissions.filter((s) => s.type === "inquiry" || !s.type);
    formattedInquiries = inquiries.map((data) => ({
      "Submission Timestamp": data.timestamp || "-",
      "Full Name": data.fullName || "",
      "Email": data.email || "",
      "Phone": data.phone || "",
      "Company Name": data.company || "-",
      "Business Type": data.businessType || "-",
      "Product Requested": data.product || "-",
      "Quantity": data.quantity || "-",
      "Deployment Timeline": data.deployment || "-",
      "GST / Tax ID": data.gst || "-",
      "Location / City": data.location || "-",
      "Fleet Size": data.fleetSize || "-",
      "Primary Purpose": data.purpose || "-",
      "Requirements & Details": data.requirements || "-",
    }));
  }

  let formattedContacts: Record<string, any>[] = [];
  if (serverContacts && serverContacts.length > 0) {
    formattedContacts = serverContacts.map((data) => ({
      "Submission Timestamp": data["Submission Timestamp"] || data.timestamp || data.createdAt || "-",
      "Full Name": data["Full Name"] || data.fullName || "",
      "Email": data["Email"] || data.email || "",
      "Phone": data["Phone"] || data.phone || "",
      "Message": data["Message"] || data.message || "",
    }));
  } else {
    const contacts = submissions.filter((s) => s.type === "contact");
    formattedContacts = contacts.map((data) => ({
      "Submission Timestamp": data.timestamp || "-",
      "Full Name": data.fullName || "",
      "Email": data.email || "",
      "Phone": data.phone || "",
      "Message": data.message || "",
    }));
  }

  const wb = XLSX.utils.book_new();

  if (formattedInquiries.length > 0) {
    const wsInq = XLSX.utils.json_to_sheet(formattedInquiries);
    XLSX.utils.book_append_sheet(wb, wsInq, "Enquiries (Enquire Specs)");
  }

  if (formattedContacts.length > 0) {
    const wsContact = XLSX.utils.json_to_sheet(formattedContacts);
    XLSX.utils.book_append_sheet(wb, wsContact, "Contact Messages");
  }

  if (wb.SheetNames.length === 0) {
    const wsDummy = XLSX.utils.json_to_sheet([
      { "Note": "No form submissions recorded yet." },
    ]);
    XLSX.utils.book_append_sheet(wb, wsDummy, "Submissions");
  }

  triggerBlobDownload(wb, "Magnertia_All_Submissions.xlsx");
}

export function downloadSpecificExcelSheet(type: "inquiry" | "contact", serverData?: Record<string, any>[]) {
  if (typeof window === "undefined") return;

  const wb = XLSX.utils.book_new();
  const filename = type === "inquiry" ? "Enquire_Specs_Submissions.xlsx" : "Contact_Messages_Submissions.xlsx";
  const sheetName = type === "inquiry" ? "Enquire Specs Submissions" : "Contact Messages";

  let listToExport = serverData && serverData.length > 0 ? serverData : [];

  if (listToExport.length === 0) {
    const submissions = getLocalSubmissions();
    if (type === "inquiry") {
      const localInquiries = submissions.filter((s) => s.type === "inquiry" || !s.type);
      listToExport = localInquiries.map((data) => ({
        "Submission Timestamp": data.timestamp || "-",
        "Full Name": data.fullName || "",
        "Email": data.email || "",
        "Phone": data.phone || "",
        "Company Name": data.company || "-",
        "Business Type": data.businessType || "-",
        "Product Requested": data.product || "-",
        "Quantity": data.quantity || "-",
        "Deployment Timeline": data.deployment || "-",
        "GST / Tax ID": data.gst || "-",
        "Location / City": data.location || "-",
        "Fleet Size": data.fleetSize || "-",
        "Primary Purpose": data.purpose || "-",
        "Requirements & Details": data.requirements || "-",
      }));
    } else {
      const localContacts = submissions.filter((s) => s.type === "contact");
      listToExport = localContacts.map((data) => ({
        "Submission Timestamp": data.timestamp || "-",
        "Full Name": data.fullName || "",
        "Email": data.email || "",
        "Phone": data.phone || "",
        "Message": data.message || "",
      }));
    }
  }

  if (listToExport.length > 0) {
    const ws = XLSX.utils.json_to_sheet(listToExport);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  } else {
    const wsDummy = XLSX.utils.json_to_sheet([{ "Note": `No ${sheetName} recorded yet.` }]);
    XLSX.utils.book_append_sheet(wb, wsDummy, sheetName);
  }

  triggerBlobDownload(wb, filename);
}

export function downloadCsvSheet(
  serverInquiries?: Record<string, any>[],
  serverContacts?: Record<string, any>[],
  activeTab: "inquiries" | "contacts" | "all" = "all"
) {
  if (typeof window === "undefined") return;

  const submissions = getLocalSubmissions();

  let formattedInquiries: Record<string, any>[] = [];
  if (serverInquiries && serverInquiries.length > 0) {
    formattedInquiries = serverInquiries.map((data) => ({
      "Submission Timestamp": data["Submission Timestamp"] || data.timestamp || data.createdAt || "-",
      "Type": "Enquiry",
      "Full Name": data["Full Name"] || data.fullName || "",
      "Email": data["Email"] || data.email || "",
      "Phone": data["Phone"] || data.phone || "",
      "Company Name": data["Company Name"] || data.company || "-",
      "Business Type": data["Business Type"] || data.businessType || "-",
      "Product Requested": data["Product Requested"] || data.product || "-",
      "Quantity": data["Quantity"] || data.quantity || "-",
      "Deployment Timeline": data["Deployment Timeline"] || data.deployment || "-",
      "GST / Tax ID": data["GST / Tax ID"] || data.gst || "-",
      "Location / City": data["Location / City"] || data.location || "-",
      "Fleet Size": data["Fleet Size"] || data.fleetSize || "-",
      "Primary Purpose": data["Primary Purpose"] || data.purpose || "-",
      "Requirements & Details": data["Requirements & Details"] || data.requirements || "-",
    }));
  } else {
    const inquiries = submissions.filter((s) => s.type === "inquiry" || !s.type);
    formattedInquiries = inquiries.map((data) => ({
      "Submission Timestamp": data.timestamp || "-",
      "Type": "Enquiry",
      "Full Name": data.fullName || "",
      "Email": data.email || "",
      "Phone": data.phone || "",
      "Company Name": data.company || "-",
      "Business Type": data.businessType || "-",
      "Product Requested": data.product || "-",
      "Quantity": data.quantity || "-",
      "Deployment Timeline": data.deployment || "-",
      "GST / Tax ID": data.gst || "-",
      "Location / City": data.location || "-",
      "Fleet Size": data.fleetSize || "-",
      "Primary Purpose": data.purpose || "-",
      "Requirements & Details": data.requirements || "-",
    }));
  }

  let formattedContacts: Record<string, any>[] = [];
  if (serverContacts && serverContacts.length > 0) {
    formattedContacts = serverContacts.map((data) => ({
      "Submission Timestamp": data["Submission Timestamp"] || data.timestamp || data.createdAt || "-",
      "Type": "Contact Message",
      "Full Name": data["Full Name"] || data.fullName || "",
      "Email": data["Email"] || data.email || "",
      "Phone": data["Phone"] || data.phone || "",
      "Message": data["Message"] || data.message || "",
    }));
  } else {
    const contacts = submissions.filter((s) => s.type === "contact");
    formattedContacts = contacts.map((data) => ({
      "Submission Timestamp": data.timestamp || "-",
      "Type": "Contact Message",
      "Full Name": data.fullName || "",
      "Email": data.email || "",
      "Phone": data.phone || "",
      "Message": data.message || "",
    }));
  }

  let exportData: Record<string, any>[] = [];
  let filename = "Magnertia_Submissions.csv";

  if (activeTab === "inquiries") {
    exportData = formattedInquiries;
    filename = "Magnertia_Enquiries.csv";
  } else if (activeTab === "contacts") {
    exportData = formattedContacts;
    filename = "Magnertia_Contact_Messages.csv";
  } else {
    exportData = [...formattedInquiries, ...formattedContacts];
    filename = "Magnertia_All_Submissions.csv";
  }

  if (exportData.length === 0) {
    exportData = [{ "Note": "No submissions recorded yet." }];
  }

  const ws = XLSX.utils.json_to_sheet(exportData);
  const csvContent = XLSX.utils.sheet_to_csv(ws);

  triggerCsvBlobDownload(csvContent, filename);
}

function triggerCsvBlobDownload(csvContent: string, filename: string) {
  if (typeof window === "undefined") return;
  try {
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
      window.URL.revokeObjectURL(url);
    }, 200);
  } catch (err) {
    console.error("CSV blob download failed:", err);
  }
}

export function deleteSubmissionLocally(type: "inquiry" | "contact", index: number) {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalSubmissions();
    const typeFiltered = existing.filter((s) => (type === "inquiry" ? s.type === "inquiry" || !s.type : s.type === "contact"));
    const targetItem = typeFiltered[index];
    if (targetItem) {
      const idxInAll = existing.indexOf(targetItem);
      if (idxInAll !== -1) {
        existing.splice(idxInAll, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      }
    }
  } catch (err) {
    console.error("Failed to delete submission locally:", err);
  }
}
