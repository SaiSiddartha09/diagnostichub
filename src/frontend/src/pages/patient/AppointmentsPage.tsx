import type { Appointment, AvailabilitySlot, Doctor } from "@/backend.d";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useBackend } from "@/hooks/use-backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  CalendarX2,
  Clock,
  MapPin,
  Phone,
  Search,
  Star,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type TabKey = "book" | "my";

type SampleDoctor = Doctor & {
  slots: string[];
  ratingDisplay: number;
  distanceKm: number;
};

const FALLBACK_DOCTORS: SampleDoctor[] = [
  {
    id: 1n,
    name: "Dr. Sarah Chen",
    specialization: "Radiologist",
    clinicName: "Downtown Medical Center",
    clinicAddress: "123 Main St, Downtown",
    phone: "+1 (555) 123-4567",
    slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:30 PM"],
    ratingDisplay: 4.9,
    distanceKm: 0.8,
  },
  {
    id: 2n,
    name: "Dr. Michael Park",
    specialization: "Cardiologist",
    clinicName: "City Heart Institute",
    clinicAddress: "456 Heart Ave",
    phone: "+1 (555) 234-5678",
    slots: ["10:00 AM", "1:00 PM", "3:00 PM"],
    ratingDisplay: 4.8,
    distanceKm: 1.2,
  },
  {
    id: 3n,
    name: "Dr. Priya Sharma",
    specialization: "Neurologist",
    clinicName: "NeuroCare Clinic",
    clinicAddress: "789 Brain Blvd",
    phone: "+1 (555) 345-6789",
    slots: ["9:30 AM", "12:00 PM", "5:00 PM"],
    ratingDisplay: 4.7,
    distanceKm: 2.1,
  },
  {
    id: 4n,
    name: "Dr. James Okafor",
    specialization: "Pulmonologist",
    clinicName: "Breath & Lung Center",
    clinicAddress: "321 Lung Lane",
    phone: "+1 (555) 456-7890",
    slots: ["8:30 AM", "11:30 AM", "3:30 PM"],
    ratingDisplay: 4.6,
    distanceKm: 2.8,
  },
];

type FallbackAppt = {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
};
const FALLBACK_APPOINTMENTS: FallbackAppt[] = [
  {
    id: "a1",
    doctorName: "Dr. Sarah Chen",
    specialty: "Radiologist",
    date: "Fri, Apr 11, 2026",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "a2",
    doctorName: "Dr. Michael Park",
    specialty: "Cardiologist",
    date: "Mon, Apr 14, 2026",
    time: "2:30 PM",
    status: "pending",
  },
];

function DoctorSkeleton() {
  return (
    <Card className="card-elevated">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-3 w-3/4" />
      </CardContent>
    </Card>
  );
}

export default function PatientAppointmentsPage() {
  const { profile } = useAuth();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabKey>("book");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<bigint | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const doctorsQuery = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDoctors(null);
    },
    enabled: !!actor && !actorLoading,
  });

  const appointmentsQuery = useQuery<Appointment[]>({
    queryKey: ["myAppointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyAppointments();
    },
    enabled: !!actor && !actorLoading,
  });

  // Build doctor lookup map for resolving names in "My Bookings"
  const doctorMapQuery = useQuery<Record<string, string>>({
    queryKey: ["doctorMap"],
    queryFn: async () => {
      if (!actor) return {};
      const docs = await actor.listDoctors(null);
      return Object.fromEntries(docs.map((d) => [String(d.id), d.name]));
    },
    enabled: !!actor && !actorLoading,
  });

  // Build slot lookup map { slotId → "date · startTime" }
  const slotMapQuery = useQuery<Record<string, string>>({
    queryKey: ["allSlotsMap"],
    queryFn: async () => {
      if (!actor) return {};
      const appts = await actor.listMyAppointments();
      const uniqueDoctorIds = [...new Set(appts.map((a) => a.doctorId))];
      const slotEntries: [string, string][] = [];
      await Promise.all(
        uniqueDoctorIds.map(async (docId) => {
          const slots = await actor.getDoctorSlots(docId);
          for (const s of slots) {
            slotEntries.push([String(s.id), `${s.date} · ${s.startTime}`]);
          }
        }),
      );
      return Object.fromEntries(slotEntries);
    },
    enabled: !!actor && !actorLoading,
  });

  const doctorMap = doctorMapQuery.data ?? {};
  const slotMap = slotMapQuery.data ?? {};

  const slotsQuery = useQuery<AvailabilitySlot[]>({
    queryKey: ["doctorSlots", String(selectedDoctorId)],
    queryFn: async () => {
      if (!actor || !selectedDoctorId) return [];
      return actor.getDoctorSlots(selectedDoctorId);
    },
    enabled: !!actor && !actorLoading && !!selectedDoctorId,
  });

  const bookMutation = useMutation({
    mutationFn: async ({
      doctorId,
      slotId,
    }: { doctorId: bigint; slotId: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.bookAppointment({ doctorId, slotId });
    },
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      queryClient.invalidateQueries({ queryKey: ["myAppointments"] });
      setSelectedDoctorId(null);
      setSelectedSlot(null);
      setActiveTab("my");
    },
    onError: () => {
      toast.error("Failed to book appointment. Please try again.");
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (appointmentId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.cancelMyAppointment(appointmentId);
    },
    onSuccess: () => {
      toast.success("Appointment cancelled.");
      queryClient.invalidateQueries({ queryKey: ["myAppointments"] });
    },
    onError: () => {
      toast.error("Failed to cancel appointment.");
    },
  });

  const hasRealDoctors = (doctorsQuery.data?.length ?? 0) > 0;
  const hasRealAppts = (appointmentsQuery.data?.length ?? 0) > 0;

  const rawDoctors: SampleDoctor[] = hasRealDoctors
    ? (doctorsQuery.data ?? []).map((d) => ({
        ...d,
        slots: [],
        ratingDisplay: 0,
        distanceKm: 0,
      }))
    : FALLBACK_DOCTORS;

  const filteredDoctors = rawDoctors.filter(
    (d) =>
      !doctorSearch ||
      d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      d.specialization.toLowerCase().includes(doctorSearch.toLowerCase()),
  );

  const selectedDoctor = rawDoctors.find((d) => d.id === selectedDoctorId);

  const availableSlotTimes: string[] =
    (slotsQuery.data?.filter((s) => !s.isBooked).map((s) => s.startTime) ?? [])
      .length > 0
      ? slotsQuery.data!.filter((s) => !s.isBooked).map((s) => s.startTime)
      : (selectedDoctor?.slots ?? []);

  const slotIdForTime = (time: string): bigint | null => {
    if (!slotsQuery.data) return null;
    const slot = slotsQuery.data.find(
      (s) => s.startTime === time && !s.isBooked,
    );
    return slot?.id ?? null;
  };

  const handleBook = () => {
    if (!selectedDoctorId || !selectedSlot) {
      toast.error("Please select a doctor and time slot");
      return;
    }
    if (hasRealDoctors) {
      const slotId = slotIdForTime(selectedSlot);
      if (!slotId) {
        toast.error("Slot no longer available.");
        return;
      }
      bookMutation.mutate({ doctorId: selectedDoctorId, slotId });
    } else {
      toast.success("Appointment booked successfully! (Demo mode)");
      setSelectedDoctorId(null);
      setSelectedSlot(null);
      setActiveTab("my");
    }
  };

  return (
    <Layout userRole="patient" userName={profile?.name ?? "Patient"}>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Appointments
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Book and manage your doctor appointments
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 bg-muted/40 rounded-xl p-1 w-fit"
          data-ocid="appointments-tabs"
        >
          {(["book", "my"] as TabKey[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-smooth ${
                activeTab === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`tab-${tab}`}
            >
              {tab === "book" ? "Book New" : "My Bookings"}
            </button>
          ))}
        </div>

        {/* Book New */}
        {activeTab === "book" && (
          <div className="space-y-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors by name or specialization…"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                className="pl-9"
                data-ocid="doctor-search-input"
              />
            </div>

            <div className="space-y-3">
              {doctorsQuery.isLoading ? (
                [1, 2, 3].map((i) => <DoctorSkeleton key={i} />)
              ) : filteredDoctors.length === 0 ? (
                <div className="py-12 text-center">
                  <Stethoscope className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No doctors found matching your search.
                  </p>
                </div>
              ) : (
                filteredDoctors.map((doc) => (
                  <Card
                    key={String(doc.id)}
                    className={`card-elevated cursor-pointer transition-smooth ${selectedDoctorId === doc.id ? "ring-2 ring-primary border-primary" : ""}`}
                    onClick={() => {
                      setSelectedDoctorId(doc.id);
                      setSelectedSlot(null);
                    }}
                    data-ocid={`doctor-card-${doc.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Stethoscope className="w-5 h-5 text-accent" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground font-display">
                              {doc.name}
                            </p>
                            <Badge variant="outline" className="text-xs mt-0.5">
                              {doc.specialization}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {doc.ratingDisplay > 0 && (
                            <div className="flex items-center gap-1 text-xs justify-end">
                              <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                              <span className="font-medium text-foreground">
                                {doc.ratingDisplay}
                              </span>
                            </div>
                          )}
                          {doc.distanceKm > 0 && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {doc.distanceKm} km
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {doc.clinicName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          {doc.phone}
                        </span>
                      </div>

                      {/* Slots panel */}
                      {selectedDoctorId === doc.id && (
                        <div className="pt-3 border-t border-border">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
                            Available Slots
                          </p>
                          {slotsQuery.isLoading ? (
                            <div className="flex gap-2">
                              {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-8 w-20" />
                              ))}
                            </div>
                          ) : availableSlotTimes.length === 0 ? (
                            <p className="text-xs text-muted-foreground">
                              No available slots at this time.
                            </p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {availableSlotTimes.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedSlot(slot);
                                  }}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-smooth ${
                                    selectedSlot === slot
                                      ? "bg-primary text-primary-foreground border-primary"
                                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                                  }`}
                                  data-ocid={`slot-${doc.id}-${slot.replace(/\s/g, "-")}`}
                                >
                                  <Clock className="w-3 h-3" />
                                  {slot}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <Button
              className="w-full gap-2"
              disabled={
                !selectedDoctorId || !selectedSlot || bookMutation.isPending
              }
              onClick={handleBook}
              data-ocid="book-appointment-submit-btn"
            >
              <Calendar className="w-4 h-4" />
              {bookMutation.isPending
                ? "Booking…"
                : selectedDoctorId && selectedSlot
                  ? `Book with ${selectedDoctor?.name ?? "doctor"} at ${selectedSlot}`
                  : "Select a doctor and slot to book"}
            </Button>
          </div>
        )}

        {/* My Bookings */}
        {activeTab === "my" && (
          <div className="space-y-3">
            {appointmentsQuery.isLoading ? (
              [1, 2].map((i) => (
                <Card key={i} className="card-elevated">
                  <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : !hasRealAppts ? (
              /* Fallback appointments or empty state */
              FALLBACK_APPOINTMENTS.length > 0 ? (
                FALLBACK_APPOINTMENTS.map((appt) => (
                  <Card
                    key={appt.id}
                    className="card-elevated"
                    data-ocid={`appt-item-${appt.id}`}
                  >
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Stethoscope className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground font-display truncate">
                            {appt.doctorName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {appt.specialty}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {appt.date} · {appt.time}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={appt.status} />
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  data-ocid="appointments-empty-state"
                >
                  <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-4">
                    <CalendarX2 className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground font-display mb-1">
                    No appointments yet
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs mb-4">
                    Book your first appointment with a specialist doctor nearby.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setActiveTab("book")}
                    data-ocid="book-first-appt-btn"
                  >
                    Book an Appointment
                  </Button>
                </div>
              )
            ) : (
              (appointmentsQuery.data ?? []).map((appt) => (
                <Card
                  key={String(appt.id)}
                  className="card-elevated"
                  data-ocid={`appt-item-${appt.id}`}
                >
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground font-display truncate">
                          {doctorMap[String(appt.doctorId)] ??
                            `Doctor #${String(appt.doctorId)}`}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {slotMap[String(appt.slotId)] ??
                            `Slot #${String(appt.slotId)}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={appt.status} />
                      {appt.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive border-destructive/30 h-7 text-xs hover:bg-destructive/5"
                          disabled={cancelMutation.isPending}
                          onClick={() => cancelMutation.mutate(appt.id)}
                          data-ocid={`cancel-appt-${appt.id}`}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
