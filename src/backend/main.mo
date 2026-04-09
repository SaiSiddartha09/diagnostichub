import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import PatientsMixin "mixins/patients-api";
import ReportsMixin "mixins/reports-api";
import DoctorsMixin "mixins/doctors-api";
import AppointmentsMixin "mixins/appointments-api";
import PatientTypes "types/patients";
import ReportTypes "types/reports";
import DoctorTypes "types/doctors";
import AppointmentTypes "types/appointments";
import Common "types/common";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage infrastructure
  include MixinObjectStorage();

  // Patient profiles: Principal → PatientProfile
  let patientProfiles = Map.empty<Common.UserId, PatientTypes.PatientProfile>();

  // Diagnostic reports
  let reports = Map.empty<Common.ReportId, ReportTypes.DiagnosticReport>();
  let reportCounter = { var nextId : Common.ReportId = 0 };

  // Doctors and availability slots
  let doctors = Map.empty<Common.DoctorId, DoctorTypes.Doctor>();
  let slots = Map.empty<Common.SlotId, DoctorTypes.AvailabilitySlot>();
  let doctorCounter = { var nextDoctorId : Common.DoctorId = 0 };
  let slotCounter = { var nextSlotId : Common.SlotId = 0 };

  // Appointments
  let appointments = Map.empty<Common.AppointmentId, AppointmentTypes.Appointment>();
  let appointmentCounter = { var nextAppointmentId : Common.AppointmentId = 0 };

  // Domain mixins
  include PatientsMixin(accessControlState, patientProfiles);
  include ReportsMixin(accessControlState, reports, reportCounter);
  include DoctorsMixin(accessControlState, doctors, slots, doctorCounter, slotCounter);
  include AppointmentsMixin(accessControlState, appointments, slots, appointmentCounter);
};
