import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Types "../types/doctors";
import Common "../types/common";

module {
  public func createDoctor(
    doctors : Map.Map<Common.DoctorId, Types.Doctor>,
    counter : { var nextDoctorId : Common.DoctorId },
    input : Types.DoctorInput,
  ) : Types.Doctor {
    let id = counter.nextDoctorId;
    counter.nextDoctorId += 1;
    let doctor : Types.Doctor = {
      id;
      name = input.name;
      specialization = input.specialization;
      phone = input.phone;
      email = input.email;
      clinicName = input.clinicName;
      clinicAddress = input.clinicAddress;
      bio = input.bio;
    };
    doctors.add(id, doctor);
    doctor;
  };

  public func updateDoctor(
    doctors : Map.Map<Common.DoctorId, Types.Doctor>,
    id : Common.DoctorId,
    input : Types.DoctorInput,
  ) : ?Types.Doctor {
    switch (doctors.get(id)) {
      case null null;
      case (?_existing) {
        let updated : Types.Doctor = {
          id;
          name = input.name;
          specialization = input.specialization;
          phone = input.phone;
          email = input.email;
          clinicName = input.clinicName;
          clinicAddress = input.clinicAddress;
          bio = input.bio;
        };
        doctors.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteDoctor(
    doctors : Map.Map<Common.DoctorId, Types.Doctor>,
    slots : Map.Map<Common.SlotId, Types.AvailabilitySlot>,
    id : Common.DoctorId,
  ) : () {
    doctors.remove(id);
    // Remove all slots belonging to this doctor
    let toRemove = slots.entries()
      .filter(func((_, s)) { s.doctorId == id })
      .map(func((slotId, _)) { slotId })
      .toArray();
    for (slotId in toRemove.values()) {
      slots.remove(slotId);
    };
  };

  public func getDoctor(
    doctors : Map.Map<Common.DoctorId, Types.Doctor>,
    id : Common.DoctorId,
  ) : ?Types.Doctor {
    doctors.get(id);
  };

  public func listDoctors(
    doctors : Map.Map<Common.DoctorId, Types.Doctor>,
  ) : [Types.Doctor] {
    doctors.values().toArray();
  };

  public func listBySpecialization(
    doctors : Map.Map<Common.DoctorId, Types.Doctor>,
    specialization : Text,
  ) : [Types.Doctor] {
    doctors.values()
      .filter(func(d) { d.specialization == specialization })
      .toArray();
  };

  public func addSlot(
    slots : Map.Map<Common.SlotId, Types.AvailabilitySlot>,
    counter : { var nextSlotId : Common.SlotId },
    input : Types.SlotInput,
  ) : Types.AvailabilitySlot {
    let id = counter.nextSlotId;
    counter.nextSlotId += 1;
    let slot : Types.AvailabilitySlot = {
      id;
      doctorId = input.doctorId;
      date = input.date;
      startTime = input.startTime;
      endTime = input.endTime;
      isBooked = false;
    };
    slots.add(id, slot);
    slot;
  };

  public func removeSlot(
    slots : Map.Map<Common.SlotId, Types.AvailabilitySlot>,
    slotId : Common.SlotId,
  ) : () {
    switch (slots.get(slotId)) {
      case null ();
      case (?slot) {
        if (slot.isBooked) {
          Runtime.trap("Cannot remove a booked slot");
        };
        slots.remove(slotId);
      };
    };
  };

  public func listSlotsByDoctor(
    slots : Map.Map<Common.SlotId, Types.AvailabilitySlot>,
    doctorId : Common.DoctorId,
  ) : [Types.AvailabilitySlot] {
    slots.values()
      .filter(func(s) { s.doctorId == doctorId })
      .toArray();
  };

  public func bookSlot(
    slots : Map.Map<Common.SlotId, Types.AvailabilitySlot>,
    slotId : Common.SlotId,
  ) : Bool {
    switch (slots.get(slotId)) {
      case null false;
      case (?slot) {
        if (slot.isBooked) { false } else {
          slots.add(slotId, { slot with isBooked = true });
          true;
        };
      };
    };
  };

  public func releaseSlot(
    slots : Map.Map<Common.SlotId, Types.AvailabilitySlot>,
    slotId : Common.SlotId,
  ) : () {
    switch (slots.get(slotId)) {
      case null ();
      case (?slot) {
        slots.add(slotId, { slot with isBooked = false });
      };
    };
  };
};
