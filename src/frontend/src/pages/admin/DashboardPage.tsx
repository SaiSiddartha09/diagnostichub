import type {
  PatientProfile as BackendPatient,
  DiagnosticReport,
} from "@/backend.d";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  CalendarClock,
  ClipboardList,
  FileText,
  Plus,
  Users,
} from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | undefined;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Card className="card-elevated">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <p className="text-2xl font-bold font-display text-foreground mt-1">
              {value ?? "—"}
            </p>
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const REPORT_TYPE_LABELS: Record<string, string> = {
  ctScan: "CT Scan",
  mri: "MRI",
  xRay: "X-Ray",
  ultrasound: "Ultrasound",
  bloodTest: "Blood Test",
  other: "Other",
};

export default function AdminDashboardPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();

  const { data: patients } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => (actor ? actor.listAllPatients() : []),
    enabled: !!actor && !actorLoading,
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

  const totalPatients = patients?.length ?? 0;
  const totalReports = reports?.length ?? 0;
  const pendingReports =
    reports?.filter((r: DiagnosticReport) => r.status === "pending").length ??
    0;
  const totalAppointments = appointments?.length ?? 0;

  const recentPatients = [...(patients ?? [])]
    .sort(
      (a: BackendPatient, b: BackendPatient) =>
        Number(b.createdAt) - Number(a.createdAt),
    )
    .slice(0, 5);

  const recentReports = [...(reports ?? [])]
    .sort(
      (a: DiagnosticReport, b: DiagnosticReport) =>
        Number(b.uploadedAt) - Number(a.uploadedAt),
    )
    .slice(0, 5);

  const adminName = profile?.name ?? "Admin";

  return (
    <Layout userRole="admin" userName={adminName}>
      <div className="space-y-6 max-w-screen-xl" data-ocid="admin-dashboard">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">
              Welcome back, {adminName}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Overview of City Health Diagnostics
            </p>
          </div>
          <Link to="/admin/reports/upload">
            <Button className="gap-2" data-ocid="quick-upload-btn">
              <Plus className="w-4 h-4" />
              Upload Report
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        {actorLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            data-ocid="stats-grid"
          >
            <StatCard
              label="Total Patients"
              value={totalPatients}
              icon={Users}
              color="bg-primary/10 text-primary"
            />
            <StatCard
              label="Total Reports"
              value={totalReports}
              icon={FileText}
              color="bg-accent/10 text-accent"
            />
            <StatCard
              label="Pending Reports"
              value={pendingReports}
              icon={ClipboardList}
              color="bg-warning/10 text-warning"
            />
            <StatCard
              label="Appointments"
              value={totalAppointments}
              icon={CalendarClock}
              color="bg-success/10 text-success"
            />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Patients */}
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold font-display flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Recent Patients
                </CardTitle>
                <Link to="/admin/patients">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs h-7 text-primary"
                  >
                    View all <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {recentPatients.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No patients yet
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentPatients.map((p: BackendPatient) => (
                    <Link
                      key={p.id.toString()}
                      to="/admin/patients/$id"
                      params={{ id: p.id.toString() }}
                      className="flex items-center justify-between px-5 py-3 hover:bg-muted/40 transition-colors group"
                      data-ocid="recent-patient-row"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {p.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {p.phone}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold font-display flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" />
                  Recent Reports
                </CardTitle>
                <Link to="/admin/reports">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs h-7 text-primary"
                  >
                    View all <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {recentReports.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No reports yet
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentReports.map((r: DiagnosticReport) => (
                    <div
                      key={r.id.toString()}
                      className="flex items-center justify-between px-5 py-3"
                      data-ocid="recent-report-row"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {r.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {REPORT_TYPE_LABELS[r.reportType.__kind__] ??
                            r.reportType.__kind__}
                        </p>
                      </div>
                      <StatusBadge status={r.status} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-muted/30 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/reports/upload">
                <Button
                  variant="default"
                  className="gap-2"
                  data-ocid="qa-upload-report"
                >
                  <Plus className="w-4 h-4" />
                  Add Patient Report
                </Button>
              </Link>
              <Link to="/admin/patients">
                <Button
                  variant="outline"
                  className="gap-2"
                  data-ocid="qa-manage-patients"
                >
                  <Users className="w-4 h-4" />
                  Manage Patients
                </Button>
              </Link>
              <Link to="/admin/doctors">
                <Button
                  variant="outline"
                  className="gap-2"
                  data-ocid="qa-manage-doctors"
                >
                  <ClipboardList className="w-4 h-4" />
                  Manage Doctors
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
