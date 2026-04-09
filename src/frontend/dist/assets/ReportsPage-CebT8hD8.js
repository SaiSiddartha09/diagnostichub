import { b as useAuth, d as useQueryClient, r as reactExports, f as useQuery, j as jsxRuntimeExports, g as Link, B as Button, C as Card, k as CardContent, L as LoadingSpinner, h as CardHeader, l as ue } from "./index-BwdZZcZ7.js";
import { u as useBackend, L as Layout, F as FileText } from "./use-backend-DMOQb4RX.js";
import { S as StatusBadge } from "./StatusBadge-C6wvdIVu.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DNEBixpW.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BcSNChRX.js";
import { u as useMutation } from "./index-mWvxdGEg.js";
import { F as Funnel } from "./funnel-dMnWciTc.js";
import { P as Plus } from "./plus-DQw8door.js";
import { T as Trash2 } from "./trash-2-2oP81WaA.js";
import "./chevron-up-D_p129ZJ.js";
const REPORT_TYPE_LABELS = {
  ctScan: "CT Scan",
  mri: "MRI",
  xRay: "X-Ray",
  ultrasound: "Ultrasound",
  bloodTest: "Blood Test",
  other: "Other"
};
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function AdminReportsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const { data: reports, isLoading } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => actor ? actor.listAllReports() : [],
    enabled: !!actor && !actorLoading
  });
  const { data: patients } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => actor ? actor.listAllPatients() : [],
    enabled: !!actor && !actorLoading
  });
  const patientMap = new Map(
    (patients ?? []).map((p) => [p.id.toString(), p.name])
  );
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteReport(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      ue.success("Report deleted");
    },
    onError: () => ue.error("Failed to delete report")
  });
  const statusMutation = useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.setReportStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      ue.success("Status updated");
    },
    onError: () => ue.error("Failed to update status")
  });
  const filtered = (reports ?? []).filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "admin", userName: profile == null ? void 0 : profile.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-screen-xl", "data-ocid": "admin-reports-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold font-display text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-primary" }),
          "Reports"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          (reports == null ? void 0 : reports.length) ?? 0,
          " total reports"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-36 h-9 text-sm",
                "data-ocid": "status-filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter status" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "uploaded", children: "Uploaded" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sent", children: "Sent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "viewed", children: "Viewed" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reports/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-2 h-9",
            "data-ocid": "upload-report-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Upload Report"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated overflow-hidden", children: [
      isLoading || actorLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CardContent,
        {
          className: "flex flex-col items-center justify-center py-16 gap-3",
          "data-ocid": "reports-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: statusFilter !== "all" ? "No reports with this status" : "No reports yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reports/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "Upload first report" }) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Patient" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Report Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/20 transition-colors",
              "data-ocid": "report-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/admin/patients/$id",
                    params: { id: r.patientId.toString() },
                    className: "font-medium text-foreground hover:text-primary transition-colors",
                    children: patientMap.get(r.patientId.toString()) ?? `${r.patientId.toString().slice(0, 10)}…`
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-foreground max-w-[180px] truncate", children: r.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground text-xs", children: REPORT_TYPE_LABELS[r.reportType.__kind__] ?? r.reportType.__kind__ }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground text-xs whitespace-nowrap", children: formatDate(r.uploadedAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: r.status,
                    onValueChange: (v) => statusMutation.mutate({
                      id: r.id,
                      status: v
                    }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-auto w-auto border-0 bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden",
                          "data-ocid": "status-select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "uploaded", children: "Uploaded" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sent", children: "Sent" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "viewed", children: "Viewed" })
                      ] })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 text-destructive hover:bg-destructive/10",
                      "data-ocid": "delete-report-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Report" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                        "Delete report ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                          '"',
                          r.title,
                          '"'
                        ] }),
                        "? This cannot be undone."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AlertDialogAction,
                        {
                          onClick: () => deleteMutation.mutate(r.id),
                          className: "bg-destructive text-destructive-foreground",
                          children: "Delete"
                        }
                      )
                    ] })
                  ] })
                ] }) })
              ]
            },
            r.id.toString()
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border", children: filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-4 space-y-2",
            "data-ocid": "report-row-mobile",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: r.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    patientMap.get(r.patientId.toString()) ?? "Unknown",
                    " ",
                    "· ",
                    REPORT_TYPE_LABELS[r.reportType.__kind__]
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(r.uploadedAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-destructive",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Report" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                          'Delete "',
                          r.title,
                          '"?'
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogAction,
                          {
                            onClick: () => deleteMutation.mutate(r.id),
                            className: "bg-destructive text-destructive-foreground",
                            children: "Delete"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: r.status,
                  onValueChange: (v) => statusMutation.mutate({
                    id: r.id,
                    status: v
                  }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-8 w-full text-xs",
                        "data-ocid": "status-select-mobile",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "uploaded", children: "Uploaded" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sent", children: "Sent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "viewed", children: "Viewed" })
                    ] })
                  ]
                }
              )
            ]
          },
          r.id.toString()
        )) })
      ] }),
      !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-t border-border bg-muted/20 py-2 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Showing ",
        filtered.length,
        " of ",
        (reports == null ? void 0 : reports.length) ?? 0,
        " reports"
      ] }) })
    ] })
  ] }) });
}
export {
  AdminReportsPage as default
};
