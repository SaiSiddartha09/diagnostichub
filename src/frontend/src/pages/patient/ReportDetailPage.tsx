import type { DiagnosticReport, ReportType } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  Download,
  ExternalLink,
  FileText,
  MapPin,
} from "lucide-react";
import { useEffect } from "react";

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

// Fallback data keyed by string id
type FallbackReport = {
  id: string;
  title: string;
  typeLabel: string;
  date: string;
  center: string;
  status: string;
  notes: string;
  fileUrl?: string;
};

const FALLBACK_REPORTS: Record<string, FallbackReport> = {
  "1": {
    id: "1",
    title: "Full Body CT Scan",
    typeLabel: "CT Scan",
    date: "17 Mar 2026",
    center: "City Health Diagnostics, Downtown",
    status: "pending",
    notes:
      "Report is being processed by our radiologists. You will be notified once ready.",
  },
  "2": {
    id: "2",
    title: "MRI Brain Scan",
    typeLabel: "MRI",
    date: "10 Mar 2026",
    center: "City Health Diagnostics, Downtown",
    status: "uploaded",
    notes:
      "Report uploaded. Awaiting dispatch to your registered WhatsApp number.",
  },
  "3": {
    id: "3",
    title: "Chest X-Ray",
    typeLabel: "X-Ray",
    date: "02 Mar 2026",
    center: "City Health Diagnostics, Downtown",
    status: "sent",
    notes: "Report has been sent to your registered WhatsApp number.",
    fileUrl: "#",
  },
  "4": {
    id: "4",
    title: "Blood Panel CBC",
    typeLabel: "Blood Test",
    date: "22 Feb 2026",
    center: "City Health Diagnostics, Downtown",
    status: "viewed",
    notes:
      "All markers within normal range. CBC shows healthy white and red blood cell counts. Follow up with your physician in 3 months.",
    fileUrl: "#",
  },
};

export default function PatientReportDetailPage() {
  const { id } = useParams({ from: "/patient/reports/$id" });
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();

  const reportQuery = useQuery<DiagnosticReport | null>({
    queryKey: ["report", id],
    queryFn: async () => {
      if (!actor) return null;
      const bigId = BigInt(id);
      return actor.getReport(bigId);
    },
    enabled: !!actor && !actorLoading && /^\d+$/.test(id),
  });

  const markViewedMutation = useMutation({
    mutationFn: async () => {
      if (!actor) return;
      const bigId = BigInt(id);
      await actor.markReportViewed(bigId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report", id] });
      queryClient.invalidateQueries({ queryKey: ["myReports"] });
    },
  });

  const {
    isPending: markPending,
    isSuccess: markSuccess,
    mutate: markMutate,
  } = markViewedMutation;

  useEffect(() => {
    const backendReport = reportQuery.data;
    const fallback = FALLBACK_REPORTS[id];
    const status = backendReport?.status ?? fallback?.status;
    if (status === "sent" && !markPending && !markSuccess && !!actor) {
      markMutate();
    }
  }, [reportQuery.data, id, markPending, markSuccess, markMutate, actor]);

  const isLoading = reportQuery.isLoading;
  const backendReport = reportQuery.data;
  const fallback = FALLBACK_REPORTS[id] ?? FALLBACK_REPORTS["1"];

  // Unified display values
  const title = backendReport?.title ?? fallback.title;
  const typeLabel = backendReport
    ? getTypeLabel(backendReport.reportType)
    : fallback.typeLabel;
  const status = backendReport?.status ?? fallback.status;
  const notes =
    backendReport?.labNotes ?? backendReport?.adminNotes ?? fallback.notes;
  const fileUrl = backendReport?.fileBlob?.getDirectURL() ?? fallback.fileUrl;
  const dateStr = backendReport
    ? new Date(Number(backendReport.uploadedAt) / 1_000_000).toLocaleDateString(
        "en-GB",
        { day: "2-digit", month: "short", year: "numeric" },
      )
    : fallback.date;

  return (
    <Layout userRole="patient" userName={profile?.name ?? "Patient"}>
      <div className="space-y-6 max-w-2xl">
        {/* Back */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            data-ocid="back-btn"
          >
            <Link to="/patient/reports">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground font-display">
              Report Details
            </h1>
            <p className="text-xs text-muted-foreground">
              Diagnostic report summary
            </p>
          </div>
        </div>

        {isLoading ? (
          <Card className="card-elevated">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="card-elevated" data-ocid="report-detail-card">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-display">
                        {title}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {typeLabel}
                      </Badge>
                    </div>
                  </div>
                  <StatusBadge status={status} />
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 bg-muted/30 rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                        Date
                      </p>
                      <p className="text-sm text-foreground">{dateStr}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-muted/30 rounded-lg p-3">
                    <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                        Center
                      </p>
                      <p className="text-sm text-foreground truncate">
                        City Health Diagnostics
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {notes && (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Lab / Admin Notes
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {notes}
                    </p>
                  </div>
                )}

                {/* Status banner */}
                {(status === "pending" || status === "uploaded") && (
                  <div className="flex items-start gap-3 bg-warning/5 border border-warning/20 rounded-lg p-4">
                    <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {status === "pending"
                          ? "Report Processing"
                          : "Awaiting Dispatch"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {status === "pending"
                          ? "Your report is being processed. You'll be notified when it's ready."
                          : "Your report is ready and will be sent to your WhatsApp number soon."}
                      </p>
                    </div>
                  </div>
                )}

                {/* PDF section */}
                {(status === "sent" || status === "viewed") && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 p-4">
                      <div className="w-10 h-12 bg-destructive/10 rounded flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {title}.pdf
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF Document
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1 gap-2"
                        asChild
                        data-ocid="download-report-btn"
                      >
                        <a
                          href={fileUrl ?? "#"}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </a>
                      </Button>
                      {fileUrl && fileUrl !== "#" && (
                        <Button
                          variant="outline"
                          className="flex-1 gap-2"
                          asChild
                          data-ocid="view-report-btn"
                        >
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Online
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <p className="text-[11px] text-muted-foreground text-center leading-relaxed px-4">
              This report is for informational purposes only. Always consult a
              qualified healthcare professional for medical advice, diagnosis,
              or treatment.
            </p>
          </>
        )}
      </div>
    </Layout>
  );
}
