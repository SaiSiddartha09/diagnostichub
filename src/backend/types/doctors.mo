import Common "common";

module {
  public type AvailabilitySlot = {
    id : Common.SlotId;
    doctorId : Common.DoctorId;
    date : Text;
    startTime : Text;
    endTime : Text;
    isBooked : Bool;
  };

  public type Doctor = {
    id : Common.DoctorId;
    name : Text;
    specialization : Text;
    phone : Text;
    email : ?Text;
    clinicName : Text;
    clinicAddress : Text;
    bio : ?Text;
  };

  public type DoctorInput = {
    name : Text;
    specialization : Text;
    phone : Text;
    email : ?Text;
    clinicName : Text;
    clinicAddress : Text;
    bio : ?Text;
  };

  public type SlotInput = {
    doctorId : Common.DoctorId;
    date : Text;
    startTime : Text;
    endTime : Text;
  };
};
