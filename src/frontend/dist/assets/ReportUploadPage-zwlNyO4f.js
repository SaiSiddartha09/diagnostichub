const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-mWvxdGEg.js","assets/index-BwdZZcZ7.js","assets/index-B04myH9e.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, b as useAuth, d as useQueryClient, e as useNavigate, r as reactExports, f as useQuery, j as jsxRuntimeExports, g as Link, B as Button, A as ArrowLeft, C as Card, h as CardHeader, i as CardTitle, k as CardContent, I as Input, L as LoadingSpinner, w as Label, l as ue, _ as __vitePreload, E as ExternalBlob } from "./index-BwdZZcZ7.js";
import { u as useBackend, L as Layout, F as FileText, X } from "./use-backend-DMOQb4RX.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BcSNChRX.js";
import { T as Textarea } from "./textarea-B3LbKDpU.js";
import { u as useMutation } from "./index-mWvxdGEg.js";
import { C as CircleCheck } from "./circle-check-hGJVhT9t.js";
import "./chevron-up-D_p129ZJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const REPORT_TYPES = [
  { value: "ctScan", label: "CT Scan" },
  { value: "mri", label: "MRI" },
  { value: "xRay", label: "X-Ray" },
  { value: "ultrasound", label: "Ultrasound" },
  { value: "bloodTest", label: "Blood Test" },
  { value: "other", label: "Other" }
];
function buildReportType(kind) {
  switch (kind) {
    case "ctScan":
      return { __kind__: "ctScan", ctScan: null };
    case "mri":
      return { __kind__: "mri", mri: null };
    case "xRay":
      return { __kind__: "xRay", xRay: null };
    case "ultrasound":
      return { __kind__: "ultrasound", ultrasound: null };
    case "bloodTest":
      return { __kind__: "bloodTest", bloodTest: null };
    default:
      return { __kind__: "other", other: "" };
  }
}
function FileDropzone({
  label,
  accept,
  icon: Icon,
  uploaded,
  onUpload,
  onClear,
  ocid
}) {
  const ref = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-2 block", children: label }),
    uploaded ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg border border-success/40 bg-success/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate flex-1", children: uploaded.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          className: "h-6 w-6 text-muted-foreground hover:text-foreground flex-shrink-0",
          onClick: onClear,
          "aria-label": "Remove file",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = ref.current) == null ? void 0 : _a.click();
        },
        className: "w-full border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-6 flex flex-col items-center gap-2 transition-colors cursor-pointer bg-muted/20 hover:bg-muted/40",
        "data-ocid": ocid,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-muted-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click to upload" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: accept.replace(/,/g, ", ") })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref,
        type: "file",
        accept,
        className: "hidden",
        onChange: (e) => {
          var _a;
          const f = (_a = e.target.files) == null ? void 0 : _a[0];
          if (f) onUpload(f);
          e.target.value = "";
        }
      }
    )
  ] });
}
function AdminReportUploadPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [patientId, setPatientId] = reactExports.useState("");
  const [patientSearch, setPatientSearch] = reactExports.useState("");
  const [title, setTitle] = reactExports.useState("");
  const [reportType, setReportType] = reactExports.useState("");
  const [labNotes, setLabNotes] = reactExports.useState("");
  const [adminNotes, setAdminNotes] = reactExports.useState("");
  const [reportFile, setReportFile] = reactExports.useState(null);
  const [thumbnailFile, setThumbnailFile] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const { data: patients, isLoading: patientsLoading } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => actor ? actor.listAllPatients() : [],
    enabled: !!actor && !actorLoading
  });
  const filteredPatients = (patients ?? []).filter(
    (p) => p.name.toLowerCase().includes(patientSearch.toLowerCase()) || p.phone.includes(patientSearch)
  ).slice(0, 30);
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-mWvxdGEg.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      let fileBlob;
      let thumbnailBlob;
      if (reportFile) {
        const bytes = new Uint8Array(await reportFile.file.arrayBuffer());
        fileBlob = ExternalBlob.fromBytes(bytes).withUploadProgress(setUploadProgress);
      }
      if (thumbnailFile) {
        const bytes = new Uint8Array(await thumbnailFile.file.arrayBuffer());
        thumbnailBlob = ExternalBlob.fromBytes(bytes);
      }
      return actor.createReport({
        patientId: Principal.fromText(patientId),
        title: title.trim(),
        reportType: buildReportType(reportType),
        labNotes: labNotes.trim() || void 0,
        adminNotes: adminNotes.trim() || void 0,
        fileBlob,
        thumbnailBlob
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      ue.success("Report uploaded successfully");
      navigate({ to: "/admin/reports" });
    },
    onError: (err) => {
      console.error(err);
      ue.error("Failed to upload report");
    }
  });
  const isValid = patientId && title.trim() && reportType;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "admin", userName: profile == null ? void 0 : profile.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", "data-ocid": "report-upload-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reports", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold font-display text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-primary" }),
          "Upload Report"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add a new diagnostic report for a patient" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          if (!isValid) return;
          uploadMutation.mutate();
        },
        className: "space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Select Patient" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search patient by name or phone…",
                  value: patientSearch,
                  onChange: (e) => setPatientSearch(e.target.value),
                  className: "mb-2",
                  "data-ocid": "patient-search-input"
                }
              ),
              patientsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: patientId, onValueChange: setPatientId, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full", "data-ocid": "patient-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select patient…" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-60", children: filteredPatients.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id.toString(), children: [
                  p.name,
                  " — ",
                  p.phone
                ] }, p.id.toString())) })
              ] }),
              patientId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-success flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                "Patient selected"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
              "Report Details"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "report-title", className: "text-sm font-medium", children: [
                  "Report Title ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "report-title",
                    placeholder: "e.g. Full Body CT Scan – Aug 2025",
                    value: title,
                    onChange: (e) => setTitle(e.target.value),
                    required: true,
                    "data-ocid": "report-title-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "report-type", className: "text-sm font-medium", children: [
                  "Report Type ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: reportType, onValueChange: setReportType, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "report-type",
                      "data-ocid": "report-type-select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select report type…" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REPORT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.value, children: t.label }, t.value)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lab-notes", className: "text-sm font-medium", children: "Lab Notes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "lab-notes",
                    placeholder: "Technical findings, measurements, diagnostic notes…",
                    value: labNotes,
                    onChange: (e) => setLabNotes(e.target.value),
                    rows: 3,
                    "data-ocid": "lab-notes-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "admin-notes", className: "text-sm font-medium", children: "Admin Notes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "admin-notes",
                    placeholder: "Internal notes, follow-up instructions…",
                    value: adminNotes,
                    onChange: (e) => setAdminNotes(e.target.value),
                    rows: 2,
                    "data-ocid": "admin-notes-input"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-primary" }),
              "Files"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FileDropzone,
                {
                  label: "Report File (PDF or Image)",
                  accept: ".pdf,.jpg,.jpeg,.png,.webp",
                  icon: FileText,
                  uploaded: reportFile,
                  onUpload: (f) => setReportFile({ file: f, name: f.name }),
                  onClear: () => setReportFile(null),
                  ocid: "report-file-upload"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FileDropzone,
                {
                  label: "Thumbnail (Optional)",
                  accept: ".jpg,.jpeg,.png,.webp",
                  icon: Image,
                  uploaded: thumbnailFile,
                  onUpload: (f) => setThumbnailFile({ file: f, name: f.name }),
                  onClear: () => setThumbnailFile(null),
                  ocid: "thumbnail-upload"
                }
              ),
              uploadMutation.isPending && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading…" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    uploadProgress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-primary rounded-full transition-all",
                    style: { width: `${uploadProgress}%` }
                  }
                ) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reports", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                disabled: uploadMutation.isPending,
                children: "Cancel"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: !isValid || uploadMutation.isPending,
                className: "gap-2 min-w-28",
                "data-ocid": "submit-upload-btn",
                children: uploadMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                  "Uploading…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  "Upload Report"
                ] })
              }
            )
          ] })
        ]
      }
    )
  ] }) });
}
export {
  AdminReportUploadPage as default
};
