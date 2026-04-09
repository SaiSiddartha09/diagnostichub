import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import type { UserRole } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Activity, Bell, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { AdminNav } from "./AdminNav";
import { PatientNav } from "./PatientNav";

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  userName?: string;
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
        <Activity className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground font-display leading-tight truncate">
          City Health
        </p>
        <p className="text-[10px] text-muted-foreground leading-tight truncate">
          Diagnostics
        </p>
      </div>
    </div>
  );
}

function UserMenu({
  userName,
  onLogout,
}: { userName?: string; onLogout: () => void }) {
  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 h-9"
          data-ocid="user-menu-trigger"
        >
          <Avatar className="w-7 h-7">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:block text-sm font-medium text-foreground max-w-[100px] truncate">
            {userName ?? "User"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-foreground truncate">
            {userName ?? "User"}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive focus:text-destructive"
          data-ocid="logout-btn"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Layout({ children, userRole, userName }: LayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    router.navigate({ to: "/login" });
  };

  const NavComponent = userRole === "admin" ? AdminNav : PatientNav;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40 flex-shrink-0">
        <div className="flex items-center justify-between h-14 px-4 max-w-screen-2xl mx-auto w-full">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 flex-shrink-0"
                    aria-label="Open menu"
                    data-ocid="menu-trigger"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="flex items-center gap-2.5 p-4 border-b border-border">
                    <Logo />
                  </div>
                  <NavComponent onNavigate={() => setSidebarOpen(false)} />
                </SheetContent>
              </Sheet>
            )}
            <Logo />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 relative"
              aria-label="Notifications"
              data-ocid="notifications-btn"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <UserMenu userName={userName} onLogout={handleLogout} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-screen-2xl mx-auto w-full">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside
            className="w-56 flex-shrink-0 bg-card border-r border-border flex flex-col min-h-0"
            data-ocid="sidebar"
          >
            <div className="flex-1 overflow-y-auto">
              <NavComponent />
            </div>
            <div className="p-4 border-t border-border">
              <p className="text-[10px] text-muted-foreground text-center">
                © {new Date().getFullYear()}{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main
          className="flex-1 overflow-y-auto min-w-0"
          data-ocid="main-content"
        >
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <div className="flex-shrink-0 bg-card border-t border-border">
          <NavComponent mobile />
          <p className="text-[10px] text-muted-foreground text-center pb-2 pt-1">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with caffeine.ai
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
