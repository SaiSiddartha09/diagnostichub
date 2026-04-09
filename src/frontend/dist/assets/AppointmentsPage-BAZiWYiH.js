import { c as createLucideIcon, b as useAuth, d as useQueryClient, r as reactExports, f as useQuery, j as jsxRuntimeExports, C as Card, k as CardContent, L as LoadingSpinner, B as Button, h as CardHeader, l as ue } from "./index-BwdZZcZ7.js";
import { u as useBackend, L as Layout, a as CalendarClock } from "./use-backend-DMOQb4RX.js";
import { S as StatusBadge } from "./StatusBadge-C6wvdIVu.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DNEBixpW.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BcSNChRX.js";
import { u as useMutation } from "./index-mWvxdGEg.js";
import { F as Funnel } from "./funnel-dMnWciTc.js";
import { C as CircleCheck } from "./circle-check-hGJVhT9t.js";
import "./chevron-up-D_p129ZJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function AdminAppointmentsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => actor ? actor.listAllAppointments() : [],
    enabled: !!actor && !actorLoading
  });
  const { data: patients } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => actor ? actor.listAllPatients() : [],
    enabled: !!actor && !actorLoading
  });
  const { data: doctors } = useQuery({
    queryKey: ["admin-doctors"],
    queryFn: async () => actor ? actor.listDoctors(null) : [],
    enabled: !!actor && !actorLoading
  });
  const patientMap = new Map(
    (patients ?? []).map((p) => [p.id.toString(), p.name])
  );
  const doctorMap = new Map(
    (doctors ?? []).map((d) => [d.id.toString(), d.name])
  );
  const confirmMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      return actor.confirmAppointment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      ue.success("Appointment confirmed");
    },
    onError: () => ue.error("Failed to confirm appointment")
  });
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      return actor.adminCancelAppointment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      ue.success("Appointment cancelled");
    },
    onError: () => ue.error("Failed to cancel appointment")
  });
  const filtered = (appointments ?? []).filter(
    (a) => statusFilter === "all" || a.status === statusFilter
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "admin", userName: profile == null ? void 0 : profile.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-5 max-w-screen-xl",
      "data-ocid": "admin-appointments-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold font-display text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-6 h-6 text-primary" }),
              "Appointments"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
              (appointments == null ? void 0 : appointments.length) ?? 0,
              " total appointments"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-36 h-9 text-sm",
                  "data-ocid": "appt-status-filter",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter status" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "confirmed", children: "Confirmed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated overflow-hidden", children: [
          isLoading || actorLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CardContent,
            {
              className: "flex flex-col items-center justify-center py-16 gap-3",
              "data-ocid": "appointments-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-10 h-10 text-muted-foreground/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: statusFilter !== "all" ? "No appointments with this status" : "No appointments yet" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Patient" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Doctor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Booked At" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Slot" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-muted/20 transition-colors",
                  "data-ocid": "appointment-row",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: patientMap.get(a.patientId.toString()) ?? `${a.patientId.toString().slice(0, 10)}…` }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground", children: doctorMap.get(a.doctorId.toString()) ?? `Dr. #${a.doctorId.toString()}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground text-xs whitespace-nowrap", children: formatDate(a.bookedAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5 text-muted-foreground text-xs", children: [
                      "Slot #",
                      a.slotId.toString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: a.status }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
                      a.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "h-7 text-xs gap-1 text-success hover:bg-success/10 hover:text-success",
                          onClick: () => confirmMutation.mutate(a.id),
                          disabled: confirmMutation.isPending,
                          "data-ocid": "confirm-appt-btn",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                            "Confirm"
                          ]
                        }
                      ),
                      a.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            variant: "ghost",
                            size: "sm",
                            className: "h-7 text-xs gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive",
                            "data-ocid": "cancel-appt-btn",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                              "Cancel"
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Cancel Appointment" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                              "Cancel appointment #",
                              a.id.toString(),
                              "? The patient will no longer attend this slot."
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Keep Appointment" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              AlertDialogAction,
                              {
                                onClick: () => cancelMutation.mutate(a.id),
                                className: "bg-destructive text-destructive-foreground",
                                children: "Cancel Appointment"
                              }
                            )
                          ] })
                        ] })
                      ] })
                    ] }) })
                  ]
                },
                a.id.toString()
              )) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border", children: filtered.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-4 py-4 space-y-2",
                "data-ocid": "appointment-row-mobile",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: patientMap.get(a.patientId.toString()) ?? "Unknown Patient" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: doctorMap.get(a.doctorId.toString()) ?? `Dr. #${a.doctorId.toString()}` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(a.bookedAt) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: a.status })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    a.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        className: "h-7 text-xs gap-1 border-success/40 text-success hover:bg-success/10",
                        onClick: () => confirmMutation.mutate(a.id),
                        disabled: confirmMutation.isPending,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                          "Confirm"
                        ]
                      }
                    ),
                    a.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          className: "h-7 text-xs gap-1 border-destructive/40 text-destructive hover:bg-destructive/10",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                            "Cancel"
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Cancel Appointment" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Cancel this appointment?" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Keep" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            AlertDialogAction,
                            {
                              onClick: () => cancelMutation.mutate(a.id),
                              className: "bg-destructive text-destructive-foreground",
                              children: "Cancel"
                            }
                          )
                        ] })
                      ] })
                    ] })
                  ] })
                ]
              },
              a.id.toString()
            )) })
          ] }),
          !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-t border-border bg-muted/20 py-2 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            filtered.length,
            " of ",
            (appointments == null ? void 0 : appointments.length) ?? 0,
            " ",
            "appointments"
          ] }) })
        ] })
      ]
    }
  ) });
}
export {
  AdminAppointmentsPage as default
};
