import type {
  PatientProfile as BackendPatient,
  DiagnosticReport,
  ReportStatus,
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
// ReportStatus is used as a value (enum), not just a type
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { FileText, Filter, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const REPORT_TYPE_LABELS: Record<string, string> = {
  ctScan: "CT Scan",
  mri: "MRI",
  xRay: "X-Ray",
  ultrasound: "Ultrasound",
  bloodTest: "Blood Test",
  other: "Other",
};

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminReportsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: reports, isLoading } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => (actor ? actor.listAllReports() : []),
    enabled: !!actor && !actorLoading,
  });

  const { data: patients } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => (actor ? actor.listAllPatients() : []),
    enabled: !!actor && !actorLoading,
  });

  const patientMap = new Map<string, string>(
    (patients ?? []).map((p: BackendPatient) => [p.id.toString(), p.name]),
  );

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteReport(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      toast.success("Report deleted");
    },
    onError: () => toast.error("Failed to delete report"),
  });

  const statusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: ReportStatus }) => {
      if (!actor) throw new Error("No actor");
      await actor.setReportStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      toast.success("Status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const filtered = (reports ?? []).filter(
    (r: DiagnosticReport) =>
      statusFilter === "all" || r.status === statusFilter,
  );

  return (
    <Layout userRole="admin" userName={profile?.name}>
      <div className="space-y-5 max-w-screen-xl" data-ocid="admin-reports-page">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Reports
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {reports?.length ?? 0} total reports
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className="w-36 h-9 text-sm"
                  data-ocid="status-filter"
                >
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="uploaded">Uploaded</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="viewed">Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Link to="/admin/reports/upload">
              <Button
                size="sm"
                className="gap-2 h-9"
                data-ocid="upload-report-btn"
              >
                <Plus className="w-4 h-4" />
                Upload Report
              </Button>
            </Link>
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
              data-ocid="reports-empty-state"
            >
              <FileText className="w-10 h-10 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">
                {statusFilter !== "all"
                  ? "No reports with this status"
                  : "No reports yet"}
              </p>
              <Link to="/admin/reports/upload">
                <Button size="sm" variant="outline">
                  Upload first report
                </Button>
              </Link>
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
                        Report Title
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Type
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Date
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
                    {filtered.map((r: DiagnosticReport) => (
                      <tr
                        key={r.id.toString()}
                        className="hover:bg-muted/20 transition-colors"
                        data-ocid="report-row"
                      >
                        <td className="px-5 py-3.5">
                          <Link
                            to="/admin/patients/$id"
                            params={{ id: r.patientId.toString() }}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {patientMap.get(r.patientId.toString()) ??
                              `${r.patientId.toString().slice(0, 10)}…`}
                          </Link>
                        </td>
                        <td className="px-5 py-3.5 text-foreground max-w-[180px] truncate">
                          {r.title}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground text-xs">
                          {REPORT_TYPE_LABELS[r.reportType.__kind__] ??
                            r.reportType.__kind__}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground text-xs whitespace-nowrap">
                          {formatDate(r.uploadedAt)}
                        </td>
                        <td className="px-5 py-3.5">
                          <Select
                            value={r.status}
                            onValueChange={(v) =>
                              statusMutation.mutate({
                                id: r.id,
                                status: v as ReportStatus,
                              })
                            }
                          >
                            <SelectTrigger
                              className="h-auto w-auto border-0 bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden"
                              data-ocid="status-select"
                            >
                              <StatusBadge status={r.status} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="uploaded">Uploaded</SelectItem>
                              <SelectItem value="sent">Sent</SelectItem>
                              <SelectItem value="viewed">Viewed</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                data-ocid="delete-report-btn"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Report
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Delete report <strong>"{r.title}"</strong>?
                                  This cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMutation.mutate(r.id)}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-border">
                {filtered.map((r: DiagnosticReport) => (
                  <div
                    key={r.id.toString()}
                    className="px-4 py-4 space-y-2"
                    data-ocid="report-row-mobile"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {r.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {patientMap.get(r.patientId.toString()) ?? "Unknown"}{" "}
                          · {REPORT_TYPE_LABELS[r.reportType.__kind__]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(r.uploadedAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <StatusBadge status={r.status} />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Report</AlertDialogTitle>
                              <AlertDialogDescription>
                                Delete "{r.title}"?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(r.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <Select
                      value={r.status}
                      onValueChange={(v) =>
                        statusMutation.mutate({
                          id: r.id,
                          status: v as ReportStatus,
                        })
                      }
                    >
                      <SelectTrigger
                        className="h-8 w-full text-xs"
                        data-ocid="status-select-mobile"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="uploaded">Uploaded</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="viewed">Viewed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </>
          )}

          {!isLoading && filtered.length > 0 && (
            <CardHeader className="border-t border-border bg-muted/20 py-2 px-5">
              <p className="text-xs text-muted-foreground">
                Showing {filtered.length} of {reports?.length ?? 0} reports
              </p>
            </CardHeader>
          )}
        </Card>
      </div>
    </Layout>
  );
}
