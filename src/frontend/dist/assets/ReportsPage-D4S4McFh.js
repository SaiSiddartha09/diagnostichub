import { c as createLucideIcon, b as useAuth, r as reactExports, f as useQuery, j as jsxRuntimeExports, I as Input, B as Button, C as Card, k as CardContent, g as Link } from "./index-BwdZZcZ7.js";
import { R as ReportStatus } from "./backend.d-DT8BPANE.js";
import { u as useBackend, L as Layout, X, F as FileText } from "./use-backend-DMOQb4RX.js";
import { S as StatusBadge } from "./StatusBadge-C6wvdIVu.js";
import { B as Badge } from "./badge-DWVae5Qt.js";
import { S as Skeleton } from "./skeleton-Bpu6Sw8c.js";
import { S as Search } from "./search-B_Rk2kCe.js";
import { D as Download } from "./download-BVj_WWFY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
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
const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: ReportStatus.pending },
  { label: "Uploaded", value: ReportStatus.uploaded },
  { label: "Sent", value: ReportStatus.sent },
  { label: "Viewed", value: ReportStatus.viewed }
];
const FALLBACK_REPORTS = [
  {
    id: "1",
    title: "Full Body CT Scan",
    typeLabel: "CT Scan",
    date: "17/03/2026",
    center: "City Health Diagnostics",
    status: "pending",
    hasFile: false
  },
  {
    id: "2",
    title: "MRI Brain Scan",
    typeLabel: "MRI",
    date: "10/03/2026",
    center: "City Health Diagnostics",
    status: "uploaded",
    hasFile: false
  },
  {
    id: "3",
    title: "Chest X-Ray",
    typeLabel: "X-Ray",
    date: "02/03/2026",
    center: "City Health Diagnostics",
    status: "sent",
    hasFile: true
  },
  {
    id: "4",
    title: "Blood Panel CBC",
    typeLabel: "Blood Test",
    date: "22/02/2026",
    center: "City Health Diagnostics",
    status: "viewed",
    hasFile: true
  },
  {
    id: "5",
    title: "Abdominal Ultrasound",
    typeLabel: "Ultrasound",
    date: "15/02/2026",
    center: "City Health Diagnostics",
    status: "viewed",
    hasFile: true
  }
];
function ReportSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" })
      ] })
    ] })
  ] }) });
}
function PatientReportsPage() {
  var _a;
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const reportsQuery = useQuery({
    queryKey: ["myReports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyReports();
    },
    enabled: !!actor && !actorLoading
  });
  const hasRealData = (((_a = reportsQuery.data) == null ? void 0 : _a.length) ?? 0) > 0;
  const rawReports = reportsQuery.data ?? [];
  const displayItems = reactExports.useMemo(() => {
    if (hasRealData) {
      return rawReports.filter((r) => {
        const typeLabel = getTypeLabel(r.reportType);
        const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || typeLabel.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || r.status === statusFilter;
        return matchesSearch && matchesStatus;
      }).map((r) => {
        var _a2;
        return {
          id: String(r.id),
          title: r.title,
          typeLabel: getTypeLabel(r.reportType),
          date: new Date(Number(r.uploadedAt) / 1e6).toLocaleDateString(
            "en-GB"
          ),
          center: "City Health Diagnostics",
          status: r.status,
          hasFile: !!r.fileBlob,
          fileUrl: ((_a2 = r.fileBlob) == null ? void 0 : _a2.getDirectURL()) ?? null
        };
      });
    }
    return FALLBACK_REPORTS.filter((r) => {
      const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.typeLabel.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    }).map((r) => ({ ...r, fileUrl: null }));
  }, [hasRealData, rawReports, search, statusFilter]);
  const totalCount = hasRealData ? rawReports.length : FALLBACK_REPORTS.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "patient", userName: (profile == null ? void 0 : profile.name) ?? "Patient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "My Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "View and download your diagnostic reports" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by name or type…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 pr-9",
            "data-ocid": "reports-search-input"
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearch(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", "data-ocid": "status-filter-tabs", children: STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setStatusFilter(f.value),
          className: `px-3 py-1 rounded-full text-xs font-medium border transition-smooth ${statusFilter === f.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/50"}`,
          "data-ocid": `filter-${f.value}`,
          children: f.label
        },
        f.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reportsQuery.isLoading ? [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReportSkeleton, {}, i)) : displayItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "reports-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground font-display mb-1", children: "No reports found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs", children: search || statusFilter !== "all" ? "Try adjusting your search or filters." : "Your diagnostic reports will appear here once uploaded by your diagnostic center." }),
          (search || statusFilter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "mt-3 text-primary",
              onClick: () => {
                setSearch("");
                setStatusFilter("all");
              },
              children: "Clear filters"
            }
          )
        ]
      }
    ) : displayItems.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "card-elevated",
        "data-ocid": `report-item-${report.id}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display truncate", children: report.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  report.date,
                  " · ",
                  report.center
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: report.typeLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: report.status })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/patient/reports/$id",
                  params: { id: report.id },
                  className: "flex items-center gap-1.5 text-xs text-primary hover:underline",
                  "data-ocid": `view-report-${report.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                    "View report"
                  ]
                }
              ),
              (report.status === "sent" || report.status === "viewed") && report.fileUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: report.fileUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
                  "data-ocid": `download-report-${report.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                    "Download PDF"
                  ]
                }
              )
            ] })
          ] })
        ] }) })
      },
      report.id
    )) }),
    displayItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground", children: [
      "Showing ",
      displayItems.length,
      " of ",
      totalCount,
      " report",
      totalCount !== 1 ? "s" : ""
    ] })
  ] }) });
}
export {
  PatientReportsPage as default
};
