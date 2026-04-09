import Common "common";

module {
  public type AppointmentStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  public type Appointment = {
    id : Common.AppointmentId;
    patientId : Common.UserId;
    doctorId : Common.DoctorId;
    slotId : Common.SlotId;
    status : AppointmentStatus;
    bookedAt : Common.Timestamp;
    notes : ?Text;
  };

  public type AppointmentInput = {
    doctorId : Common.DoctorId;
    slotId : Common.SlotId;
    notes : ?Text;
  };
};
