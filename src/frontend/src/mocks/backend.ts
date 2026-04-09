import type { backendInterface, _ImmutableObjectStorageRefillInformation } from "../backend";
import {
  AppointmentStatus,
  Gender,
  ReportStatus,
  UserRole,
} from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = {
  toString: () => "2vxsx-fae",
  toText: () => "2vxsx-fae",
  toUint8Array: () => new Uint8Array([0]),
  compareTo: () => "eq" as const,
  isAnonymous: () => false,
  toHex: () => "00",
  toJSON: () => "2vxsx-fae",
  _isPrincipal: true,
} as unknown as Principal;

const mockPrincipal2 = {
  toString: () => "3xwpq-ziaaa",
  toText: () => "3xwpq-ziaaa",
  toUint8Array: () => new Uint8Array([1]),
  compareTo: () => "eq" as const,
  isAnonymous: () => false,
  toHex: () => "01",
  toJSON: () => "3xwpq-ziaaa",
  _isPrincipal: true,
} as unknown as Principal;

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  addDoctorSlot: async (input) => ({
    id: BigInt(1),
    doctorId: input.doctorId,
    startTime: input.startTime,
    endTime: input.endTime,
    date: input.date,
    isBooked: false,
  }),

  adminCancelAppointment: async () => null,

  assignCallerUserRole: async () => undefined,

  bookAppointment: async (input) => ({
    id: BigInt(1),
    status: AppointmentStatus.pending,
    doctorId: input.doctorId,
    bookedAt: now,
    patientId: mockPrincipal,
    slotId: input.slotId,
    notes: input.notes,
  }),

  cancelMyAppointment: async () => null,

  confirmAppointment: async () => null,

  createDoctor: async (input) => ({
    id: BigInt(1),
    name: input.name,
    specialization: input.specialization,
    clinicName: input.clinicName,
    clinicAddress: input.clinicAddress,
    phone: input.phone,
    email: input.email,
    bio: input.bio,
  }),

  createReport: async (input) => ({
    id: BigInt(1),
    status: ReportStatus.pending,
    title: input.title,
    patientId: input.patientId,
    labNotes: input.labNotes,
    fileBlob: input.fileBlob,
    reportType: input.reportType,
    thumbnailBlob: input.thumbnailBlob,
    adminNotes: input.adminNotes,
    uploadedAt: now,
  }),

  deleteDoctor: async () => undefined,

  deletePatient: async () => undefined,

  deleteReport: async () => undefined,

  getCallerUserRole: async () => UserRole.user,

  getDoctor: async () => ({
    id: BigInt(1),
    name: "Dr. Sarah Mitchell",
    specialization: "Radiology",
    clinicName: "City Radiology Center",
    clinicAddress: "123 Medical Blvd, Downtown",
    phone: "+1-555-0100",
    email: "dr.mitchell@cityradiology.com",
    bio: "Board-certified radiologist with 15 years of experience in diagnostic imaging.",
  }),

  getDoctorSlots: async () => [
    { id: BigInt(1), doctorId: BigInt(1), startTime: "09:00", endTime: "09:30", date: "2026-04-15", isBooked: false },
    { id: BigInt(2), doctorId: BigInt(1), startTime: "10:00", endTime: "10:30", date: "2026-04-15", isBooked: false },
    { id: BigInt(3), doctorId: BigInt(1), startTime: "14:00", endTime: "14:30", date: "2026-04-16", isBooked: true },
  ],

  getMyProfile: async () => ({
    id: mockPrincipal,
    name: "Alex Johnson",
    phone: "+1-555-0199",
    email: "alex.johnson@email.com",
    dateOfBirth: "1985-06-15",
    gender: Gender.male,
    address: "456 Oak Street, Springfield",
    createdAt: now,
  }),

  getPatientProfile: async () => ({
    id: mockPrincipal2,
    name: "Maria Garcia",
    phone: "+1-555-0201",
    email: "maria.garcia@email.com",
    dateOfBirth: "1990-03-22",
    gender: Gender.female,
    address: "789 Elm Avenue, Downtown",
    createdAt: now,
  }),

  getReport: async () => ({
    id: BigInt(1),
    status: ReportStatus.uploaded,
    title: "Chest CT Scan",
    patientId: mockPrincipal,
    labNotes: "No abnormalities detected in the lung fields.",
    reportType: { __kind__: "ctScan", ctScan: null },
    uploadedAt: now,
  }),

  isCallerAdmin: async () => false,

  listAllAppointments: async () => [
    {
      id: BigInt(1),
      status: AppointmentStatus.confirmed,
      doctorId: BigInt(1),
      bookedAt: now,
      patientId: mockPrincipal,
      slotId: BigInt(1),
      notes: "Follow-up for CT scan results",
    },
    {
      id: BigInt(2),
      status: AppointmentStatus.pending,
      doctorId: BigInt(2),
      bookedAt: now,
      patientId: mockPrincipal2,
      slotId: BigInt(4),
      notes: "Initial consultation",
    },
  ],

  listAllPatients: async () => [
    {
      id: mockPrincipal,
      name: "Alex Johnson",
      phone: "+1-555-0199",
      email: "alex.johnson@email.com",
      dateOfBirth: "1985-06-15",
      gender: Gender.male,
      address: "456 Oak Street, Springfield",
      createdAt: now,
    },
    {
      id: mockPrincipal2,
      name: "Maria Garcia",
      phone: "+1-555-0201",
      email: "maria.garcia@email.com",
      dateOfBirth: "1990-03-22",
      gender: Gender.female,
      address: "789 Elm Avenue, Downtown",
      createdAt: now - BigInt(86400000000000),
    },
    {
      id: mockPrincipal,
      name: "Robert Chen",
      phone: "+1-555-0312",
      email: "robert.chen@email.com",
      dateOfBirth: "1978-11-08",
      gender: Gender.male,
      address: "321 Pine Road, Westside",
      createdAt: now - BigInt(172800000000000),
    },
  ],

  listAllReports: async () => [
    {
      id: BigInt(1),
      status: ReportStatus.pending,
      title: "Chest X-Ray",
      patientId: mockPrincipal,
      reportType: { __kind__: "xRay", xRay: null },
      uploadedAt: now,
    },
    {
      id: BigInt(2),
      status: ReportStatus.uploaded,
      title: "MRI Brain Scan",
      patientId: mockPrincipal2,
      reportType: { __kind__: "mri", mri: null },
      labNotes: "Clear scan with no abnormalities.",
      uploadedAt: now - BigInt(86400000000000),
    },
    {
      id: BigInt(3),
      status: ReportStatus.sent,
      title: "Blood Panel",
      patientId: mockPrincipal,
      reportType: { __kind__: "bloodTest", bloodTest: null },
      uploadedAt: now - BigInt(172800000000000),
    },
    {
      id: BigInt(4),
      status: ReportStatus.viewed,
      title: "Abdominal Ultrasound",
      patientId: mockPrincipal2,
      reportType: { __kind__: "ultrasound", ultrasound: null },
      labNotes: "Normal liver and kidney findings.",
      uploadedAt: now - BigInt(259200000000000),
    },
  ],

  listDoctors: async () => [
    {
      id: BigInt(1),
      name: "Dr. Sarah Mitchell",
      specialization: "Radiology",
      clinicName: "City Radiology Center",
      clinicAddress: "123 Medical Blvd, Downtown",
      phone: "+1-555-0100",
      email: "dr.mitchell@cityradiology.com",
      bio: "Board-certified radiologist with 15 years of experience.",
    },
    {
      id: BigInt(2),
      name: "Dr. James Park",
      specialization: "Cardiology",
      clinicName: "Heart & Vascular Institute",
      clinicAddress: "456 Health Way, Midtown",
      phone: "+1-555-0200",
      email: "dr.park@heartinstitute.com",
      bio: "Interventional cardiologist specializing in non-invasive diagnostics.",
    },
    {
      id: BigInt(3),
      name: "Dr. Priya Sharma",
      specialization: "Neurology",
      clinicName: "NeuroHealth Clinic",
      clinicAddress: "789 Brain St, Uptown",
      phone: "+1-555-0300",
      email: "dr.sharma@neurohealth.com",
      bio: "Neurologist with expertise in MRI interpretation and brain disorders.",
    },
  ],

  listMyAppointments: async () => [
    {
      id: BigInt(1),
      status: AppointmentStatus.confirmed,
      doctorId: BigInt(1),
      bookedAt: now,
      patientId: mockPrincipal,
      slotId: BigInt(1),
      notes: "Follow-up for CT scan results",
    },
    {
      id: BigInt(2),
      status: AppointmentStatus.pending,
      doctorId: BigInt(2),
      bookedAt: now,
      patientId: mockPrincipal,
      slotId: BigInt(2),
    },
  ],

  listMyReports: async () => [
    {
      id: BigInt(1),
      status: ReportStatus.pending,
      title: "Chest X-Ray",
      patientId: mockPrincipal,
      reportType: { __kind__: "xRay", xRay: null },
      uploadedAt: now,
    },
    {
      id: BigInt(2),
      status: ReportStatus.uploaded,
      title: "MRI Brain Scan",
      patientId: mockPrincipal,
      reportType: { __kind__: "mri", mri: null },
      labNotes: "Clear scan with no abnormalities.",
      uploadedAt: now - BigInt(86400000000000),
    },
    {
      id: BigInt(3),
      status: ReportStatus.sent,
      title: "Blood Panel",
      patientId: mockPrincipal,
      reportType: { __kind__: "bloodTest", bloodTest: null },
      uploadedAt: now - BigInt(172800000000000),
    },
    {
      id: BigInt(4),
      status: ReportStatus.viewed,
      title: "Abdominal Ultrasound",
      patientId: mockPrincipal,
      reportType: { __kind__: "ultrasound", ultrasound: null },
      labNotes: "Normal liver and kidney findings.",
      uploadedAt: now - BigInt(259200000000000),
    },
  ],

  markReportViewed: async () => null,

  removeDoctorSlot: async () => undefined,

  saveMyProfile: async (input) => ({
    id: mockPrincipal,
    name: input.name,
    phone: input.phone,
    email: input.email,
    dateOfBirth: input.dateOfBirth,
    gender: input.gender,
    address: input.address,
    createdAt: now,
  }),

  setReportStatus: async () => null,

  updateDoctor: async () => null,

  updateReport: async () => null,

  _immutableObjectStorageBlobsAreLive: async (_hashes: Array<Uint8Array>) => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs: Array<Uint8Array>) => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash: string) => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_info: _ImmutableObjectStorageRefillInformation | null) => ({ success: true, topped_up_amount: BigInt(0) }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
};
