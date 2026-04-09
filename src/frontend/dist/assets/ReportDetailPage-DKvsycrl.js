import { c as createLucideIcon, u as useParams, b as useAuth, d as useQueryClient, f as useQuery, r as reactExports, j as jsxRuntimeExports, B as Button, g as Link, A as ArrowLeft, C as Card, k as CardContent, h as CardHeader, i as CardTitle } from "./index-BwdZZcZ7.js";
import { u as useBackend, L as Layout, F as FileText } from "./use-backend-DMOQb4RX.js";
import { S as StatusBadge } from "./StatusBadge-C6wvdIVu.js";
import { B as Badge } from "./badge-DWVae5Qt.js";
import { S as Skeleton } from "./skeleton-Bpu6Sw8c.js";
import { u as useMutation } from "./index-mWvxdGEg.js";
import { C as Clock } from "./clock-Bn38jOZH.js";
import { M as MapPin } from "./map-pin-DmaMr15U.js";
import { D as Download } from "./download-BVj_WWFY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
function getTypeLabel(rt) {
  switch (rt.__kind__) {
    case "ctScan":
      return "CT Scan";
    case "mri":
      return "MRI";
    case "xRay":
      return "X-Ray";
    case "ultrasound":
      return "Ultrasound";
    case "bloodTest":
      return "Blood Test";
    case "other":
      return rt.other ?? "Other";
  }
}
const FALLBACK_REPORTS = {
  "1": {
    id: "1",
    title: "Full Body CT Scan",
    typeLabel: "CT Scan",
    date: "17 Mar 2026",
    center: "City Health Diagnostics, Downtown",
    status: "pending",
    notes: "Report is being processed by our radiologists. You will be notified once ready."
  },
  "2": {
    id: "2",
    title: "MRI Brain Scan",
    typeLabel: "MRI",
    date: "10 Mar 2026",
    center: "City Health Diagnostics, Downtown",
    status: "uploaded",
    notes: "Report uploaded. Awaiting dispatch to your registered WhatsApp number."
  },
  "3": {
    id: "3",
    title: "Chest X-Ray",
    typeLabel: "X-Ray",
    date: "02 Mar 2026",
    center: "City Health Diagnostics, Downtown",
    status: "sent",
    notes: "Report has been sent to your registered WhatsApp number.",
    fileUrl: "#"
  },
  "4": {
    id: "4",
    title: "Blood Panel CBC",
    typeLabel: "Blood Test",
    date: "22 Feb 2026",
    center: "City Health Diagnostics, Downtown",
    status: "viewed",
    notes: "All markers within normal range. CBC shows healthy white and red blood cell counts. Follow up with your physician in 3 months.",
    fileUrl: "#"
  }
};
function PatientReportDetailPage() {
  var _a;
  const { id } = useParams({ from: "/patient/reports/$id" });
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const reportQuery = useQuery({
    queryKey: ["report", id],
    queryFn: async () => {
      if (!actor) return null;
      const bigId = BigInt(id);
      return actor.getReport(bigId);
    },
    enabled: !!actor && !actorLoading && /^\d+$/.test(id)
  });
  const markViewedMutation = useMutation({
    mutationFn: async () => {
      if (!actor) return;
      const bigId = BigInt(id);
      await actor.markReportViewed(bigId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report", id] });
      queryClient.invalidateQueries({ queryKey: ["myReports"] });
    }
  });
  const {
    isPending: markPending,
    isSuccess: markSuccess,
    mutate: markMutate
  } = markViewedMutation;
  reactExports.useEffect(() => {
    const backendReport2 = reportQuery.data;
    const fallback2 = FALLBACK_REPORTS[id];
    const status2 = (backendReport2 == null ? void 0 : backendReport2.status) ?? (fallback2 == null ? void 0 : fallback2.status);
    if (status2 === "sent" && !markPending && !markSuccess && !!actor) {
      markMutate();
    }
  }, [reportQuery.data, id, markPending, markSuccess, markMutate, actor]);
  const isLoading = reportQuery.isLoading;
  const backendReport = reportQuery.data;
  const fallback = FALLBACK_REPORTS[id] ?? FALLBACK_REPORTS["1"];
  const title = (backendReport == null ? void 0 : backendReport.title) ?? fallback.title;
  const typeLabel = backendReport ? getTypeLabel(backendReport.reportType) : fallback.typeLabel;
  const status = (backendReport == null ? void 0 : backendReport.status) ?? fallback.status;
  const notes = (backendReport == null ? void 0 : backendReport.labNotes) ?? (backendReport == null ? void 0 : backendReport.adminNotes) ?? fallback.notes;
  const fileUrl = ((_a = backendReport == null ? void 0 : backendReport.fileBlob) == null ? void 0 : _a.getDirectURL()) ?? fallback.fileUrl;
  const dateStr = backendReport ? new Date(Number(backendReport.uploadedAt) / 1e6).toLocaleDateString(
    "en-GB",
    { day: "2-digit", month: "short", year: "numeric" }
  ) : fallback.date;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "patient", userName: (profile == null ? void 0 : profile.name) ?? "Patient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          size: "icon",
          className: "w-8 h-8",
          "data-ocid": "back-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/patient/reports", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground font-display", children: "Report Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Diagnostic report summary" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", "data-ocid": "report-detail-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mt-1 text-xs", children: typeLabel })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: dateStr })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Center" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", children: "City Health Diagnostics" })
              ] })
            ] })
          ] }),
          notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Lab / Admin Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: notes })
          ] }),
          (status === "pending" || status === "uploaded") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-warning/5 border border-warning/20 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-warning flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: status === "pending" ? "Report Processing" : "Awaiting Dispatch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: status === "pending" ? "Your report is being processed. You'll be notified when it's ready." : "Your report is ready and will be sent to your WhatsApp number soon." })
            ] })
          ] }),
          (status === "sent" || status === "viewed") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-12 bg-destructive/10 rounded flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
                  title,
                  ".pdf"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PDF Document" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "flex-1 gap-2",
                  asChild: true,
                  "data-ocid": "download-report-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: fileUrl ?? "#",
                      download: true,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                        "Download PDF"
                      ]
                    }
                  )
                }
              ),
              fileUrl && fileUrl !== "#" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1 gap-2",
                  asChild: true,
                  "data-ocid": "view-report-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: fileUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                        "View Online"
                      ]
                    }
                  )
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center leading-relaxed px-4", children: "This report is for informational purposes only. Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment." })
    ] })
  ] }) });
}
export {
  PatientReportDetailPage as default
};
