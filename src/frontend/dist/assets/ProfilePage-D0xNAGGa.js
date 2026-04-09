import { c as createLucideIcon, b as useAuth, d as useQueryClient, r as reactExports, f as useQuery, j as jsxRuntimeExports, B as Button, C as Card, h as CardHeader, i as CardTitle, k as CardContent, w as Label, I as Input, P as Phone, x as ShieldCheck, l as ue } from "./index-BwdZZcZ7.js";
import { G as Gender } from "./backend.d-DT8BPANE.js";
import { u as useBackend, L as Layout, X, U as User, C as Calendar } from "./use-backend-DMOQb4RX.js";
import { S as Separator, M as Mail } from "./separator-BKUYg_5N.js";
import { S as Skeleton } from "./skeleton-Bpu6Sw8c.js";
import { u as useMutation } from "./index-mWvxdGEg.js";
import { M as MapPin } from "./map-pin-DmaMr15U.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const DEFAULT_FORM = {
  name: "Alex Johnson",
  phone: "+1 (555) 987-6543",
  email: "alex.johnson@email.com",
  dateOfBirth: "1990-08-08",
  address: "123 Health Street, Medical District"
};
function FieldDisplay({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 py-2.5 px-3 bg-muted/30 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground break-words min-w-0", children: value || "—" })
    ] })
  ] });
}
function PatientProfilePage() {
  const { profile: authProfile, principalId } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(DEFAULT_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const profileQuery = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !actorLoading
  });
  reactExports.useEffect(() => {
    const data = profileQuery.data;
    if (data) {
      setForm({
        name: data.name || DEFAULT_FORM.name,
        phone: data.phone || DEFAULT_FORM.phone,
        email: data.email ?? DEFAULT_FORM.email,
        dateOfBirth: data.dateOfBirth ?? DEFAULT_FORM.dateOfBirth,
        address: data.address ?? DEFAULT_FORM.address
      });
    } else if (authProfile == null ? void 0 : authProfile.name) {
      setForm((f) => ({ ...f, name: authProfile.name }));
    }
  }, [profileQuery.data, authProfile]);
  const saveMutation = useMutation({
    mutationFn: async (updated) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveMyProfile({
        name: updated.name,
        phone: updated.phone,
        email: updated.email || void 0,
        dateOfBirth: updated.dateOfBirth || void 0,
        address: updated.address || void 0,
        gender: Gender.other
      });
    },
    onSuccess: () => {
      ue.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      setEditing(false);
      setErrors({});
    },
    onError: () => {
      ue.error("Failed to update profile. Please try again.");
    }
  });
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSave = () => {
    if (!validate()) return;
    saveMutation.mutate(form);
  };
  const handleCancel = () => {
    setEditing(false);
    setErrors({});
    const data = profileQuery.data;
    if (data) {
      setForm({
        name: data.name || DEFAULT_FORM.name,
        phone: data.phone || DEFAULT_FORM.phone,
        email: data.email ?? DEFAULT_FORM.email,
        dateOfBirth: data.dateOfBirth ?? DEFAULT_FORM.dateOfBirth,
        address: data.address ?? DEFAULT_FORM.address
      });
    }
  };
  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: void 0 }));
  };
  const isLoading = profileQuery.isLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "patient", userName: form.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "My Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage your personal information" })
      ] }),
      !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-2",
          onClick: () => setEditing(true),
          "data-ocid": "edit-profile-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }),
            "Edit"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: handleCancel,
            "data-ocid": "cancel-edit-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-2",
            disabled: saveMutation.isPending,
            onClick: handleSave,
            "data-ocid": "save-profile-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              saveMutation.isPending ? "Saving…" : "Save"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", "data-ocid": "profile-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-14 h-14 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display truncate", children: form.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: form.phone }),
          principalId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5 font-mono truncate max-w-[200px]", children: [
            principalId.slice(0, 20),
            "…"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" })
        ] }, i)) }) : editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "name",
                className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                children: "Full Name *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "name",
                value: form.name,
                onChange: (e) => setField("name", e.target.value),
                placeholder: "Enter your full name",
                className: errors.name ? "border-destructive" : "",
                "data-ocid": "profile-name-input"
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "phone",
                className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                children: "Phone Number *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phone",
                type: "tel",
                value: form.phone,
                onChange: (e) => setField("phone", e.target.value),
                placeholder: "+1 (555) 000-0000",
                className: errors.phone ? "border-destructive" : "",
                "data-ocid": "profile-phone-input"
              }
            ),
            errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "email",
                className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                children: "Email Address"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email",
                type: "email",
                value: form.email,
                onChange: (e) => setField("email", e.target.value),
                placeholder: "your@email.com",
                className: errors.email ? "border-destructive" : "",
                "data-ocid": "profile-email-input"
              }
            ),
            errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "dob",
                className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                children: "Date of Birth"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "dob",
                type: "date",
                value: form.dateOfBirth,
                onChange: (e) => setField("dateOfBirth", e.target.value),
                "data-ocid": "profile-dob-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "address",
                className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                children: "Address"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "address",
                value: form.address,
                onChange: (e) => setField("address", e.target.value),
                placeholder: "123 Health Street, City",
                "data-ocid": "profile-address-input"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldDisplay,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
              label: "Full Name",
              value: form.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldDisplay,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
              label: "Phone Number",
              value: form.phone
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldDisplay,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
              label: "Email Address",
              value: form.email
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldDisplay,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
              label: "Date of Birth",
              value: form.dateOfBirth
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldDisplay,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-4 h-4" }),
              label: "Medical ID",
              value: "MID-20101233329"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldDisplay,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
              label: "Address",
              value: form.address
            }
          )
        ] }),
        !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-success flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your data is securely stored on the Internet Computer blockchain." })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  PatientProfilePage as default
};
