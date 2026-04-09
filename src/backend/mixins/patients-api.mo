import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PatientsLib "../lib/patients";
import Types "../types/patients";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  patientProfiles : Map.Map<Common.UserId, Types.PatientProfile>,
) {
  /// Get the caller's own profile. Returns null if not set up yet.
  public query ({ caller }) func getMyProfile() : async ?Types.PatientProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PatientsLib.getProfile(patientProfiles, caller);
  };

  /// Save/update the caller's own profile.
  public shared ({ caller }) func saveMyProfile(input : Types.PatientProfileInput) : async Types.PatientProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PatientsLib.saveProfile(patientProfiles, caller, input);
  };

  /// Admin: get any patient's profile by principal.
  public query ({ caller }) func getPatientProfile(patientId : Common.UserId) : async ?Types.PatientProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view patient profiles");
    };
    PatientsLib.getProfile(patientProfiles, patientId);
  };

  /// Admin: list all patient profiles.
  public query ({ caller }) func listAllPatients() : async [Types.PatientProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list patients");
    };
    PatientsLib.listAll(patientProfiles);
  };

  /// Admin: delete a patient profile.
  public shared ({ caller }) func deletePatient(patientId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete patients");
    };
    PatientsLib.deleteProfile(patientProfiles, patientId);
  };
};
