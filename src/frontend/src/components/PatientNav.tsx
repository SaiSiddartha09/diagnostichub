import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Calendar, FileText, LayoutDashboard, User } from "lucide-react";

const NAV_ITEMS = [
  {
    to: "/patient" as const,
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    to: "/patient/reports" as const,
    label: "My Reports",
    icon: FileText,
    exact: false,
  },
  {
    to: "/patient/appointments" as const,
    label: "Appointments",
    icon: Calendar,
    exact: false,
  },
  {
    to: "/patient/profile" as const,
    label: "Profile",
    icon: User,
    exact: false,
  },
];

interface PatientNavProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export function PatientNav({ mobile = false, onNavigate }: PatientNavProps) {
  if (mobile) {
    return (
      <nav
        className="flex items-center justify-around bg-card border-t border-border px-2 py-1"
        data-ocid="patient-bottom-nav"
      >
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors min-w-0 text-muted-foreground hover:text-foreground"
            activeProps={{
              className:
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors min-w-0 text-primary bg-primary/10",
            }}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-1 p-3" data-ocid="patient-sidebar-nav">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
          activeProps={{
            className:
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors bg-primary text-primary-foreground shadow-sm",
          }}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
