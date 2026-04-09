import type {
  Appointment,
  PatientProfile as BackendPatient,
  Doctor,
} from "@/backend.d";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { StatusBadge } from "@/components/StatusBadge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarClock, CheckCircle2, Filter, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminAppointmentsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => (actor ? actor.listAllAppointments() : []),
    enabled: !!actor && !actorLoading,
  });

  const { data: patients } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => (actor ? actor.listAllPatients() : []),
    enabled: !!actor && !actorLoading,
  });

  const { data: doctors } = useQuery({
    queryKey: ["admin-doctors"],
    queryFn: async () => (actor ? actor.listDoctors(null) : []),
    enabled: !!actor && !actorLoading,
  });

  const patientMap = new Map<string, string>(
    (patients ?? []).map((p: BackendPatient) => [p.id.toString(), p.name]),
  );
  const doctorMap = new Map<string, string>(
    (doctors ?? []).map((d: Doctor) => [d.id.toString(), d.name]),
  );

  const confirmMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.confirmAppointment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      toast.success("Appointment confirmed");
    },
    onError: () => toast.error("Failed to confirm appointment"),
  });

  const cancelMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.adminCancelAppointment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      toast.success("Appointment cancelled");
    },
    onError: () => toast.error("Failed to cancel appointment"),
  });

  const filtered = (appointments ?? []).filter(
    (a: Appointment) => statusFilter === "all" || a.status === statusFilter,
  );

  return (
    <Layout userRole="admin" userName={profile?.name}>
      <div
        className="space-y-5 max-w-screen-xl"
        data-ocid="admin-appointments-page"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
              <CalendarClock className="w-6 h-6 text-primary" />
              Appointments
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {appointments?.length ?? 0} total appointments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                className="w-36 h-9 text-sm"
                data-ocid="appt-status-filter"
              >
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
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
              data-ocid="appointments-empty-state"
            >
              <CalendarClock className="w-10 h-10 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">
                {statusFilter !== "all"
                  ? "No appointments with this status"
                  : "No appointments yet"}
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
                        Patient
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Doctor
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Booked At
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Slot
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Status
                      </th>
                      <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((a: Appointment) => (
                      <tr
                        key={a.id.toString()}
                        className="hover:bg-muted/20 transition-colors"
                        data-ocid="appointment-row"
                      >
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-foreground">
                            {patientMap.get(a.patientId.toString()) ??
                              `${a.patientId.toString().slice(0, 10)}…`}
                          </p>
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {doctorMap.get(a.doctorId.toString()) ??
                            `Dr. #${a.doctorId.toString()}`}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground text-xs whitespace-nowrap">
                          {formatDate(a.bookedAt)}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground text-xs">
                          Slot #{a.slotId.toString()}
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={a.status} />
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {a.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs gap-1 text-success hover:bg-success/10 hover:text-success"
                                onClick={() => confirmMutation.mutate(a.id)}
                                disabled={confirmMutation.isPending}
                                data-ocid="confirm-appt-btn"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Confirm
                              </Button>
                            )}
                            {a.status !== "cancelled" && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    data-ocid="cancel-appt-btn"
                                  >
                                    <XCircle className="w-3 h-3" />
                                    Cancel
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Cancel Appointment
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Cancel appointment #{a.id.toString()}? The
                                      patient will no longer attend this slot.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Keep Appointment
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        cancelMutation.mutate(a.id)
                                      }
                                      className="bg-destructive text-destructive-foreground"
                                    >
                                      Cancel Appointment
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-border">
                {filtered.map((a: Appointment) => (
                  <div
                    key={a.id.toString()}
                    className="px-4 py-4 space-y-2"
                    data-ocid="appointment-row-mobile"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {patientMap.get(a.patientId.toString()) ??
                            "Unknown Patient"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doctorMap.get(a.doctorId.toString()) ??
                            `Dr. #${a.doctorId.toString()}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(a.bookedAt)}
                        </p>
                      </div>
                      <StatusBadge status={a.status} />
                    </div>
                    <div className="flex items-center gap-2">
                      {a.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1 border-success/40 text-success hover:bg-success/10"
                          onClick={() => confirmMutation.mutate(a.id)}
                          disabled={confirmMutation.isPending}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          Confirm
                        </Button>
                      )}
                      {a.status !== "cancelled" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs gap-1 border-destructive/40 text-destructive hover:bg-destructive/10"
                            >
                              <XCircle className="w-3 h-3" />
                              Cancel
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Cancel Appointment
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Cancel this appointment?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => cancelMutation.mutate(a.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Cancel
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!isLoading && filtered.length > 0 && (
            <CardHeader className="border-t border-border bg-muted/20 py-2 px-5">
              <p className="text-xs text-muted-foreground">
                Showing {filtered.length} of {appointments?.length ?? 0}{" "}
                appointments
              </p>
            </CardHeader>
          )}
        </Card>
      </div>
    </Layout>
  );
}
