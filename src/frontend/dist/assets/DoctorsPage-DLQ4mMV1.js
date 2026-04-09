import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, b as useAuth, d as useQueryClient, r as reactExports, f as useQuery, B as Button, C as Card, h as CardHeader, k as CardContent, L as LoadingSpinner, l as ue, P as Phone, w as Label, I as Input } from "./index-BwdZZcZ7.js";
import { R as Root, c as Content, e as Close, X, d as Title, P as Portal, O as Overlay, u as useBackend, L as Layout, S as Stethoscope } from "./use-backend-DMOQb4RX.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DNEBixpW.js";
import { B as Badge } from "./badge-DWVae5Qt.js";
import { T as Textarea } from "./textarea-B3LbKDpU.js";
import { u as useMutation } from "./index-mWvxdGEg.js";
import { P as Plus } from "./plus-DQw8door.js";
import { M as MapPin } from "./map-pin-DmaMr15U.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-D_p129ZJ.js";
import { T as Trash2 } from "./trash-2-2oP81WaA.js";
import { C as Clock } from "./clock-Bn38jOZH.js";
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const EMPTY_FORM = {
  name: "",
  specialization: "",
  phone: "",
  email: "",
  clinicName: "",
  clinicAddress: "",
  bio: ""
};
function DoctorFormDialog({
  open,
  onClose,
  onSubmit,
  initial,
  loading
}) {
  const [form, setForm] = reactExports.useState(initial ?? EMPTY_FORM);
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: initial ? "Edit Doctor" : "Add New Doctor" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        className: "space-y-4 mt-2",
        onSubmit: (e) => {
          e.preventDefault();
          onSubmit(form);
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-name", children: "Full Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "doc-name",
                  value: form.name,
                  onChange: set("name"),
                  required: true,
                  "data-ocid": "doctor-name-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-spec", children: "Specialization *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "doc-spec",
                  value: form.specialization,
                  onChange: set("specialization"),
                  required: true,
                  placeholder: "e.g. Radiologist",
                  "data-ocid": "doctor-spec-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-phone", children: "Phone *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "doc-phone",
                  value: form.phone,
                  onChange: set("phone"),
                  required: true,
                  type: "tel",
                  "data-ocid": "doctor-phone-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-email", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "doc-email",
                  value: form.email,
                  onChange: set("email"),
                  type: "email",
                  "data-ocid": "doctor-email-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-clinic", children: "Clinic Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "doc-clinic",
                  value: form.clinicName,
                  onChange: set("clinicName"),
                  required: true,
                  "data-ocid": "doctor-clinic-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-addr", children: "Clinic Address *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "doc-addr",
                  value: form.clinicAddress,
                  onChange: set("clinicAddress"),
                  required: true,
                  "data-ocid": "doctor-addr-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-bio", children: "Bio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "doc-bio",
                  value: form.bio,
                  onChange: set("bio"),
                  rows: 3,
                  placeholder: "Professional background…",
                  "data-ocid": "doctor-bio-input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                disabled: loading,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: loading,
                "data-ocid": "doctor-submit-btn",
                children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : initial ? "Save Changes" : "Add Doctor"
              }
            )
          ] })
        ]
      }
    )
  ] }) });
}
function DoctorRow({
  doctor,
  onEdit,
  onDelete
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [slotForm, setSlotForm] = reactExports.useState({
    date: "",
    startTime: "",
    endTime: ""
  });
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const { data: slots, isLoading: slotsLoading } = useQuery({
    queryKey: ["doctor-slots", doctor.id.toString()],
    queryFn: async () => actor ? actor.getDoctorSlots(doctor.id) : [],
    enabled: expanded && !!actor && !actorLoading
  });
  const addSlotMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.addDoctorSlot({
        doctorId: doctor.id,
        date: slotForm.date,
        startTime: slotForm.startTime,
        endTime: slotForm.endTime
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-slots", doctor.id.toString()]
      });
      setSlotForm({ date: "", startTime: "", endTime: "" });
      ue.success("Slot added");
    },
    onError: () => ue.error("Failed to add slot")
  });
  const removeSlotMutation = useMutation({
    mutationFn: async (slotId) => {
      if (!actor) throw new Error("No actor");
      await actor.removeDoctorSlot(slotId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-slots", doctor.id.toString()]
      });
      ue.success("Slot removed");
    },
    onError: () => ue.error("Failed to remove slot")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border-b border-border last:border-0",
      "data-ocid": "doctor-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-4 hover:bg-muted/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 grid sm:grid-cols-4 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: doctor.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: doctor.specialization })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: doctor.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1 text-xs text-muted-foreground col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                doctor.clinicName,
                ", ",
                doctor.clinicAddress
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
                onClick: () => setExpanded((e) => !e),
                "aria-label": expanded ? "Collapse" : "Expand",
                "data-ocid": "expand-doctor-btn",
                children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
                onClick: () => onEdit(doctor),
                "aria-label": "Edit doctor",
                "data-ocid": "edit-doctor-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-destructive hover:bg-destructive/10",
                  "aria-label": "Delete doctor",
                  "data-ocid": "delete-doctor-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Doctor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                    "Delete ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: doctor.name }),
                    "? All slots will also be removed."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      onClick: () => onDelete(doctor.id),
                      className: "bg-destructive text-destructive-foreground",
                      children: "Delete"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 border-t border-border px-5 py-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            " Availability Slots"
          ] }),
          slotsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : !slots || slots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No slots added yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: slots.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 bg-card border border-border rounded-md px-3 py-2 text-xs",
              "data-ocid": "slot-item",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: slot.date }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  slot.startTime,
                  "–",
                  slot.endTime
                ] }),
                slot.isBooked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-[10px] py-0 px-1",
                    children: "Booked"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-4 w-4 text-destructive hover:bg-destructive/10 ml-1",
                    onClick: () => removeSlotMutation.mutate(slot.id),
                    disabled: slot.isBooked,
                    "aria-label": "Remove slot",
                    "data-ocid": "remove-slot-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                  }
                )
              ]
            },
            slot.id.toString()
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              className: "flex flex-wrap items-end gap-3",
              onSubmit: (e) => {
                e.preventDefault();
                addSlotMutation.mutate();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "date",
                      value: slotForm.date,
                      onChange: (e) => setSlotForm((s) => ({ ...s, date: e.target.value })),
                      className: "h-8 text-xs w-36",
                      required: true,
                      "data-ocid": "slot-date-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Start Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "time",
                      value: slotForm.startTime,
                      onChange: (e) => setSlotForm((s) => ({ ...s, startTime: e.target.value })),
                      className: "h-8 text-xs w-28",
                      required: true,
                      "data-ocid": "slot-start-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "End Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "time",
                      value: slotForm.endTime,
                      onChange: (e) => setSlotForm((s) => ({ ...s, endTime: e.target.value })),
                      className: "h-8 text-xs w-28",
                      required: true,
                      "data-ocid": "slot-end-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "sm",
                    className: "h-8 gap-1 text-xs",
                    disabled: addSlotMutation.isPending,
                    "data-ocid": "add-slot-btn",
                    children: addSlotMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                      "Add Slot"
                    ] })
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AdminDoctorsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingDoctor, setEditingDoctor] = reactExports.useState(null);
  const { data: doctors, isLoading } = useQuery({
    queryKey: ["admin-doctors"],
    queryFn: async () => actor ? actor.listDoctors(null) : [],
    enabled: !!actor && !actorLoading
  });
  const addMutation = useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("No actor");
      const input = {
        name: data.name,
        specialization: data.specialization,
        phone: data.phone,
        email: data.email || void 0,
        clinicName: data.clinicName,
        clinicAddress: data.clinicAddress,
        bio: data.bio || void 0
      };
      return actor.createDoctor(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      setDialogOpen(false);
      ue.success("Doctor added");
    },
    onError: () => ue.error("Failed to add doctor")
  });
  const editMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      if (!actor) throw new Error("No actor");
      const input = {
        name: data.name,
        specialization: data.specialization,
        phone: data.phone,
        email: data.email || void 0,
        clinicName: data.clinicName,
        clinicAddress: data.clinicAddress,
        bio: data.bio || void 0
      };
      return actor.updateDoctor(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      setEditingDoctor(null);
      ue.success("Doctor updated");
    },
    onError: () => ue.error("Failed to update doctor")
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteDoctor(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      ue.success("Doctor deleted");
    },
    onError: () => ue.error("Failed to delete doctor")
  });
  const editInitial = editingDoctor ? {
    name: editingDoctor.name,
    specialization: editingDoctor.specialization,
    phone: editingDoctor.phone,
    email: editingDoctor.email ?? "",
    clinicName: editingDoctor.clinicName,
    clinicAddress: editingDoctor.clinicAddress,
    bio: editingDoctor.bio ?? ""
  } : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { userRole: "admin", userName: profile == null ? void 0 : profile.name, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-screen-xl", "data-ocid": "admin-doctors-page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold font-display text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-6 h-6 text-primary" }),
            "Doctors"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            (doctors == null ? void 0 : doctors.length) ?? 0,
            " doctors registered"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setDialogOpen(true),
            className: "gap-2",
            "data-ocid": "add-doctor-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Doctor"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-border bg-muted/40 py-2.5 px-5 hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Name / Spec" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide col-span-2", children: "Clinic" })
        ] }) }),
        isLoading || actorLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : !doctors || doctors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CardContent,
          {
            className: "flex flex-col items-center justify-center py-16 gap-3",
            "data-ocid": "doctors-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-10 h-10 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No doctors yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => setDialogOpen(true),
                  children: "Add first doctor"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: doctors.map((doctor) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DoctorRow,
          {
            doctor,
            onEdit: (d) => setEditingDoctor(d),
            onDelete: (id) => deleteMutation.mutate(id)
          },
          doctor.id.toString()
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DoctorFormDialog,
      {
        open: dialogOpen,
        onClose: () => setDialogOpen(false),
        onSubmit: (data) => addMutation.mutate(data),
        loading: addMutation.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DoctorFormDialog,
      {
        open: !!editingDoctor,
        onClose: () => setEditingDoctor(null),
        onSubmit: (data) => editingDoctor && editMutation.mutate({ id: editingDoctor.id, data }),
        initial: editInitial,
        loading: editMutation.isPending
      }
    )
  ] });
}
export {
  AdminDoctorsPage as default
};
