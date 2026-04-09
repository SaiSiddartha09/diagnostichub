const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-mWvxdGEg.js","assets/index-BwdZZcZ7.js","assets/index-B04myH9e.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, b as useAuth, d as useQueryClient, r as reactExports, f as useQuery, j as jsxRuntimeExports, I as Input, C as Card, k as CardContent, L as LoadingSpinner, g as Link, B as Button, h as CardHeader, l as ue, _ as __vitePreload } from "./index-BwdZZcZ7.js";
import { u as useBackend, L as Layout, b as Users } from "./use-backend-DMOQb4RX.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DNEBixpW.js";
import { u as useMutation } from "./index-mWvxdGEg.js";
import { S as Search } from "./search-B_Rk2kCe.js";
import { T as Trash2 } from "./trash-2-2oP81WaA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function AdminPatientsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [search, setSearch] = reactExports.useState("");
  const { data: patients, isLoading } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => actor ? actor.listAllPatients() : [],
    enabled: !!actor && !actorLoading
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-mWvxdGEg.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      await actor.deletePatient(Principal.fromText(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-patients"] });
      ue.success("Patient deleted successfully");
    },
    onError: () => ue.error("Failed to delete patient")
  });
  const filtered = (patients ?? []).filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { userRole: "admin", userName: profile == null ? void 0 : profile.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-5 max-w-screen-xl",
      "data-ocid": "admin-patients-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold font-display text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-primary" }),
              "Patients"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
              (patients == null ? void 0 : patients.length) ?? 0,
              " registered patients"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by name or phone…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9",
                "data-ocid": "patient-search"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated overflow-hidden", children: [
          isLoading || actorLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CardContent,
            {
              className: "flex flex-col items-center justify-center py-16 gap-3",
              "data-ocid": "patients-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: search ? "No patients match your search" : "No patients registered yet" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Registered" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-muted/30 transition-colors group",
                  "data-ocid": "patient-row",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/admin/patients/$id",
                        params: { id: p.id.toString() },
                        className: "font-medium text-foreground group-hover:text-primary transition-colors",
                        children: p.name
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground", children: p.phone }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground", children: p.email ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "—" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground", children: formatDate(p.createdAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/admin/patients/$id",
                          params: { id: p.id.toString() },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Button,
                            {
                              variant: "ghost",
                              size: "sm",
                              className: "h-7 gap-1 text-xs",
                              children: [
                                "View ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                              ]
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "h-7 w-7 text-destructive hover:bg-destructive/10",
                            "data-ocid": "delete-patient-btn",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Patient" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                              "Are you sure you want to delete",
                              " ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: p.name }),
                              "? This action cannot be undone."
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              AlertDialogAction,
                              {
                                onClick: () => deleteMutation.mutate(p.id.toString()),
                                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                                children: "Delete"
                              }
                            )
                          ] })
                        ] })
                      ] })
                    ] }) })
                  ]
                },
                p.id.toString()
              )) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-4",
                "data-ocid": "patient-row-mobile",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/admin/patients/$id",
                      params: { id: p.id.toString() },
                      className: "min-w-0 flex-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: p.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.phone }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                          "Registered: ",
                          formatDate(p.createdAt)
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-destructive hover:bg-destructive/10 flex-shrink-0",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Patient" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                          "Delete ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: p.name }),
                          "? This cannot be undone."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogAction,
                          {
                            onClick: () => deleteMutation.mutate(p.id.toString()),
                            className: "bg-destructive text-destructive-foreground",
                            children: "Delete"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] })
              },
              p.id.toString()
            )) })
          ] }),
          !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-t border-border bg-muted/20 py-2 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            filtered.length,
            " of ",
            (patients == null ? void 0 : patients.length) ?? 0,
            " patients"
          ] }) })
        ] })
      ]
    }
  ) });
}
export {
  AdminPatientsPage as default
};
