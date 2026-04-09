import { c as createLucideIcon, b as useAuth, d as useQueryClient, r as reactExports, f as useQuery, j as jsxRuntimeExports, I as Input, C as Card, k as CardContent, P as Phone, B as Button, l as ue } from "./index-BwdZZcZ7.js";
import { u as useBackend, L as Layout, S as Stethoscope, C as Calendar } from "./use-backend-DMOQb4RX.js";
import { S as StatusBadge } from "./StatusBadge-C6wvdIVu.js";
import { B as Badge } from "./badge-DWVae5Qt.js";
import { S as Skeleton } from "./skeleton-Bpu6Sw8c.js";
import { u as useMutation } from "./index-mWvxdGEg.js";
import { S as Search } from "./search-B_Rk2kCe.js";
import { M as MapPin } from "./map-pin-DmaMr15U.js";
import { C as Clock } from "./clock-Bn38jOZH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8", key: "3spt84" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m17 22 5-5", key: "1k6ppv" }],
  ["path", { d: "m17 17 5 5", key: "p7ous7" }]
];
const CalendarX2 = createLucideIcon("calendar-x-2", __iconNode$1);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const FALLBACK_DOCTORS = [
  {
    id: 1n,
    name: "Dr. Sarah Chen",
    specialization: "Radiologist",
    clinicName: "Downtown Medical Center",
    clinicAddress: "123 Main St, Downtown",
    phone: "+1 (555) 123-4567",
    slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:30 PM"],
    ratingDisplay: 4.9,
    distanceKm: 0.8
  },
  {
    id: 2n,
    name: "Dr. Michael Park",
    specialization: "Cardiologist",
    clinicName: "City Heart Institute",
    clinicAddress: "456 Heart Ave",
    phone: "+1 (555) 234-5678",
    slots: ["10:00 AM", "1:00 PM", "3:00 PM"],
    ratingDisplay: 4.8,
    distanceKm: 1.2
  },
  {
    id: 3n,
    name: "Dr. Priya Sharma",
    specialization: "Neurologist",
    clinicName: "NeuroCare Clinic",
    clinicAddress: "789 Brain Blvd",
    phone: "+1 (555) 345-6789",
    slots: ["9:30 AM", "12:00 PM", "5:00 PM"],
    ratingDisplay: 4.7,
    distanceKm: 2.1
  },
  {
    id: 4n,
    name: "Dr. James Okafor",
    specialization: "Pulmonologist",
    clinicName: "Breath & Lung Center",
    clinicAddress: "321 Lung Lane",
    phone: "+1 (555) 456-7890",
    slots: ["8:30 AM", "11:30 AM", "3:30 PM"],
    ratingDisplay: 4.6,
    distanceKm: 2.8
  }
];
const FALLBACK_APPOINTMENTS = [
  {
    id: "a1",
    doctorName: "Dr. Sarah Chen",
    specialty: "Radiologist",
    date: "Fri, Apr 11, 2026",
    time: "10:00 AM",
    status: "confirmed"
  },
  {
    id: "a2",
    doctorName: "Dr. Michael Park",
    specialty: "Cardiologist",
    date: "Mon, Apr 14, 2026",
    time: "2:30 PM",
    status: "pending"
  }
];
function DoctorSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" })
  ] }) });
}
function PatientAppointmentsPage() {
  var _a, _b, _c;
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = reactExports.useState("book");
  const [doctorSearch, setDoctorSearch] = reactExports.useState("");
  const [selectedDoctorId, setSelectedDoctorId] = reactExports.useState(null);
  const [selectedSlot, setSelectedSlot] = reactExports.useState(null);
  const doctorsQuery = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDoctors(null);
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
  const doctorMapQuery = useQuery({
    queryKey: ["doctorMap"],
    queryFn: async () => {
      if (!actor) return {};
      const docs = await actor.listDoctors(null);
      return Object.fromEntries(docs.map((d) => [String(d.id), d.name]));
    },
    enabled: !!actor && !actorLoading
  });
  const slotMapQuery = useQuery({
    queryKey: ["allSlotsMap"],
    queryFn: async () => {
      if (!actor) return {};
      const appts = await actor.listMyAppointments();
      const uniqueDoctorIds = [...new Set(appts.map((a) => a.doctorId))];
      const slotEntries = [];
      await Promise.all(
        uniqueDoctorIds.map(async (docId) => {
          const slots = await actor.getDoctorSlots(docId);
          for (const s of slots) {
            slotEntries.push([String(s.id), `${s.date} · ${s.startTime}`]);
          }
        })
      );
      return Object.fromEntries(slotEntries);
    },
    enabled: !!actor && !actorLoading
  });
  const doctorMap = doctorMapQuery.data ?? {};
  const slotMap = slotMapQuery.data ?? {};
  const slotsQuery = useQuery({
    queryKey: ["doctorSlots", String(selectedDoctorId)],
    queryFn: async () => {
      if (!actor || !selectedDoctorId) return [];
      return actor.getDoctorSlots(selectedDoctorId);
    },
    enabled: !!actor && !actorLoading && !!selectedDoctorId
  });
  const bookMutation = useMutation({
    mutationFn: async ({
      doctorId,
      slotId
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.bookAppointment({ doctorId, slotId });
    },
    onSuccess: () => {
      ue.success("Appointment booked successfully!");
      queryClient.invalidateQueries({ queryKey: ["myAppointments"] });
      setSelectedDoctorId(null);
      setSelectedSlot(null);
      setActiveTab("my");
    },
    onError: () => {
      ue.error("Failed to book appointment. Please try again.");
    }
  });
  const cancelMutation = useMutation({
    mutationFn: async (appointmentId) => {
      if (!actor) throw new Error("Not connected");
      return actor.cancelMyAppointment(appointmentId);
    },
    onSuccess: () => {
      ue.success("Appointment cancelled.");
      queryClient.invalidateQueries({ queryKey: ["myAppointments"] });
    },
    onError: () => {
      ue.error("Failed to cancel appointment.");
    }
  });
  const hasRealDoctors = (((_a = doctorsQuery.data) == null ? void 0 : _a.length) ?? 0) > 0;
  const hasRealAppts = (((_b = appointmentsQuery.data) == null ? void 0 : _b.length) ?? 0) > 0;
  const rawDoctors = hasRealDoctors ? (doctorsQuery.data ?? []).map((d) => ({
    ...d,
    slots: [],
    ratingDisplay: 0,
    distanceKm: 0
  })) : FALLBACK_DOCTORS;
  const filteredDoctors = rawDoctors.filter(
    (d) => !doctorSearch || d.name.toLowerCase().includes(doctorSearch.toLowerCase()) || d.specialization.toLowerCase().includes(doctorSearch.toLowerCase())
  );
  const selectedDoctor = rawDoctors.find((d) => d.id === selectedDoctorId);
  const availableSlotTimes = (((_c = slotsQuery.data) == null ? void 0 : _c.filter((s) => !s.isBooked).map((s) => s.startTime)) ?? []).length > 0 ? slotsQuery.data.filter((s) => !s.isBooked).map((s) => s.startTime) : (selectedDoctor == null ? void 0 : selectedDoctor.slots) ?? [];
  const slotIdForTime = (time) => {
    if (!slotsQuery.data) return null;
    const slot = slotsQuery.data.find(
      (s) => s.startTime === time && !s.isBooked
    );
    return (slot == null ? void 0 : slot.id) ?? null;
  };
  const handleBook = () => {
    if (!selectedDoctorId || !selectedSlot) {
      ue.error("Please select a doctor and time slot");
      return;
    }
    if (hasRealDoctors) {
      const slotId = slotIdForTime(selectedSlot);
      if (!slotId) {
        ue.error("Slot no longer available.");
        return;
      }
      bookMutation.mutate({ doctorId: selectedDoctorId, slotId });
    } else {
      ue.success("Appointment booked successfully! (Demo mode)");
      setSelectedDoctorId(null);
      setSelectedSlot(null);
      setActiveTab("my");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "patient", userName: (profile == null ? void 0 : profile.name) ?? "Patient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Appointments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Book and manage your doctor appointments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 bg-muted/40 rounded-xl p-1 w-fit",
        "data-ocid": "appointments-tabs",
        children: ["book", "my"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab),
            className: `px-5 py-2 rounded-lg text-sm font-medium transition-smooth ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `tab-${tab}`,
            children: tab === "book" ? "Book New" : "My Bookings"
          },
          tab
        ))
      }
    ),
    activeTab === "book" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search doctors by name or specialization…",
            value: doctorSearch,
            onChange: (e) => setDoctorSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "doctor-search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: doctorsQuery.isLoading ? [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorSkeleton, {}, i)) : filteredDoctors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No doctors found matching your search." })
      ] }) : filteredDoctors.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `card-elevated cursor-pointer transition-smooth ${selectedDoctorId === doc.id ? "ring-2 ring-primary border-primary" : ""}`,
          onClick: () => {
            setSelectedDoctorId(doc.id);
            setSelectedSlot(null);
          },
          "data-ocid": `doctor-card-${doc.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-5 h-5 text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display", children: doc.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs mt-0.5", children: doc.specialization })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                doc.ratingDisplay > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-warning text-warning" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: doc.ratingDisplay })
                ] }),
                doc.distanceKm > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  doc.distanceKm,
                  " km"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
                doc.clinicName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                doc.phone
              ] })
            ] }),
            selectedDoctorId === doc.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5", children: "Available Slots" }),
              slotsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20" }, i)) }) : availableSlotTimes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No available slots at this time." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: availableSlotTimes.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    setSelectedSlot(slot);
                  },
                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-smooth ${selectedSlot === slot ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"}`,
                  "data-ocid": `slot-${doc.id}-${slot.replace(/\s/g, "-")}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                    slot
                  ]
                },
                slot
              )) })
            ] })
          ] })
        },
        String(doc.id)
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full gap-2",
          disabled: !selectedDoctorId || !selectedSlot || bookMutation.isPending,
          onClick: handleBook,
          "data-ocid": "book-appointment-submit-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
            bookMutation.isPending ? "Booking…" : selectedDoctorId && selectedSlot ? `Book with ${(selectedDoctor == null ? void 0 : selectedDoctor.name) ?? "doctor"} at ${selectedSlot}` : "Select a doctor and slot to book"
          ]
        }
      )
    ] }),
    activeTab === "my" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: appointmentsQuery.isLoading ? [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
    ] }) }, i)) : !hasRealAppts ? (
      /* Fallback appointments or empty state */
      FALLBACK_APPOINTMENTS.length > 0 ? FALLBACK_APPOINTMENTS.map((appt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "card-elevated",
          "data-ocid": `appt-item-${appt.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display truncate", children: appt.doctorName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: appt.specialty }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                  appt.date,
                  " · ",
                  appt.time
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: appt.status })
          ] })
        },
        appt.id
      )) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "appointments-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarX2, { className: "w-7 h-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground font-display mb-1", children: "No appointments yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs mb-4", children: "Book your first appointment with a specialist doctor nearby." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: () => setActiveTab("book"),
                "data-ocid": "book-first-appt-btn",
                children: "Book an Appointment"
              }
            )
          ]
        }
      )
    ) : (appointmentsQuery.data ?? []).map((appt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "card-elevated",
        "data-ocid": `appt-item-${appt.id}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display truncate", children: doctorMap[String(appt.doctorId)] ?? `Doctor #${String(appt.doctorId)}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                slotMap[String(appt.slotId)] ?? `Slot #${String(appt.slotId)}`
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: appt.status }),
            appt.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "text-destructive border-destructive/30 h-7 text-xs hover:bg-destructive/5",
                disabled: cancelMutation.isPending,
                onClick: () => cancelMutation.mutate(appt.id),
                "data-ocid": `cancel-appt-${appt.id}`,
                children: "Cancel"
              }
            )
          ] })
        ] })
      },
      String(appt.id)
    )) })
  ] }) });
}
export {
  PatientAppointmentsPage as default
};
