import type { PatientProfile } from "@/backend.d";
import { Gender } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Edit3,
  Hash,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ProfileForm = {
  name: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  address: string;
};

const DEFAULT_FORM: ProfileForm = {
  name: "Alex Johnson",
  phone: "+1 (555) 987-6543",
  email: "alex.johnson@email.com",
  dateOfBirth: "1990-08-08",
  address: "123 Health Street, Medical District",
};

function FieldDisplay({
  icon,
  label,
  value,
}: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </Label>
      <div className="flex items-center gap-2.5 py-2.5 px-3 bg-muted/30 rounded-lg">
        <span className="text-muted-foreground flex-shrink-0">{icon}</span>
        <span className="text-sm text-foreground break-words min-w-0">
          {value || "—"}
        </span>
      </div>
    </div>
  );
}

export default function PatientProfilePage() {
  const { profile: authProfile, principalId } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<ProfileForm>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Partial<ProfileForm>>({});

  const profileQuery = useQuery<PatientProfile | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !actorLoading,
  });

  useEffect(() => {
    const data = profileQuery.data;
    if (data) {
      setForm({
        name: data.name || DEFAULT_FORM.name,
        phone: data.phone || DEFAULT_FORM.phone,
        email: data.email ?? DEFAULT_FORM.email,
        dateOfBirth: data.dateOfBirth ?? DEFAULT_FORM.dateOfBirth,
        address: data.address ?? DEFAULT_FORM.address,
      });
    } else if (authProfile?.name) {
      setForm((f) => ({ ...f, name: authProfile.name }));
    }
  }, [profileQuery.data, authProfile]);

  const saveMutation = useMutation({
    mutationFn: async (updated: ProfileForm) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveMyProfile({
        name: updated.name,
        phone: updated.phone,
        email: updated.email || undefined,
        dateOfBirth: updated.dateOfBirth || undefined,
        address: updated.address || undefined,
        gender: Gender.other,
      });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      setEditing(false);
      setErrors({});
    },
    onError: () => {
      toast.error("Failed to update profile. Please try again.");
    },
  });

  const validate = (): boolean => {
    const errs: Partial<ProfileForm> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    saveMutation.mutate(form);
  };

  const handleCancel = () => {
    setEditing(false);
    setErrors({});
    const data = profileQuery.data;
    if (data) {
      setForm({
        name: data.name || DEFAULT_FORM.name,
        phone: data.phone || DEFAULT_FORM.phone,
        email: data.email ?? DEFAULT_FORM.email,
        dateOfBirth: data.dateOfBirth ?? DEFAULT_FORM.dateOfBirth,
        address: data.address ?? DEFAULT_FORM.address,
      });
    }
  };

  const setField = (key: keyof ProfileForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const isLoading = profileQuery.isLoading;

  return (
    <Layout userRole="patient" userName={form.name}>
      <div className="space-y-6 max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display">
              My Profile
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your personal information
            </p>
          </div>
          {!editing ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setEditing(true)}
              data-ocid="edit-profile-btn"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                data-ocid="cancel-edit-btn"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="gap-2"
                disabled={saveMutation.isPending}
                onClick={handleSave}
                data-ocid="save-profile-btn"
              >
                <Save className="w-4 h-4" />
                {saveMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          )}
        </div>

        <Card className="card-elevated" data-ocid="profile-card">
          <CardHeader className="pb-4">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base font-display truncate">
                    {form.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {form.phone}
                  </p>
                  {principalId && (
                    <p className="text-[10px] text-muted-foreground mt-0.5 font-mono truncate max-w-[200px]">
                      {principalId.slice(0, 20)}…
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-5">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ) : editing ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.name ? "border-destructive" : ""}
                    data-ocid="profile-name-input"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={errors.phone ? "border-destructive" : ""}
                    data-ocid="profile-phone-input"
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="your@email.com"
                    className={errors.email ? "border-destructive" : ""}
                    data-ocid="profile-email-input"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <Label
                    htmlFor="dob"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => setField("dateOfBirth", e.target.value)}
                    data-ocid="profile-dob-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="address"
                    className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => setField("address", e.target.value)}
                    placeholder="123 Health Street, City"
                    data-ocid="profile-address-input"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <FieldDisplay
                  icon={<User className="w-4 h-4" />}
                  label="Full Name"
                  value={form.name}
                />
                <FieldDisplay
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone Number"
                  value={form.phone}
                />
                <FieldDisplay
                  icon={<Mail className="w-4 h-4" />}
                  label="Email Address"
                  value={form.email}
                />
                <Separator />
                <FieldDisplay
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date of Birth"
                  value={form.dateOfBirth}
                />
                <FieldDisplay
                  icon={<Hash className="w-4 h-4" />}
                  label="Medical ID"
                  value="MID-20101233329"
                />
                <FieldDisplay
                  icon={<MapPin className="w-4 h-4" />}
                  label="Address"
                  value={form.address}
                />
              </div>
            )}

            {!editing && (
              <div className="flex items-center gap-2.5 pt-2 border-t border-border">
                <ShieldCheck className="w-4 h-4 text-success flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Your data is securely stored on the Internet Computer
                  blockchain.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
