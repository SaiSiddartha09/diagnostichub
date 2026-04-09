import type {
  Appointment,
  PatientProfile as BackendPatient,
  DiagnosticReport,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CalendarClock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";

function formatDate(ts: bigint | number) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const REPORT_TYPE_LABELS: Record<string, string> = {
  ctScan: "CT Scan",
  mri: "MRI",
  xRay: "X-Ray",
  ultrasound: "Ultrasound",
  bloodTest: "Blood Test",
  other: "Other",
};

export default function AdminPatientDetailPage() {
  const { id } = useParams({ from: "/admin/patients/$id" });
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: patient, isLoading: patientLoading } = useQuery({
    queryKey: ["admin-patient", id],
    queryFn: async (): Promise<BackendPatient | null> => {
      if (!actor) return null;
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.getPatientProfile(Principal.fromText(id));
    },
    enabled: !!actor && !actorLoading && !!id,
  });

  const { data: reports } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => (actor ? actor.listAllReports() : []),
    enabled: !!actor && !actorLoading,
  });

  const { data: appointments } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => (actor ? actor.listAllAppointments() : []),
    enabled: !!actor && !actorLoading,
  });

  const { data: doctors } = useQuery({
    queryKey: ["admin-doctors"],
    queryFn: async (): Promise<Doctor[]> =>
      actor ? actor.listDoctors(null) : [],
    enabled: !!actor && !actorLoading,
  });

  const doctorMap: Record<string, string> = Object.fromEntries(
    (doctors ?? []).map((d: Doctor) => [String(d.id), d.name]),
  );

  const patientReports = (reports ?? []).filter(
    (r: DiagnosticReport) => r.patientId.toString() === id,
  );
  const patientAppointments = (appointments ?? []).filter(
    (a: Appointment) => a.patientId.toString() === id,
  );

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const { Principal } = await import("@icp-sdk/core/principal");
      await actor.deletePatient(Principal.fromText(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-patients"] });
      toast.success("Patient deleted");
      navigate({ to: "/admin/patients" });
    },
    onError: () => toast.error("Failed to delete patient"),
  });

  if (patientLoading || actorLoading) {
    return (
      <Layout userRole="admin" userName={profile?.name}>
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!patient) {
    return (
      <Layout userRole="admin" userName={profile?.name}>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-muted-foreground">Patient not found</p>
          <Link to="/admin/patients">
            <Button variant="outline">← Back to Patients</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout userRole="admin" userName={profile?.name}>
      <div
        className="space-y-6 max-w-screen-lg"
        data-ocid="patient-detail-page"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/admin/patients">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">
                {patient.name}
              </h1>
              <p className="text-sm text-muted-foreground">Patient Detail</p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                data-ocid="delete-patient-btn"
              >
                <Trash2 className="w-4 h-4" />
                Delete Patient
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Patient</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete <strong>{patient.name}</strong>{" "}
                  and all associated records. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate()}
                  className="bg-destructive text-destructive-foreground"
                >
                  Delete Permanently
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Profile Card */}
        <Card className="card-elevated">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold font-display flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Patient Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Full Name
                </p>
                <p className="text-sm font-medium text-foreground">
                  {patient.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Phone
                </p>
                <p className="text-sm font-medium text-foreground">
                  {patient.phone}
                </p>
              </div>
              {patient.email && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {patient.email}
                  </p>
                </div>
              )}
              {patient.dateOfBirth && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Date of Birth
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {patient.dateOfBirth}
                  </p>
                </div>
              )}
              {patient.address && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Address
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {patient.address}
                  </p>
                </div>
              )}
              {patient.gender && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Gender
                  </p>
                  <Badge variant="secondary" className="capitalize">
                    {patient.gender}
                  </Badge>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Patient ID
                </p>
                <p className="text-xs font-mono text-muted-foreground truncate">
                  {patient.id.toString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Registered On
                </p>
                <p className="text-sm font-medium text-foreground">
                  {formatDate(patient.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Reports */}
        <Card className="card-elevated">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold font-display flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                Reports ({patientReports.length})
              </CardTitle>
              <Link to="/admin/reports/upload">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1"
                >
                  + Add Report
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {patientReports.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No reports for this patient
              </div>
            ) : (
              <div className="divide-y divide-border">
                {patientReports.map((r: DiagnosticReport) => (
                  <div
                    key={r.id.toString()}
                    className="flex items-center gap-4 px-5 py-3.5"
                    data-ocid="patient-report-row"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {r.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {REPORT_TYPE_LABELS[r.reportType.__kind__] ??
                          r.reportType.__kind__}{" "}
                        · {formatDate(r.uploadedAt)}
                      </p>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appointments */}
        <Card className="card-elevated">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold font-display flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-success" />
              Appointments ({patientAppointments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {patientAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No appointments for this patient
              </div>
            ) : (
              <div className="divide-y divide-border">
                {patientAppointments.map((a: Appointment) => (
                  <div
                    key={a.id.toString()}
                    className="flex items-center gap-4 px-5 py-3.5"
                    data-ocid="patient-appt-row"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {doctorMap[String(a.doctorId)] ??
                          `Doctor #${String(a.doctorId).slice(0, 10)}…`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Slot #{a.slotId.toString()} · Booked{" "}
                        {formatDate(a.bookedAt)}
                      </p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
