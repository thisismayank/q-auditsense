import { createSelector } from "@reduxjs/toolkit";

const selectAudit = (state) => state.audit;

export const selectAuditList = createSelector(
  [selectAudit],
  (audit) => audit.audits
);

export const selectAuditListForFactory = createSelector(
  [selectAudit, (_, factoryId) => factoryId],
  (audit, factoryId) =>
    factoryId
      ? audit.audits.filter(
          (audit) => audit.factoryId.toString() === factoryId.toString()
        )
      : audit.audits
);

export const selectAuditNameFromId = createSelector(
  [selectAudit, (_, id) => id],
  (audit, id) => {
    if (id && id !== "" && audit.audits.length > 0) {
      const auditName = audit.audits.filter(
        (audit) => audit.auditId.toString() === id.toString()
      );
      return auditName[0].metadata?.auditType;
    } else {
      return null;
    }
  }
);

export const selectAuditData = createSelector(
  [selectAudit],
  (audit) => audit.auditData
);
export const selectSelectedAuditIssueId = createSelector(
  [selectAudit],
  (audit) => audit.selectedAuditIssueId
);

export const selectAuditXlsxFile = createSelector([selectAudit], (audit) =>
  audit.auditData?.files?.filter((file) => file.type === "xlsx")
);

export const selectAuditPageTab = createSelector(
  [selectAudit],
  (audit) => audit.auditPageTab
);

export const selectAuditReportPageTab = createSelector(
  [selectAudit],
  (audit) => audit.auditReportPageTab
);

export const selectAuditIssuesData = createSelector([selectAudit], (audit) => {
  const issueDetails = audit.auditData?.issueDetails?.issueDetails || {};
  const severityCategories =
    audit.auditData?.issueDetails?.severityCategories || {};

  const detailedIssues = Object.keys(severityCategories).map((category) => ({
    category,
    open: issueDetails.open?.[category] || 0,
    pastDue: issueDetails.pastDue?.[category] || 0,
    totalClosed: issueDetails.closed?.[category] || 0,
    color: severityCategories[category],
  }));

  const issuesSummary = {
    open: detailedIssues.reduce((acc, curr) => acc + (curr.open || 0), 0),
    pastDue: detailedIssues.reduce((acc, curr) => acc + (curr.pastDue || 0), 0),
    totalClosed: detailedIssues.reduce(
      (acc, curr) => acc + (curr.totalClosed || 0),
      0
    ),
  };
  return {
    total: detailedIssues.reduce(
      (acc, curr) => acc + ((curr.open || 0) + (curr.totalClosed || 0)),
      0
    ),
    issuesSummary,
    detailedIssues,
  };
});

export const selectAuditIssueCAPData = createSelector(
  [selectAudit],
  (audit) => {
    return audit?.auditIssueCAPData
      ? Object.values(audit.auditIssueCAPData).map((issue) => {
          return {
            id: issue.id,
            issue: issue.issue,
            type: issue.type,
            severity: issue.severity,
            statusChipLabel: issue.statusChipLabel,
            status: issue.status,
            timeline: issue.timeline,
            note: issue.note || null,
          };
        })
      : [];
  }
);

export const selectAuditIssueCAPDataGroupedByType = createSelector(
  [selectAudit],
  (audit) => {
    if (audit.auditIssueCAPData) {
      const data = Object.values(audit.auditIssueCAPData).reduce(
        (acc, issue) => {
          acc[issue.type] = acc[issue.type] || [];
          acc[issue.type].push({ id: issue.id, issue: issue.issue });
          return acc;
        },
        {}
      );

      return data;
    } else {
      return {};
    }
  }
);

export const selectAuditIssueDetails = createSelector(
  [selectAudit],
  (audit) => {
    const selectedIssueId = audit.selectedAuditIssueId;

    return selectedIssueId && audit.auditIssueCAPData[selectedIssueId]
      ? audit.auditIssueCAPData[selectedIssueId]
      : {};
  }
);
