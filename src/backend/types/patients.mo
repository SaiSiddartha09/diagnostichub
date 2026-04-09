import Common "common";

module {
  public type Gender = { #male; #female; #other };

  public type PatientProfile = {
    id : Common.UserId;
    name : Text;
    phone : Text;
    email : ?Text;
    dateOfBirth : ?Text;
    gender : ?Gender;
    address : ?Text;
    createdAt : Common.Timestamp;
  };

  public type PatientProfileInput = {
    name : Text;
    phone : Text;
    email : ?Text;
    dateOfBirth : ?Text;
    gender : ?Gender;
    address : ?Text;
  };
};
