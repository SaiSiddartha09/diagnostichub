import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface ReportInput {
    title: string;
    patientId: UserId;
    labNotes?: string;
    fileBlob?: ExternalBlob;
    reportType: ReportType;
    thumbnailBlob?: ExternalBlob;
    adminNotes?: string;
}
export type SlotId = bigint;
export type DoctorId = bigint;
export interface SlotInput {
    startTime: string;
    doctorId: DoctorId;
    endTime: string;
    date: string;
}
export interface PatientProfileInput {
    dateOfBirth?: string;
    name: string;
    email?: string;
    address?: string;
    gender?: Gender;
    phone: string;
}
export interface DoctorInput {
    bio?: string;
    clinicAddress: string;
    name: string;
    email?: string;
    specialization: string;
    phone: string;
    clinicName: string;
}
export type ReportType = {
    __kind__: "mri";
    mri: null;
} | {
    __kind__: "bloodTest";
    bloodTest: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "xRay";
    xRay: null;
} | {
    __kind__: "ctScan";
    ctScan: null;
} | {
    __kind__: "ultrasound";
    ultrasound: null;
};
export interface AvailabilitySlot {
    id: SlotId;
    startTime: string;
    doctorId: DoctorId;
    endTime: string;
    date: string;
    isBooked: boolean;
}
export type UserId = Principal;
export type ReportId = bigint;
export interface DiagnosticReport {
    id: ReportId;
    status: ReportStatus;
    title: string;
    patientId: UserId;
    labNotes?: string;
    fileBlob?: ExternalBlob;
    reportType: ReportType;
    thumbnailBlob?: ExternalBlob;
    adminNotes?: string;
    uploadedAt: Timestamp;
}
export type AppointmentId = bigint;
export interface ReportUpdate {
    status?: ReportStatus;
    title?: string;
    labNotes?: string;
    fileBlob?: ExternalBlob;
    reportType?: ReportType;
    thumbnailBlob?: ExternalBlob;
    adminNotes?: string;
}
export interface PatientProfile {
    id: UserId;
    dateOfBirth?: string;
    name: string;
    createdAt: Timestamp;
    email?: string;
    address?: string;
    gender?: Gender;
    phone: string;
}
export interface Doctor {
    id: DoctorId;
    bio?: string;
    clinicAddress: string;
    name: string;
    email?: string;
    specialization: string;
    phone: string;
    clinicName: string;
}
export interface Appointment {
    id: AppointmentId;
    status: AppointmentStatus;
    doctorId: DoctorId;
    bookedAt: Timestamp;
    patientId: UserId;
    slotId: SlotId;
    notes?: string;
}
export interface AppointmentInput {
    doctorId: DoctorId;
    slotId: SlotId;
    notes?: string;
}
export enum AppointmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum Gender {
    other = "other",
    female = "female",
    male = "male"
}
export enum ReportStatus {
    pending = "pending",
    sent = "sent",
    uploaded = "uploaded",
    viewed = "viewed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDoctorSlot(input: SlotInput): Promise<AvailabilitySlot>;
    adminCancelAppointment(id: AppointmentId): Promise<Appointment | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(input: AppointmentInput): Promise<Appointment>;
    cancelMyAppointment(id: AppointmentId): Promise<Appointment | null>;
    confirmAppointment(id: AppointmentId): Promise<Appointment | null>;
    createDoctor(input: DoctorInput): Promise<Doctor>;
    createReport(input: ReportInput): Promise<DiagnosticReport>;
    deleteDoctor(id: DoctorId): Promise<void>;
    deletePatient(patientId: UserId): Promise<void>;
    deleteReport(id: ReportId): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getDoctor(id: DoctorId): Promise<Doctor | null>;
    getDoctorSlots(doctorId: DoctorId): Promise<Array<AvailabilitySlot>>;
    getMyProfile(): Promise<PatientProfile | null>;
    getPatientProfile(patientId: UserId): Promise<PatientProfile | null>;
    getReport(id: ReportId): Promise<DiagnosticReport | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllAppointments(): Promise<Array<Appointment>>;
    listAllPatients(): Promise<Array<PatientProfile>>;
    listAllReports(): Promise<Array<DiagnosticReport>>;
    listDoctors(specialization: string | null): Promise<Array<Doctor>>;
    listMyAppointments(): Promise<Array<Appointment>>;
    listMyReports(): Promise<Array<DiagnosticReport>>;
    markReportViewed(id: ReportId): Promise<DiagnosticReport | null>;
    removeDoctorSlot(slotId: SlotId): Promise<void>;
    saveMyProfile(input: PatientProfileInput): Promise<PatientProfile>;
    setReportStatus(id: ReportId, status: ReportStatus): Promise<DiagnosticReport | null>;
    updateDoctor(id: DoctorId, input: DoctorInput): Promise<Doctor | null>;
    updateReport(id: ReportId, update: ReportUpdate): Promise<DiagnosticReport | null>;
}
