import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/patients";
import Common "../types/common";

module {
  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.PatientProfile>,
    userId : Common.UserId,
  ) : ?Types.PatientProfile {
    profiles.get(userId);
  };

  public func saveProfile(
    profiles : Map.Map<Common.UserId, Types.PatientProfile>,
    userId : Common.UserId,
    input : Types.PatientProfileInput,
  ) : Types.PatientProfile {
    let existing = profiles.get(userId);
    let createdAt = switch (existing) {
      case (?p) p.createdAt;
      case null Time.now();
    };
    let profile : Types.PatientProfile = {
      id = userId;
      name = input.name;
      phone = input.phone;
      email = input.email;
      dateOfBirth = input.dateOfBirth;
      gender = input.gender;
      address = input.address;
      createdAt;
    };
    profiles.add(userId, profile);
    profile;
  };

  public func listAll(
    profiles : Map.Map<Common.UserId, Types.PatientProfile>,
  ) : [Types.PatientProfile] {
    profiles.values().toArray();
  };

  public func deleteProfile(
    profiles : Map.Map<Common.UserId, Types.PatientProfile>,
    userId : Common.UserId,
  ) : () {
    profiles.remove(userId);
  };
};
