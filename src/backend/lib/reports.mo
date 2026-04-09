import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/reports";
import Common "../types/common";

module {
  public func createReport(
    reports : Map.Map<Common.ReportId, Types.DiagnosticReport>,
    counter : { var nextId : Common.ReportId },
    input : Types.ReportInput,
  ) : Types.DiagnosticReport {
    let id = counter.nextId;
    counter.nextId += 1;
    let report : Types.DiagnosticReport = {
      id;
      patientId = input.patientId;
      title = input.title;
      reportType = input.reportType;
      fileBlob = input.fileBlob;
      thumbnailBlob = input.thumbnailBlob;
      uploadedAt = Time.now();
      status = #pending;
      labNotes = input.labNotes;
      adminNotes = input.adminNotes;
    };
    reports.add(id, report);
    report;
  };

  public func updateReport(
    reports : Map.Map<Common.ReportId, Types.DiagnosticReport>,
    id : Common.ReportId,
    update : Types.ReportUpdate,
  ) : ?Types.DiagnosticReport {
    switch (reports.get(id)) {
      case null null;
      case (?existing) {
        let updated : Types.DiagnosticReport = {
          existing with
          title = switch (update.title) { case (?t) t; case null existing.title };
          reportType = switch (update.reportType) { case (?rt) rt; case null existing.reportType };
          fileBlob = switch (update.fileBlob) { case (?b) ?b; case null existing.fileBlob };
          thumbnailBlob = switch (update.thumbnailBlob) { case (?b) ?b; case null existing.thumbnailBlob };
          labNotes = switch (update.labNotes) { case (?n) ?n; case null existing.labNotes };
          adminNotes = switch (update.adminNotes) { case (?n) ?n; case null existing.adminNotes };
          status = switch (update.status) { case (?s) s; case null existing.status };
        };
        reports.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteReport(
    reports : Map.Map<Common.ReportId, Types.DiagnosticReport>,
    id : Common.ReportId,
  ) : () {
    reports.remove(id);
  };

  public func getReport(
    reports : Map.Map<Common.ReportId, Types.DiagnosticReport>,
    id : Common.ReportId,
  ) : ?Types.DiagnosticReport {
    reports.get(id);
  };

  public func listByPatient(
    reports : Map.Map<Common.ReportId, Types.DiagnosticReport>,
    patientId : Common.UserId,
  ) : [Types.DiagnosticReport] {
    reports.values().filter(func(r) { r.patientId == patientId }).toArray();
  };

  public func listAll(
    reports : Map.Map<Common.ReportId, Types.DiagnosticReport>,
  ) : [Types.DiagnosticReport] {
    reports.values().toArray();
  };

  public func updateStatus(
    reports : Map.Map<Common.ReportId, Types.DiagnosticReport>,
    id : Common.ReportId,
    status : Types.ReportStatus,
  ) : ?Types.DiagnosticReport {
    switch (reports.get(id)) {
      case null null;
      case (?existing) {
        let updated : Types.DiagnosticReport = { existing with status };
        reports.add(id, updated);
        ?updated;
      };
    };
  };
};
