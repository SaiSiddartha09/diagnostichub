import type { PatientProfile as BackendPatient } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Search, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPatientsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: patients, isLoading } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => (actor ? actor.listAllPatients() : []),
    enabled: !!actor && !actorLoading,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      const { Principal } = await import("@icp-sdk/core/principal");
      await actor.deletePatient(Principal.fromText(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-patients"] });
      toast.success("Patient deleted successfully");
    },
    onError: () => toast.error("Failed to delete patient"),
  });

  const filtered = (patients ?? []).filter(
    (p: BackendPatient) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search),
  );

  return (
    <Layout userRole="admin" userName={profile?.name}>
      <div
        className="space-y-5 max-w-screen-xl"
        data-ocid="admin-patients-page"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Patients
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {patients?.length ?? 0} registered patients
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="patient-search"
            />
          </div>
        </div>

        <Card className="card-elevated overflow-hidden">
          {isLoading || actorLoading ? (
            <CardContent className="flex items-center justify-center py-16">
              <LoadingSpinner />
            </CardContent>
          ) : filtered.length === 0 ? (
            <CardContent
              className="flex flex-col items-center justify-center py-16 gap-3"
              data-ocid="patients-empty-state"
            >
              <Users className="w-10 h-10 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">
                {search
                  ? "No patients match your search"
                  : "No patients registered yet"}
              </p>
            </CardContent>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Name
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Phone
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Email
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Registered
                      </th>
                      <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((p: BackendPatient) => (
                      <tr
                        key={p.id.toString()}
                        className="hover:bg-muted/30 transition-colors group"
                        data-ocid="patient-row"
                      >
                        <td className="px-5 py-3.5">
                          <Link
                            to="/admin/patients/$id"
                            params={{ id: p.id.toString() }}
                            className="font-medium text-foreground group-hover:text-primary transition-colors"
                          >
                            {p.name}
                          </Link>
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {p.phone}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {p.email ?? (
                            <span className="text-muted-foreground/50">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {formatDate(p.createdAt)}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to="/admin/patients/$id"
                              params={{ id: p.id.toString() }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 gap-1 text-xs"
                              >
                                View <ChevronRight className="w-3 h-3" />
                              </Button>
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                  data-ocid="delete-patient-btn"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Patient
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete{" "}
                                    <strong>{p.name}</strong>? This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      deleteMutation.mutate(p.id.toString())
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-border">
                {filtered.map((p: BackendPatient) => (
                  <div
                    key={p.id.toString()}
                    className="px-4 py-4"
                    data-ocid="patient-row-mobile"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        to="/admin/patients/$id"
                        params={{ id: p.id.toString() }}
                        className="min-w-0 flex-1"
                      >
                        <p className="font-medium text-foreground truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {p.phone}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Registered: {formatDate(p.createdAt)}
                        </p>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:bg-destructive/10 flex-shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Patient</AlertDialogTitle>
                            <AlertDialogDescription>
                              Delete <strong>{p.name}</strong>? This cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteMutation.mutate(p.id.toString())
                              }
                              className="bg-destructive text-destructive-foreground"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!isLoading && filtered.length > 0 && (
            <CardHeader className="border-t border-border bg-muted/20 py-2 px-5">
              <p className="text-xs text-muted-foreground">
                Showing {filtered.length} of {patients?.length ?? 0} patients
              </p>
            </CardHeader>
          )}
        </Card>
      </div>
    </Layout>
  );
}
