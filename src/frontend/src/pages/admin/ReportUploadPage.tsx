import { ExternalBlob } from "@/backend";
import type { PatientProfile as BackendPatient } from "@/backend.d";
import type { ReportType } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const REPORT_TYPES: { value: string; label: string }[] = [
  { value: "ctScan", label: "CT Scan" },
  { value: "mri", label: "MRI" },
  { value: "xRay", label: "X-Ray" },
  { value: "ultrasound", label: "Ultrasound" },
  { value: "bloodTest", label: "Blood Test" },
  { value: "other", label: "Other" },
];

function buildReportType(kind: string): ReportType {
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

interface UploadedFile {
  file: File;
  name: string;
}

function FileDropzone({
  label,
  accept,
  icon: Icon,
  uploaded,
  onUpload,
  onClear,
  ocid,
}: {
  label: string;
  accept: string;
  icon: React.ElementType;
  uploaded: UploadedFile | null;
  onUpload: (f: File) => void;
  onClear: () => void;
  ocid: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Label className="text-sm font-medium mb-2 block">{label}</Label>
      {uploaded ? (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-success/40 bg-success/5">
          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
          <span className="text-sm text-foreground truncate flex-1">
            {uploaded.name}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground flex-shrink-0"
            onClick={onClear}
            aria-label="Remove file"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="w-full border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-6 flex flex-col items-center gap-2 transition-colors cursor-pointer bg-muted/20 hover:bg-muted/40"
          data-ocid={ocid}
        >
          <Icon className="w-8 h-8 text-muted-foreground/60" />
          <p className="text-sm text-muted-foreground">Click to upload</p>
          <p className="text-xs text-muted-foreground/60">
            {accept.replace(/,/g, ", ")}
          </p>
        </button>
      )}
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUpload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export default function AdminReportUploadPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState("");
  const [labNotes, setLabNotes] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [reportFile, setReportFile] = useState<UploadedFile | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<UploadedFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data: patients, isLoading: patientsLoading } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => (actor ? actor.listAllPatients() : []),
    enabled: !!actor && !actorLoading,
  });

  const filteredPatients = (patients ?? [])
    .filter(
      (p: BackendPatient) =>
        p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        p.phone.includes(patientSearch),
    )
    .slice(0, 30);

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const { Principal } = await import("@icp-sdk/core/principal");

      let fileBlob: ExternalBlob | undefined;
      let thumbnailBlob: ExternalBlob | undefined;

      if (reportFile) {
        const bytes = new Uint8Array(await reportFile.file.arrayBuffer());
        fileBlob =
          ExternalBlob.fromBytes(bytes).withUploadProgress(setUploadProgress);
      }
      if (thumbnailFile) {
        const bytes = new Uint8Array(await thumbnailFile.file.arrayBuffer());
        thumbnailBlob = ExternalBlob.fromBytes(bytes);
      }

      return actor.createReport({
        patientId: Principal.fromText(patientId),
        title: title.trim(),
        reportType: buildReportType(reportType),
        labNotes: labNotes.trim() || undefined,
        adminNotes: adminNotes.trim() || undefined,
        fileBlob,
        thumbnailBlob,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      toast.success("Report uploaded successfully");
      navigate({ to: "/admin/reports" });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to upload report");
    },
  });

  const isValid = patientId && title.trim() && reportType;

  return (
    <Layout userRole="admin" userName={profile?.name}>
      <div className="space-y-6 max-w-2xl" data-ocid="report-upload-page">
        <div className="flex items-center gap-3">
          <Link to="/admin/reports">
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
            <h1 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Report
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new diagnostic report for a patient
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isValid) return;
            uploadMutation.mutate();
          }}
          className="space-y-5"
        >
          {/* Patient Selection */}
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground">
                Select Patient
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Search patient by name or phone…"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="mb-2"
                data-ocid="patient-search-input"
              />
              {patientsLoading ? (
                <div className="flex items-center justify-center py-4">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (
                <Select value={patientId} onValueChange={setPatientId}>
                  <SelectTrigger className="w-full" data-ocid="patient-select">
                    <SelectValue placeholder="Select patient…" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {filteredPatients.map((p: BackendPatient) => (
                      <SelectItem key={p.id.toString()} value={p.id.toString()}>
                        {p.name} — {p.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {patientId && (
                <p className="text-xs text-success flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Patient selected
                </p>
              )}
            </CardContent>
          </Card>

          {/* Report Details */}
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Report Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="report-title" className="text-sm font-medium">
                  Report Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="report-title"
                  placeholder="e.g. Full Body CT Scan – Aug 2025"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  data-ocid="report-title-input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="report-type" className="text-sm font-medium">
                  Report Type <span className="text-destructive">*</span>
                </Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger
                    id="report-type"
                    data-ocid="report-type-select"
                  >
                    <SelectValue placeholder="Select report type…" />
                  </SelectTrigger>
                  <SelectContent>
                    {REPORT_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lab-notes" className="text-sm font-medium">
                  Lab Notes
                </Label>
                <Textarea
                  id="lab-notes"
                  placeholder="Technical findings, measurements, diagnostic notes…"
                  value={labNotes}
                  onChange={(e) => setLabNotes(e.target.value)}
                  rows={3}
                  data-ocid="lab-notes-input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admin-notes" className="text-sm font-medium">
                  Admin Notes
                </Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Internal notes, follow-up instructions…"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={2}
                  data-ocid="admin-notes-input"
                />
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" />
                Files
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileDropzone
                label="Report File (PDF or Image)"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                icon={FileText}
                uploaded={reportFile}
                onUpload={(f) => setReportFile({ file: f, name: f.name })}
                onClear={() => setReportFile(null)}
                ocid="report-file-upload"
              />
              <FileDropzone
                label="Thumbnail (Optional)"
                accept=".jpg,.jpeg,.png,.webp"
                icon={ImageIcon}
                uploaded={thumbnailFile}
                onUpload={(f) => setThumbnailFile({ file: f, name: f.name })}
                onClear={() => setThumbnailFile(null)}
                ocid="thumbnail-upload"
              />

              {uploadMutation.isPending && uploadProgress > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Uploading…</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3 pb-6">
            <Link to="/admin/reports">
              <Button
                type="button"
                variant="outline"
                disabled={uploadMutation.isPending}
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={!isValid || uploadMutation.isPending}
              className="gap-2 min-w-28"
              data-ocid="submit-upload-btn"
            >
              {uploadMutation.isPending ? (
                <>
                  <LoadingSpinner size="sm" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Report
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
