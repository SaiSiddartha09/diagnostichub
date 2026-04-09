const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-mWvxdGEg.js","assets/index-BwdZZcZ7.js","assets/index-B04myH9e.css"])))=>i.map(i=>d[i]);
import { u as useParams, b as useAuth, d as useQueryClient, e as useNavigate, f as useQuery, j as jsxRuntimeExports, L as LoadingSpinner, g as Link, B as Button, A as ArrowLeft, C as Card, h as CardHeader, i as CardTitle, k as CardContent, P as Phone, l as ue, _ as __vitePreload } from "./index-BwdZZcZ7.js";
import { u as useBackend, L as Layout, U as User, C as Calendar, F as FileText, a as CalendarClock } from "./use-backend-DMOQb4RX.js";
import { S as StatusBadge } from "./StatusBadge-C6wvdIVu.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DNEBixpW.js";
import { B as Badge } from "./badge-DWVae5Qt.js";
import { M as Mail, S as Separator } from "./separator-BKUYg_5N.js";
import { u as useMutation } from "./index-mWvxdGEg.js";
import { T as Trash2 } from "./trash-2-2oP81WaA.js";
import { M as MapPin } from "./map-pin-DmaMr15U.js";
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
const REPORT_TYPE_LABELS = {
  ctScan: "CT Scan",
  mri: "MRI",
  xRay: "X-Ray",
  ultrasound: "Ultrasound",
  bloodTest: "Blood Test",
  other: "Other"
};
function AdminPatientDetailPage() {
  const { id } = useParams({ from: "/admin/patients/$id" });
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: patient, isLoading: patientLoading } = useQuery({
    queryKey: ["admin-patient", id],
    queryFn: async () => {
      if (!actor) return null;
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-mWvxdGEg.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      return actor.getPatientProfile(Principal.fromText(id));
    },
    enabled: !!actor && !actorLoading && !!id
  });
  const { data: reports } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => actor ? actor.listAllReports() : [],
    enabled: !!actor && !actorLoading
  });
  const { data: appointments } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => actor ? actor.listAllAppointments() : [],
    enabled: !!actor && !actorLoading
  });
  const { data: doctors } = useQuery({
    queryKey: ["admin-doctors"],
    queryFn: async () => actor ? actor.listDoctors(null) : [],
    enabled: !!actor && !actorLoading
  });
  const doctorMap = Object.fromEntries(
    (doctors ?? []).map((d) => [String(d.id), d.name])
  );
  const patientReports = (reports ?? []).filter(
    (r) => r.patientId.toString() === id
  );
  const patientAppointments = (appointments ?? []).filter(
    (a) => a.patientId.toString() === id
  );
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-mWvxdGEg.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      await actor.deletePatient(Principal.fromText(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-patients"] });
      ue.success("Patient deleted");
      navigate({ to: "/admin/patients" });
    },
    onError: () => ue.error("Failed to delete patient")
  });
  if (patientLoading || actorLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "admin", userName: profile == null ? void 0 : profile.name, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) });
  }
  if (!patient) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "admin", userName: profile == null ? void 0 : profile.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Patient not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/patients", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "← Back to Patients" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "admin", userName: profile == null ? void 0 : profile.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-6 max-w-screen-lg",
      "data-ocid": "patient-detail-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/patients", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8",
                "aria-label": "Back",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: patient.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Patient Detail" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                size: "sm",
                className: "gap-2",
                "data-ocid": "delete-patient-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                  "Delete Patient"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Patient" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "This will permanently delete ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: patient.name }),
                  " ",
                  "and all associated records. This cannot be undone."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: () => deleteMutation.mutate(),
                    className: "bg-destructive text-destructive-foreground",
                    children: "Delete Permanently"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
            "Patient Profile"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: patient.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                " Phone"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: patient.phone })
            ] }),
            patient.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
                " Email"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: patient.email })
            ] }),
            patient.dateOfBirth && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                " Date of Birth"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: patient.dateOfBirth })
            ] }),
            patient.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                " Address"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: patient.address })
            ] }),
            patient.gender && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Gender" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "capitalize", children: patient.gender })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Patient ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground truncate", children: patient.id.toString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Registered On" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: formatDate(patient.createdAt) })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold font-display flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-accent" }),
              "Reports (",
              patientReports.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reports/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-7 text-xs gap-1",
                children: "+ Add Report"
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: patientReports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground text-sm", children: "No reports for this patient" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: patientReports.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-4 px-5 py-3.5",
              "data-ocid": "patient-report-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: r.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    REPORT_TYPE_LABELS[r.reportType.__kind__] ?? r.reportType.__kind__,
                    " ",
                    "· ",
                    formatDate(r.uploadedAt)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status })
              ]
            },
            r.id.toString()
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-4 h-4 text-success" }),
            "Appointments (",
            patientAppointments.length,
            ")"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: patientAppointments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground text-sm", children: "No appointments for this patient" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: patientAppointments.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-4 px-5 py-3.5",
              "data-ocid": "patient-appt-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: doctorMap[String(a.doctorId)] ?? `Doctor #${String(a.doctorId).slice(0, 10)}…` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Slot #",
                    a.slotId.toString(),
                    " · Booked",
                    " ",
                    formatDate(a.bookedAt)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: a.status })
              ]
            },
            a.id.toString()
          )) }) })
        ] })
      ]
    }
  ) });
}
export {
  AdminPatientDetailPage as default
};
