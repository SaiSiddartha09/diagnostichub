import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import AppointmentsLib "../lib/appointments";
import DoctorsLib "../lib/doctors";
import Types "../types/appointments";
import DoctorTypes "../types/doctors";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  appointments : Map.Map<Common.AppointmentId, Types.Appointment>,
  slots : Map.Map<Common.SlotId, DoctorTypes.AvailabilitySlot>,
  appointmentCounter : { var nextAppointmentId : Common.AppointmentId },
) {
  /// Patient: book an appointment with a doctor.
  public shared ({ caller }) func bookAppointment(input : Types.AppointmentInput) : async Types.Appointment {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let booked = DoctorsLib.bookSlot(slots, input.slotId);
    if (not booked) {
      Runtime.trap("Slot is not available or does not exist");
    };
    AppointmentsLib.bookAppointment(appointments, appointmentCounter, caller, input);
  };

  /// Patient: cancel their own appointment.
  public shared ({ caller }) func cancelMyAppointment(id : Common.AppointmentId) : async ?Types.Appointment {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = AppointmentsLib.cancelAppointment(appointments, id, caller, false);
    switch (result) {
      case null null;
      case (?appt) {
        DoctorsLib.releaseSlot(slots, appt.slotId);
        ?appt;
      };
    };
  };

  /// Patient: list their own appointments.
  public query ({ caller }) func listMyAppointments() : async [Types.Appointment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    AppointmentsLib.listByPatient(appointments, caller);
  };

  /// Admin: list all appointments.
  public query ({ caller }) func listAllAppointments() : async [Types.Appointment] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all appointments");
    };
    AppointmentsLib.listAll(appointments);
  };

  /// Admin: confirm an appointment.
  public shared ({ caller }) func confirmAppointment(id : Common.AppointmentId) : async ?Types.Appointment {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can confirm appointments");
    };
    AppointmentsLib.confirmAppointment(appointments, id);
  };

  /// Admin: cancel any appointment.
  public shared ({ caller }) func adminCancelAppointment(id : Common.AppointmentId) : async ?Types.Appointment {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can cancel any appointment");
    };
    let result = AppointmentsLib.cancelAppointment(appointments, id, caller, true);
    switch (result) {
      case null null;
      case (?appt) {
        DoctorsLib.releaseSlot(slots, appt.slotId);
        ?appt;
      };
    };
  };
};
