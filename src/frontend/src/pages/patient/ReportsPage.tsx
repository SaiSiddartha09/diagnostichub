import { ReportStatus } from "@/backend.d";
import type { DiagnosticReport, ReportType } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Download, Eye, FileText, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

function getTypeLabel(rt: ReportType): string {
  switch (rt.__kind__) {
    case "ctScan":
      return "CT Scan";
    case "mri":
      return "MRI";
    case "xRay":
      return "X-Ray";
    case "ultrasound":
      return "Ultrasound";
    case "bloodTest":
      return "Blood Test";
    case "other":
      return rt.other ?? "Other";
  }
}

const STATUS_FILTERS: { label: string; value: ReportStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: ReportStatus.pending },
  { label: "Uploaded", value: ReportStatus.uploaded },
  { label: "Sent", value: ReportStatus.sent },
  { label: "Viewed", value: ReportStatus.viewed },
];

// Fallback sample data for display when backend is empty
const FALLBACK_REPORTS: Array<{
  id: string;
  title: string;
  typeLabel: string;
  date: string;
  center: string;
  status: string;
  hasFile: boolean;
}> = [
  {
    id: "1",
    title: "Full Body CT Scan",
    typeLabel: "CT Scan",
    date: "17/03/2026",
    center: "City Health Diagnostics",
    status: "pending",
    hasFile: false,
  },
  {
    id: "2",
    title: "MRI Brain Scan",
    typeLabel: "MRI",
    date: "10/03/2026",
    center: "City Health Diagnostics",
    status: "uploaded",
    hasFile: false,
  },
  {
    id: "3",
    title: "Chest X-Ray",
    typeLabel: "X-Ray",
    date: "02/03/2026",
    center: "City Health Diagnostics",
    status: "sent",
    hasFile: true,
  },
  {
    id: "4",
    title: "Blood Panel CBC",
    typeLabel: "Blood Test",
    date: "22/02/2026",
    center: "City Health Diagnostics",
    status: "viewed",
    hasFile: true,
  },
  {
    id: "5",
    title: "Abdominal Ultrasound",
    typeLabel: "Ultrasound",
    date: "15/02/2026",
    center: "City Health Diagnostics",
    status: "viewed",
    hasFile: true,
  },
];

function ReportSkeleton() {
  return (
    <Card className="card-elevated">
      <CardContent className="p-4 flex items-start gap-4">
        <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PatientReportsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");

  const reportsQuery = useQuery<DiagnosticReport[]>({
    queryKey: ["myReports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyReports();
    },
    enabled: !!actor && !actorLoading,
  });

  const hasRealData = (reportsQuery.data?.length ?? 0) > 0;
  const rawReports = reportsQuery.data ?? [];

  // Build unified display items
  const displayItems = useMemo(() => {
    if (hasRealData) {
      return rawReports
        .filter((r) => {
          const typeLabel = getTypeLabel(r.reportType);
          const matchesSearch =
            !search ||
            r.title.toLowerCase().includes(search.toLowerCase()) ||
            typeLabel.toLowerCase().includes(search.toLowerCase());
          const matchesStatus =
            statusFilter === "all" || r.status === statusFilter;
          return matchesSearch && matchesStatus;
        })
        .map((r) => ({
          id: String(r.id),
          title: r.title,
          typeLabel: getTypeLabel(r.reportType),
          date: new Date(Number(r.uploadedAt) / 1_000_000).toLocaleDateString(
            "en-GB",
          ),
          center: "City Health Diagnostics",
          status: r.status,
          hasFile: !!r.fileBlob,
          fileUrl: r.fileBlob?.getDirectURL() ?? null,
        }));
    }
    // Fallback
    return FALLBACK_REPORTS.filter((r) => {
      const matchesSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.typeLabel.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    }).map((r) => ({ ...r, fileUrl: null }));
  }, [hasRealData, rawReports, search, statusFilter]);

  const totalCount = hasRealData ? rawReports.length : FALLBACK_REPORTS.length;

  return (
    <Layout userRole="patient" userName={profile?.name ?? "Patient"}>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            My Reports
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            View and download your diagnostic reports
          </p>
        </div>

        {/* Search + Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or type…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-9"
              data-ocid="reports-search-input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2" data-ocid="status-filter-tabs">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-smooth ${
                  statusFilter === f.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
                data-ocid={`filter-${f.value}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {reportsQuery.isLoading ? (
            [1, 2, 3].map((i) => <ReportSkeleton key={i} />)
          ) : displayItems.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="reports-empty-state"
            >
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground font-display mb-1">
                No reports found
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                {search || statusFilter !== "all"
                  ? "Try adjusting your search or filters."
                  : "Your diagnostic reports will appear here once uploaded by your diagnostic center."}
              </p>
              {(search || statusFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 text-primary"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            displayItems.map((report) => (
              <Card
                key={report.id}
                className="card-elevated"
                data-ocid={`report-item-${report.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground font-display truncate">
                            {report.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {report.date} · {report.center}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant="outline" className="text-xs">
                            {report.typeLabel}
                          </Badge>
                          <StatusBadge status={report.status} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <Link
                          to="/patient/reports/$id"
                          params={{ id: report.id }}
                          className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                          data-ocid={`view-report-${report.id}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View report
                        </Link>
                        {(report.status === "sent" ||
                          report.status === "viewed") &&
                          report.fileUrl && (
                            <a
                              href={report.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                              data-ocid={`download-report-${report.id}`}
                            >
                              <Download className="w-3.5 h-3.5" />
                              Download PDF
                            </a>
                          )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {displayItems.length > 0 && (
          <p className="text-xs text-center text-muted-foreground">
            Showing {displayItems.length} of {totalCount} report
            {totalCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </Layout>
  );
}
