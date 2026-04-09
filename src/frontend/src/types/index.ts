export type ReportStatus = "pending" | "uploaded" | "sent" | "viewed";
export type ReportType =
  | "CT_SCAN"
  | "MRI"
  | "XRAY"
  | "ULTRASOUND"
  | "BLOOD_TEST"
  | "OTHER";
export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export interface PatientProfile {
  id: string;
  name: string;
  phone: string;
  dateOfBirth?: string;
  medicalId?: string;
  email?: string;
  address?: string;
  createdAt: number;
}

export interface DiagnosticReport {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  reportType: ReportType;
  status: ReportStatus;
  fileUrl?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
  diagnosticCenter: string;
}

export interface AvailabilitySlot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  bio?: string;
  rating?: number;
  imageUrl?: string;
  distance?: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: number;
}

export type UserRole = "patient" | "admin" | "guest";

export interface AuthUser {
  principal: string;
  role: UserRole;
  profile?: PatientProfile;
}
