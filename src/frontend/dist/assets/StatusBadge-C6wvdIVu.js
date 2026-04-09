import { j as jsxRuntimeExports } from "./index-BwdZZcZ7.js";
const STATUS_MAP = {
  pending: { label: "Pending", className: "status-pending" },
  uploaded: { label: "Uploaded", className: "status-uploaded" },
  sent: { label: "Sent", className: "status-sent" },
  viewed: { label: "Viewed", className: "status-viewed" },
  confirmed: { label: "Confirmed", className: "status-viewed" },
  cancelled: { label: "Cancelled", className: "status-pending" }
};
function StatusBadge({ status, className = "" }) {
  const config = STATUS_MAP[status.toLowerCase()] ?? {
    label: status,
    className: "status-pending"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `${config.className} ${className}`,
      "data-ocid": "status-badge",
      children: config.label
    }
  );
}
export {
  StatusBadge as S
};
