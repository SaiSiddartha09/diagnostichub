import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import DoctorsLib "../lib/doctors";
import Types "../types/doctors";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  doctors : Map.Map<Common.DoctorId, Types.Doctor>,
  slots : Map.Map<Common.SlotId, Types.AvailabilitySlot>,
  doctorCounter : { var nextDoctorId : Common.DoctorId },
  slotCounter : { var nextSlotId : Common.SlotId },
) {
  /// Admin: create a new doctor profile.
  public shared ({ caller }) func createDoctor(input : Types.DoctorInput) : async Types.Doctor {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create doctors");
    };
    DoctorsLib.createDoctor(doctors, doctorCounter, input);
  };

  /// Admin: update an existing doctor profile.
  public shared ({ caller }) func updateDoctor(id : Common.DoctorId, input : Types.DoctorInput) : async ?Types.Doctor {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update doctors");
    };
    DoctorsLib.updateDoctor(doctors, id, input);
  };

  /// Admin: delete a doctor and their slots.
  public shared ({ caller }) func deleteDoctor(id : Common.DoctorId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete doctors");
    };
    DoctorsLib.deleteDoctor(doctors, slots, id);
  };

  /// Admin: add an availability slot to a doctor.
  public shared ({ caller }) func addDoctorSlot(input : Types.SlotInput) : async Types.AvailabilitySlot {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add slots");
    };
    DoctorsLib.addSlot(slots, slotCounter, input);
  };

  /// Admin: remove an availability slot.
  public shared ({ caller }) func removeDoctorSlot(slotId : Common.SlotId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove slots");
    };
    DoctorsLib.removeSlot(slots, slotId);
  };

  /// Patient/anyone: list all doctors, optionally filtered by specialization.
  public query ({ caller }) func listDoctors(specialization : ?Text) : async [Types.Doctor] {
    switch (specialization) {
      case null DoctorsLib.listDoctors(doctors);
      case (?spec) DoctorsLib.listBySpecialization(doctors, spec);
    };
  };

  /// Patient/anyone: get a doctor's profile.
  public query ({ caller }) func getDoctor(id : Common.DoctorId) : async ?Types.Doctor {
    DoctorsLib.getDoctor(doctors, id);
  };

  /// Patient/anyone: list available slots for a doctor.
  public query ({ caller }) func getDoctorSlots(doctorId : Common.DoctorId) : async [Types.AvailabilitySlot] {
    DoctorsLib.listSlotsByDoctor(slots, doctorId);
  };
};
