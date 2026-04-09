import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/appointments";
import Common "../types/common";

module {
  public func bookAppointment(
    appointments : Map.Map<Common.AppointmentId, Types.Appointment>,
    counter : { var nextAppointmentId : Common.AppointmentId },
    patientId : Common.UserId,
    input : Types.AppointmentInput,
  ) : Types.Appointment {
    let id = counter.nextAppointmentId;
    counter.nextAppointmentId += 1;
    let appointment : Types.Appointment = {
      id;
      patientId;
      doctorId = input.doctorId;
      slotId = input.slotId;
      status = #pending;
      bookedAt = Time.now();
      notes = input.notes;
    };
    appointments.add(id, appointment);
    appointment;
  };

  public func cancelAppointment(
    appointments : Map.Map<Common.AppointmentId, Types.Appointment>,
    id : Common.AppointmentId,
    callerId : Common.UserId,
    isAdmin : Bool,
  ) : ?Types.Appointment {
    switch (appointments.get(id)) {
      case null null;
      case (?appt) {
        if (not isAdmin and appt.patientId != callerId) {
          Runtime.trap("Unauthorized: can only cancel your own appointment");
        };
        let updated : Types.Appointment = { appt with status = #cancelled };
        appointments.add(id, updated);
        ?updated;
      };
    };
  };

  public func confirmAppointment(
    appointments : Map.Map<Common.AppointmentId, Types.Appointment>,
    id : Common.AppointmentId,
  ) : ?Types.Appointment {
    switch (appointments.get(id)) {
      case null null;
      case (?appt) {
        let updated : Types.Appointment = { appt with status = #confirmed };
        appointments.add(id, updated);
        ?updated;
      };
    };
  };

  public func getAppointment(
    appointments : Map.Map<Common.AppointmentId, Types.Appointment>,
    id : Common.AppointmentId,
  ) : ?Types.Appointment {
    appointments.get(id);
  };

  public func listByPatient(
    appointments : Map.Map<Common.AppointmentId, Types.Appointment>,
    patientId : Common.UserId,
  ) : [Types.Appointment] {
    appointments.values()
      .filter(func(a) { a.patientId == patientId })
      .toArray();
  };

  public func listAll(
    appointments : Map.Map<Common.AppointmentId, Types.Appointment>,
  ) : [Types.Appointment] {
    appointments.values().toArray();
  };
};
