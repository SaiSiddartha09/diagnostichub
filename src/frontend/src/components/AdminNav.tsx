import { Link } from "@tanstack/react-router";
import {
  CalendarClock,
  FileText,
  LayoutDashboard,
  Stethoscope,
  Users,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/patients" as const, label: "Patients", icon: Users },
  { to: "/admin/reports" as const, label: "Reports", icon: FileText },
  { to: "/admin/doctors" as const, label: "Doctors", icon: Stethoscope },
  {
    to: "/admin/appointments" as const,
    label: "Appointments",
    icon: CalendarClock,
  },
];

interface AdminNavProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export function AdminNav({ mobile = false, onNavigate }: AdminNavProps) {
  if (mobile) {
    return (
      <nav
        className="flex items-center justify-around bg-card border-t border-border px-1 py-1"
        data-ocid="admin-bottom-nav"
      >
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-xs font-medium transition-colors min-w-0 text-muted-foreground hover:text-foreground"
            activeProps={{
              className:
                "flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-xs font-medium transition-colors min-w-0 text-primary bg-primary/10",
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
    <nav className="flex flex-col gap-1 p-3" data-ocid="admin-sidebar-nav">
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
