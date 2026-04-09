import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReportsLib "../lib/reports";
import Types "../types/reports";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reports : Map.Map<Common.ReportId, Types.DiagnosticReport>,
  reportCounter : { var nextId : Common.ReportId },
) {
  /// Admin: create a new diagnostic report for a patient.
  public shared ({ caller }) func createReport(input : Types.ReportInput) : async Types.DiagnosticReport {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create reports");
    };
    ReportsLib.createReport(reports, reportCounter, input);
  };

  /// Admin: update an existing report's fields.
  public shared ({ caller }) func updateReport(id : Common.ReportId, update : Types.ReportUpdate) : async ?Types.DiagnosticReport {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update reports");
    };
    ReportsLib.updateReport(reports, id, update);
  };

  /// Admin: delete a report.
  public shared ({ caller }) func deleteReport(id : Common.ReportId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete reports");
    };
    ReportsLib.deleteReport(reports, id);
  };

  /// Admin: update report status (pending/uploaded/sent/viewed).
  public shared ({ caller }) func setReportStatus(id : Common.ReportId, status : Types.ReportStatus) : async ?Types.DiagnosticReport {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can set report status");
    };
    ReportsLib.updateStatus(reports, id, status);
  };

  /// Admin: list all reports across all patients.
  public query ({ caller }) func listAllReports() : async [Types.DiagnosticReport] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all reports");
    };
    ReportsLib.listAll(reports);
  };

  /// Admin or patient: get a specific report by id.
  public query ({ caller }) func getReport(id : Common.ReportId) : async ?Types.DiagnosticReport {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let report = ReportsLib.getReport(reports, id);
    switch (report) {
      case null null;
      case (?r) {
        // Patients can only view their own reports; admins can view all
        if (not AccessControl.isAdmin(accessControlState, caller) and r.patientId != caller) {
          Runtime.trap("Unauthorized: can only access your own reports");
        };
        ?r;
      };
    };
  };

  /// Patient: list their own reports.
  public query ({ caller }) func listMyReports() : async [Types.DiagnosticReport] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ReportsLib.listByPatient(reports, caller);
  };

  /// Patient: mark a report as viewed.
  public shared ({ caller }) func markReportViewed(id : Common.ReportId) : async ?Types.DiagnosticReport {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (ReportsLib.getReport(reports, id)) {
      case null null;
      case (?r) {
        if (r.patientId != caller) {
          Runtime.trap("Unauthorized: can only mark your own report as viewed");
        };
        ReportsLib.updateStatus(reports, id, #viewed);
      };
    };
  };
};
