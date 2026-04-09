import { c as createLucideIcon, b as useAuth, f as useQuery, j as jsxRuntimeExports, B as Button, g as Link, C as Card, k as CardContent, n as Activity } from "./index-BwdZZcZ7.js";
import { u as useBackend, L as Layout, F as FileText, C as Calendar } from "./use-backend-DMOQb4RX.js";
import { S as StatusBadge } from "./StatusBadge-C6wvdIVu.js";
import { S as Skeleton } from "./skeleton-Bpu6Sw8c.js";
import { C as Clock } from "./clock-Bn38jOZH.js";
import { A as ArrowRight } from "./arrow-right-BNJGXNIx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function getReportLabel(report) {
  return report.title;
}
function getReportDate(report) {
  return new Date(Number(report.uploadedAt) / 1e6).toLocaleDateString(
    "en-GB"
  );
}
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-12 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: label })
    ] })
  ] }) });
}
const FALLBACK_REPORTS = [
  {
    id: "s1",
    title: "Full Body CT Scan",
    date: "17/03/2026",
    center: "City Health",
    status: "pending"
  },
  {
    id: "s2",
    title: "MRI Brain Scan",
    date: "10/03/2026",
    center: "City Health",
    status: "uploaded"
  },
  {
    id: "s3",
    title: "Chest X-Ray",
    date: "02/03/2026",
    center: "City Health",
    status: "sent"
  },
  {
    id: "s4",
    title: "Blood Panel CBC",
    date: "22/02/2026",
    center: "City Health",
    status: "viewed"
  }
];
const FALLBACK_APPOINTMENTS = [
  {
    id: "a1",
    doctor: "Dr. Sarah Chen",
    specialty: "Radiologist",
    date: "Fri, Apr 11",
    time: "10:00 AM",
    status: "confirmed"
  },
  {
    id: "a2",
    doctor: "Dr. Michael Park",
    specialty: "Cardiologist",
    date: "Mon, Apr 14",
    time: "2:30 PM",
    status: "pending"
  }
];
function PatientDashboardPage() {
  const { profile, isLoading: authLoading } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const userName = (profile == null ? void 0 : profile.name) ?? "Patient";
  const reportsQuery = useQuery({
    queryKey: ["myReports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyReports();
    },
    enabled: !!actor && !actorLoading
  });
  const appointmentsQuery = useQuery({
    queryKey: ["myAppointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyAppointments();
    },
    enabled: !!actor && !actorLoading
  });
  const reports = reportsQuery.data ?? [];
  const appointments = appointmentsQuery.data ?? [];
  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const confirmedCount = appointments.filter(
    (a) => a.status === "confirmed"
  ).length;
  const hasRealReports = reports.length > 0;
  const hasRealAppts = appointments.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "patient", userName, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      authLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground font-display", children: [
        "Welcome back, ",
        userName.split(" ")[0],
        "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Your health journey at a glance." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: FileText,
          label: "Total Reports",
          value: reportsQuery.isLoading ? "—" : hasRealReports ? reports.length : 12,
          color: "bg-primary/10 text-primary",
          loading: reportsQuery.isLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Clock,
          label: "Pending",
          value: reportsQuery.isLoading ? "—" : hasRealReports ? pendingCount : 2,
          color: "bg-warning/10 text-warning",
          loading: reportsQuery.isLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: TrendingUp,
          label: "This Month",
          value: "4",
          color: "bg-accent/10 text-accent"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Calendar,
          label: "Appointments",
          value: appointmentsQuery.isLoading ? "—" : hasRealAppts ? confirmedCount : 3,
          color: "bg-success/10 text-success",
          loading: appointmentsQuery.isLoading
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground font-display", children: "Recent Reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "ghost",
              size: "sm",
              className: "text-primary h-7 gap-1",
              "data-ocid": "view-all-reports-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/patient/reports", children: [
                "View all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ] })
            }
          )
        ] }),
        reportsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" })
        ] }) }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: hasRealReports ? reports.slice(0, 4).map((report) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/patient/reports/$id",
            params: { id: String(report.id) },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "card-elevated cursor-pointer h-full",
                "data-ocid": `report-card-${report.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate font-display", children: getReportLabel(report) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: getReportDate(report) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: report.status })
                  ] })
                ] })
              }
            )
          },
          String(report.id)
        )) : FALLBACK_REPORTS.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/patient/reports/$id",
            params: { id: report.id },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "card-elevated cursor-pointer h-full",
                "data-ocid": `report-card-${report.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate font-display", children: report.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        "Date: ",
                        report.date
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: report.center })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: report.status })
                  ] })
                ] })
              }
            )
          },
          report.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground font-display", children: "Upcoming Appointments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "ghost",
              size: "sm",
              className: "text-primary h-7 gap-1",
              "data-ocid": "view-all-appts-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/patient/appointments", children: [
                "View all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          appointmentsQuery.isLoading ? [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" })
          ] }) }, i)) : hasRealAppts ? appointments.filter((a) => a.status !== "cancelled").slice(0, 2).map((appt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "card-elevated",
              "data-ocid": `appt-card-${appt.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display", children: "Appointment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: appt.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Slot #",
                  String(appt.slotId)
                ] })
              ] })
            },
            String(appt.id)
          )) : FALLBACK_APPOINTMENTS.map((appt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "card-elevated",
              "data-ocid": `appt-card-${appt.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate font-display", children: appt.doctor }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: appt.specialty })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: appt.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  appt.date,
                  " · ",
                  appt.time
                ] })
              ] })
            },
            appt.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "w-full",
              "data-ocid": "book-appointment-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/patient/appointments", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 mr-2" }),
                "Book New Appointment"
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
export {
  PatientDashboardPage as default
};
