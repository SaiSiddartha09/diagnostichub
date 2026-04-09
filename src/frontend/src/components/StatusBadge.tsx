import type { ReportStatus } from "@/types";

interface StatusBadgeProps {
  status: ReportStatus | string;
  className?: string;
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "status-pending" },
  uploaded: { label: "Uploaded", className: "status-uploaded" },
  sent: { label: "Sent", className: "status-sent" },
  viewed: { label: "Viewed", className: "status-viewed" },
  confirmed: { label: "Confirmed", className: "status-viewed" },
  cancelled: { label: "Cancelled", className: "status-pending" },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = STATUS_MAP[status.toLowerCase()] ?? {
    label: status,
    className: "status-pending",
  };

  return (
    <span
      className={`${config.className} ${className}`}
      data-ocid="status-badge"
    >
      {config.label}
    </span>
  );
}
