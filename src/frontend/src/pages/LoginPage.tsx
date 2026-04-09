import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Activity, Loader2, Phone, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const { login, loginStatus, isLoginSuccess } = useInternetIdentity();
  const { role, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"patient" | "admin">("patient");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  // Redirect after successful login based on role
  useEffect(() => {
    if (isLoginSuccess && !authLoading) {
      if (role === "admin") {
        navigate({ to: "/admin" });
      } else if (role === "patient" || role === "guest") {
        // guest means logged in but no special role → patient portal
        navigate({ to: "/patient" });
      }
    }
  }, [isLoginSuccess, authLoading, role, navigate]);

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    try {
      setIsLogging(true);
      await login();
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLogging(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword.trim()) {
      toast.error("Please enter your credentials");
      return;
    }
    try {
      setIsLogging(true);
      await login();
    } catch {
      toast.error("Admin login failed. Please try again.");
    } finally {
      setIsLogging(false);
    }
  };

  const isLoading = isLogging || loginStatus === "logging-in" || authLoading;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <Activity className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground font-display leading-tight">
              City Health
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Diagnostics
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-display">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Sign in to access your health portal
            </p>
          </div>

          <Card className="shadow-lg border-border" data-ocid="login-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-display">Sign In</CardTitle>
              <CardDescription>
                Choose your account type to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "patient" | "admin")}
                className="w-full"
              >
                <TabsList
                  className="grid w-full grid-cols-2 mb-6"
                  data-ocid="login-tabs"
                >
                  <TabsTrigger
                    value="patient"
                    className="gap-2"
                    data-ocid="patient-tab"
                  >
                    <Phone className="w-4 h-4" />
                    Patient
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="gap-2"
                    data-ocid="admin-tab"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                {/* Patient Tab */}
                <TabsContent value="patient">
                  <form onSubmit={handlePatientLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="input-field"
                        data-ocid="phone-input"
                        autoComplete="tel"
                      />
                      <p className="text-xs text-muted-foreground">
                        We'll verify your identity securely
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                      data-ocid="patient-login-btn"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in…
                        </>
                      ) : (
                        "Sign in as Patient"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Admin Tab */}
                <TabsContent value="admin">
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="admin-email"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@cityhealth.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="input-field"
                        data-ocid="admin-email-input"
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="admin-password"
                        className="text-sm font-medium"
                      >
                        Password
                      </Label>
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="••••••••"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="input-field"
                        data-ocid="admin-password-input"
                        autoComplete="current-password"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                      data-ocid="admin-login-btn"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in…
                        </>
                      ) : (
                        "Sign in as Admin"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Your data is protected with end-to-end encryption. <br />
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
