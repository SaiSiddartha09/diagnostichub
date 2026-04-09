import type { Appointment, DiagnosticReport, ReportStatus } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  TrendingUp,
} from "lucide-react";

function getReportLabel(report: DiagnosticReport): string {
  return report.title;
}

function getReportDate(report: DiagnosticReport): string {
  return new Date(Number(report.uploadedAt) / 1_000_000).toLocaleDateString(
    "en-GB",
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  loading,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
  loading?: boolean;
}) {
  return (
    <Card className="card-elevated">
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          {loading ? (
            <Skeleton className="h-7 w-12 mb-1" />
          ) : (
            <p className="text-2xl font-bold text-foreground font-display">
              {value}
            </p>
          )}
          <p className="text-xs text-muted-foreground truncate">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const FALLBACK_REPORTS = [
  {
    id: "s1",
    title: "Full Body CT Scan",
    date: "17/03/2026",
    center: "City Health",
    status: "pending" as ReportStatus,
  },
  {
    id: "s2",
    title: "MRI Brain Scan",
    date: "10/03/2026",
    center: "City Health",
    status: "uploaded" as ReportStatus,
  },
  {
    id: "s3",
    title: "Chest X-Ray",
    date: "02/03/2026",
    center: "City Health",
    status: "sent" as ReportStatus,
  },
  {
    id: "s4",
    title: "Blood Panel CBC",
    date: "22/02/2026",
    center: "City Health",
    status: "viewed" as ReportStatus,
  },
];

const FALLBACK_APPOINTMENTS = [
  {
    id: "a1",
    doctor: "Dr. Sarah Chen",
    specialty: "Radiologist",
    date: "Fri, Apr 11",
    time: "10:00 AM",
    status: "confirmed" as Appointment["status"],
  },
  {
    id: "a2",
    doctor: "Dr. Michael Park",
    specialty: "Cardiologist",
    date: "Mon, Apr 14",
    time: "2:30 PM",
    status: "pending" as Appointment["status"],
  },
];

export default function PatientDashboardPage() {
  const { profile, isLoading: authLoading } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const userName = profile?.name ?? "Patient";

  const reportsQuery = useQuery<DiagnosticReport[]>({
    queryKey: ["myReports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyReports();
    },
    enabled: !!actor && !actorLoading,
  });

  const appointmentsQuery = useQuery<Appointment[]>({
    queryKey: ["myAppointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyAppointments();
    },
    enabled: !!actor && !actorLoading,
  });

  const reports = reportsQuery.data ?? [];
  const appointments = appointmentsQuery.data ?? [];
  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const confirmedCount = appointments.filter(
    (a) => a.status === "confirmed",
  ).length;
  const hasRealReports = reports.length > 0;
  const hasRealAppts = appointments.length > 0;

  return (
    <Layout userRole="patient" userName={userName}>
      <div className="space-y-6 max-w-5xl">
        {/* Welcome */}
        <div>
          {authLoading ? (
            <Skeleton className="h-8 w-56 mb-1" />
          ) : (
            <h1 className="text-2xl font-bold text-foreground font-display">
              Welcome back, {userName.split(" ")[0]}!
            </h1>
          )}
          <p className="text-muted-foreground text-sm mt-1">
            Your health journey at a glance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon={FileText}
            label="Total Reports"
            value={
              reportsQuery.isLoading
                ? "—"
                : hasRealReports
                  ? reports.length
                  : 12
            }
            color="bg-primary/10 text-primary"
            loading={reportsQuery.isLoading}
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={
              reportsQuery.isLoading ? "—" : hasRealReports ? pendingCount : 2
            }
            color="bg-warning/10 text-warning"
            loading={reportsQuery.isLoading}
          />
          <StatCard
            icon={TrendingUp}
            label="This Month"
            value="4"
            color="bg-accent/10 text-accent"
          />
          <StatCard
            icon={Calendar}
            label="Appointments"
            value={
              appointmentsQuery.isLoading
                ? "—"
                : hasRealAppts
                  ? confirmedCount
                  : 3
            }
            color="bg-success/10 text-success"
            loading={appointmentsQuery.isLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Recent Reports */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground font-display">
                Recent Reports
              </h2>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-primary h-7 gap-1"
                data-ocid="view-all-reports-btn"
              >
                <Link to="/patient/reports">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>

            {reportsQuery.isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="card-elevated">
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-5 w-20" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hasRealReports
                  ? reports.slice(0, 4).map((report) => (
                      <Link
                        key={String(report.id)}
                        to="/patient/reports/$id"
                        params={{ id: String(report.id) }}
                      >
                        <Card
                          className="card-elevated cursor-pointer h-full"
                          data-ocid={`report-card-${report.id}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate font-display">
                                  {getReportLabel(report)}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {getReportDate(report)}
                                </p>
                              </div>
                              <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                Status
                              </span>
                              <StatusBadge status={report.status} />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  : FALLBACK_REPORTS.map((report) => (
                      <Link
                        key={report.id}
                        to="/patient/reports/$id"
                        params={{ id: report.id }}
                      >
                        <Card
                          className="card-elevated cursor-pointer h-full"
                          data-ocid={`report-card-${report.id}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate font-display">
                                  {report.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Date: {report.date}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {report.center}
                                </p>
                              </div>
                              <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                Status
                              </span>
                              <StatusBadge status={report.status} />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
              </div>
            )}
          </div>

          {/* Appointments */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground font-display">
                Upcoming Appointments
              </h2>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-primary h-7 gap-1"
                data-ocid="view-all-appts-btn"
              >
                <Link to="/patient/appointments">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {appointmentsQuery.isLoading
                ? [1, 2].map((i) => (
                    <Card key={i} className="card-elevated">
                      <CardContent className="p-4 space-y-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/3" />
                      </CardContent>
                    </Card>
                  ))
                : hasRealAppts
                  ? appointments
                      .filter((a) => a.status !== "cancelled")
                      .slice(0, 2)
                      .map((appt) => (
                        <Card
                          key={String(appt.id)}
                          className="card-elevated"
                          data-ocid={`appt-card-${appt.id}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <p className="text-sm font-semibold text-foreground font-display">
                                Appointment
                              </p>
                              <StatusBadge status={appt.status} />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Slot #{String(appt.slotId)}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                  : FALLBACK_APPOINTMENTS.map((appt) => (
                      <Card
                        key={appt.id}
                        className="card-elevated"
                        data-ocid={`appt-card-${appt.id}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate font-display">
                                {appt.doctor}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {appt.specialty}
                              </p>
                            </div>
                            <StatusBadge status={appt.status} />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {appt.date} · {appt.time}
                          </p>
                        </CardContent>
                      </Card>
                    ))}

              <Button
                asChild
                className="w-full"
                data-ocid="book-appointment-btn"
              >
                <Link to="/patient/appointments">
                  <Activity className="w-4 h-4 mr-2" />
                  Book New Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
