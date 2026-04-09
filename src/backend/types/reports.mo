import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ReportType = {
    #ctScan;
    #xRay;
    #mri;
    #bloodTest;
    #ultrasound;
    #other : Text;
  };

  public type ReportStatus = {
    #pending;
    #uploaded;
    #sent;
    #viewed;
  };

  public type DiagnosticReport = {
    id : Common.ReportId;
    patientId : Common.UserId;
    title : Text;
    reportType : ReportType;
    fileBlob : ?Storage.ExternalBlob;
    thumbnailBlob : ?Storage.ExternalBlob;
    uploadedAt : Common.Timestamp;
    status : ReportStatus;
    labNotes : ?Text;
    adminNotes : ?Text;
  };

  public type ReportInput = {
    patientId : Common.UserId;
    title : Text;
    reportType : ReportType;
    fileBlob : ?Storage.ExternalBlob;
    thumbnailBlob : ?Storage.ExternalBlob;
    labNotes : ?Text;
    adminNotes : ?Text;
  };

  public type ReportUpdate = {
    title : ?Text;
    reportType : ?ReportType;
    fileBlob : ?Storage.ExternalBlob;
    thumbnailBlob : ?Storage.ExternalBlob;
    labNotes : ?Text;
    adminNotes : ?Text;
    status : ?ReportStatus;
  };
};
