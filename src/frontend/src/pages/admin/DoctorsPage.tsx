import type { AvailabilitySlot, Doctor, DoctorInput } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Edit2,
  MapPin,
  Phone,
  Plus,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DoctorFormData {
  name: string;
  specialization: string;
  phone: string;
  email: string;
  clinicName: string;
  clinicAddress: string;
  bio: string;
}

const EMPTY_FORM: DoctorFormData = {
  name: "",
  specialization: "",
  phone: "",
  email: "",
  clinicName: "",
  clinicAddress: "",
  bio: "",
};

function DoctorFormDialog({
  open,
  onClose,
  onSubmit,
  initial,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DoctorFormData) => void;
  initial?: DoctorFormData;
  loading?: boolean;
}) {
  const [form, setForm] = useState<DoctorFormData>(initial ?? EMPTY_FORM);
  const set =
    (key: keyof DoctorFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {initial ? "Edit Doctor" : "Add New Doctor"}
          </DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4 mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="doc-name">Full Name *</Label>
              <Input
                id="doc-name"
                value={form.name}
                onChange={set("name")}
                required
                data-ocid="doctor-name-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="doc-spec">Specialization *</Label>
              <Input
                id="doc-spec"
                value={form.specialization}
                onChange={set("specialization")}
                required
                placeholder="e.g. Radiologist"
                data-ocid="doctor-spec-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="doc-phone">Phone *</Label>
              <Input
                id="doc-phone"
                value={form.phone}
                onChange={set("phone")}
                required
                type="tel"
                data-ocid="doctor-phone-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="doc-email">Email</Label>
              <Input
                id="doc-email"
                value={form.email}
                onChange={set("email")}
                type="email"
                data-ocid="doctor-email-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="doc-clinic">Clinic Name *</Label>
              <Input
                id="doc-clinic"
                value={form.clinicName}
                onChange={set("clinicName")}
                required
                data-ocid="doctor-clinic-input"
              />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="doc-addr">Clinic Address *</Label>
              <Input
                id="doc-addr"
                value={form.clinicAddress}
                onChange={set("clinicAddress")}
                required
                data-ocid="doctor-addr-input"
              />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="doc-bio">Bio</Label>
              <Textarea
                id="doc-bio"
                value={form.bio}
                onChange={set("bio")}
                rows={3}
                placeholder="Professional background…"
                data-ocid="doctor-bio-input"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              data-ocid="doctor-submit-btn"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : initial ? (
                "Save Changes"
              ) : (
                "Add Doctor"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface SlotFormState {
  date: string;
  startTime: string;
  endTime: string;
}

function DoctorRow({
  doctor,
  onEdit,
  onDelete,
}: {
  doctor: Doctor;
  onEdit: (d: Doctor) => void;
  onDelete: (id: bigint) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [slotForm, setSlotForm] = useState<SlotFormState>({
    date: "",
    startTime: "",
    endTime: "",
  });
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();

  const { data: slots, isLoading: slotsLoading } = useQuery({
    queryKey: ["doctor-slots", doctor.id.toString()],
    queryFn: async () => (actor ? actor.getDoctorSlots(doctor.id) : []),
    enabled: expanded && !!actor && !actorLoading,
  });

  const addSlotMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.addDoctorSlot({
        doctorId: doctor.id,
        date: slotForm.date,
        startTime: slotForm.startTime,
        endTime: slotForm.endTime,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-slots", doctor.id.toString()],
      });
      setSlotForm({ date: "", startTime: "", endTime: "" });
      toast.success("Slot added");
    },
    onError: () => toast.error("Failed to add slot"),
  });

  const removeSlotMutation = useMutation({
    mutationFn: async (slotId: bigint) => {
      if (!actor) throw new Error("No actor");
      await actor.removeDoctorSlot(slotId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctor-slots", doctor.id.toString()],
      });
      toast.success("Slot removed");
    },
    onError: () => toast.error("Failed to remove slot"),
  });

  return (
    <div
      className="border-b border-border last:border-0"
      data-ocid="doctor-row"
    >
      <div className="flex items-center gap-3 px-5 py-4 hover:bg-muted/20 transition-colors">
        <div className="flex-1 min-w-0 grid sm:grid-cols-4 gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {doctor.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {doctor.specialization}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{doctor.phone}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground col-span-2">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">
              {doctor.clinicName}, {doctor.clinicAddress}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setExpanded((e) => !e)}
            aria-label={expanded ? "Collapse" : "Expand"}
            data-ocid="expand-doctor-btn"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onEdit(doctor)}
            aria-label="Edit doctor"
            data-ocid="edit-doctor-btn"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:bg-destructive/10"
                aria-label="Delete doctor"
                data-ocid="delete-doctor-btn"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Doctor</AlertDialogTitle>
                <AlertDialogDescription>
                  Delete <strong>{doctor.name}</strong>? All slots will also be
                  removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(doctor.id)}
                  className="bg-destructive text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Expanded Slots */}
      {expanded && (
        <div className="bg-muted/20 border-t border-border px-5 py-4 space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
            <Clock className="w-3 h-3" /> Availability Slots
          </p>
          {slotsLoading ? (
            <LoadingSpinner size="sm" />
          ) : !slots || slots.length === 0 ? (
            <p className="text-xs text-muted-foreground">No slots added yet</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(slots as AvailabilitySlot[]).map((slot) => (
                <div
                  key={slot.id.toString()}
                  className="flex items-center gap-2 bg-card border border-border rounded-md px-3 py-2 text-xs"
                  data-ocid="slot-item"
                >
                  <span className="font-medium text-foreground">
                    {slot.date}
                  </span>
                  <span className="text-muted-foreground">
                    {slot.startTime}–{slot.endTime}
                  </span>
                  {slot.isBooked && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] py-0 px-1"
                    >
                      Booked
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 text-destructive hover:bg-destructive/10 ml-1"
                    onClick={() => removeSlotMutation.mutate(slot.id)}
                    disabled={slot.isBooked}
                    aria-label="Remove slot"
                    data-ocid="remove-slot-btn"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add Slot Form */}
          <form
            className="flex flex-wrap items-end gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              addSlotMutation.mutate();
            }}
          >
            <div className="space-y-1">
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                value={slotForm.date}
                onChange={(e) =>
                  setSlotForm((s) => ({ ...s, date: e.target.value }))
                }
                className="h-8 text-xs w-36"
                required
                data-ocid="slot-date-input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Start Time</Label>
              <Input
                type="time"
                value={slotForm.startTime}
                onChange={(e) =>
                  setSlotForm((s) => ({ ...s, startTime: e.target.value }))
                }
                className="h-8 text-xs w-28"
                required
                data-ocid="slot-start-input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">End Time</Label>
              <Input
                type="time"
                value={slotForm.endTime}
                onChange={(e) =>
                  setSlotForm((s) => ({ ...s, endTime: e.target.value }))
                }
                className="h-8 text-xs w-28"
                required
                data-ocid="slot-end-input"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="h-8 gap-1 text-xs"
              disabled={addSlotMutation.isPending}
              data-ocid="add-slot-btn"
            >
              {addSlotMutation.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  Add Slot
                </>
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function AdminDoctorsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const { data: doctors, isLoading } = useQuery({
    queryKey: ["admin-doctors"],
    queryFn: async () => (actor ? actor.listDoctors(null) : []),
    enabled: !!actor && !actorLoading,
  });

  const addMutation = useMutation({
    mutationFn: async (data: DoctorFormData) => {
      if (!actor) throw new Error("No actor");
      const input: DoctorInput = {
        name: data.name,
        specialization: data.specialization,
        phone: data.phone,
        email: data.email || undefined,
        clinicName: data.clinicName,
        clinicAddress: data.clinicAddress,
        bio: data.bio || undefined,
      };
      return actor.createDoctor(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      setDialogOpen(false);
      toast.success("Doctor added");
    },
    onError: () => toast.error("Failed to add doctor"),
  });

  const editMutation = useMutation({
    mutationFn: async ({ id, data }: { id: bigint; data: DoctorFormData }) => {
      if (!actor) throw new Error("No actor");
      const input: DoctorInput = {
        name: data.name,
        specialization: data.specialization,
        phone: data.phone,
        email: data.email || undefined,
        clinicName: data.clinicName,
        clinicAddress: data.clinicAddress,
        bio: data.bio || undefined,
      };
      return actor.updateDoctor(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      setEditingDoctor(null);
      toast.success("Doctor updated");
    },
    onError: () => toast.error("Failed to update doctor"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteDoctor(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-doctors"] });
      toast.success("Doctor deleted");
    },
    onError: () => toast.error("Failed to delete doctor"),
  });

  const editInitial = editingDoctor
    ? {
        name: editingDoctor.name,
        specialization: editingDoctor.specialization,
        phone: editingDoctor.phone,
        email: editingDoctor.email ?? "",
        clinicName: editingDoctor.clinicName,
        clinicAddress: editingDoctor.clinicAddress,
        bio: editingDoctor.bio ?? "",
      }
    : undefined;

  return (
    <Layout userRole="admin" userName={profile?.name}>
      <div className="space-y-5 max-w-screen-xl" data-ocid="admin-doctors-page">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-primary" />
              Doctors
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {doctors?.length ?? 0} doctors registered
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="gap-2"
            data-ocid="add-doctor-btn"
          >
            <Plus className="w-4 h-4" />
            Add Doctor
          </Button>
        </div>

        <Card className="card-elevated overflow-hidden">
          <CardHeader className="border-b border-border bg-muted/40 py-2.5 px-5 hidden sm:block">
            <div className="grid grid-cols-4 gap-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Name / Spec
              </p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Phone
              </p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide col-span-2">
                Clinic
              </p>
            </div>
          </CardHeader>

          {isLoading || actorLoading ? (
            <CardContent className="flex items-center justify-center py-16">
              <LoadingSpinner />
            </CardContent>
          ) : !doctors || doctors.length === 0 ? (
            <CardContent
              className="flex flex-col items-center justify-center py-16 gap-3"
              data-ocid="doctors-empty-state"
            >
              <Stethoscope className="w-10 h-10 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No doctors yet</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDialogOpen(true)}
              >
                Add first doctor
              </Button>
            </CardContent>
          ) : (
            <div>
              {(doctors as Doctor[]).map((doctor) => (
                <DoctorRow
                  key={doctor.id.toString()}
                  doctor={doctor}
                  onEdit={(d) => setEditingDoctor(d)}
                  onDelete={(id) => deleteMutation.mutate(id)}
                />
              ))}
            </div>
          )}
        </Card>
      </div>

      <DoctorFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={(data) => addMutation.mutate(data)}
        loading={addMutation.isPending}
      />
      <DoctorFormDialog
        open={!!editingDoctor}
        onClose={() => setEditingDoctor(null)}
        onSubmit={(data) =>
          editingDoctor && editMutation.mutate({ id: editingDoctor.id, data })
        }
        initial={editInitial}
        loading={editMutation.isPending}
      />
    </Layout>
  );
}
