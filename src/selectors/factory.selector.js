import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";
const selectFactory = (state) => state.factory;

export const selectFactoryList = createSelector(
  [selectFactory],
  (factory) => factory.factories
);
export const selectFactoryListBySupplierId = createSelector(
  [selectFactory, (_, id) => id],
  (factory, id) => {
    if (id && id !== "" && factory.factories.length > 0) {
      const factoryList = factory.factories.filter(
        (factory) => factory.supplierId.toString() === id.toString()
      );
      return factoryList;
    } else {
      return [];
    }
  }
);

export const selectFactoryCache = createSelector(
  [selectFactory, (_, page) => page],
  (factory, page) => {
    return factory.factoryCache[page] || null;
  }
);
export const selectTotalCount = createSelector([selectFactory], (factory) =>
  factory.count ? Math.ceil(factory.count / 8) : 1
);
export const selectSearchCount = createSelector(
  [selectFactory],
  (factory) =>
    // factory.searchCount ? Math.ceil(factory.searchCount / 8) : 1
    factory.searchCount
);
export const selectSearchResultsFactoryList = createSelector(
  [selectFactory],
  (factory) => factory.searchResults
);
export const selectFactoryNameFromId = createSelector(
  [selectFactory, (_, id) => id],
  (factory, id) => {
    if (id && id !== "" && factory.factories.length > 0) {
      const factoryName = factory.factories.filter(
        (factory) => factory.factoryId.toString() === id.toString()
      );
      if (
        factoryName.length === 0 &&
        factory.factoryData &&
        factory.factoryData.name
      ) {
        return factory.factoryData.name;
      }
      return factoryName[0]?.name;
    } else if (
      id &&
      id !== "" &&
      factory.factoryData &&
      factory.factoryData.name
    ) {
      return factory.factoryData.name;
    } else {
      return null;
    }
  }
);
export const selectFactoryTierFromId = createSelector(
  [selectFactory, (_, id) => id],
  (factory, id) => {
    if (id && id !== "" && factory.factories.length > 0) {
      const factoryName = factory.factories.filter(
        (factory) => factory.factoryId.toString() === id.toString()
      );

      return factoryName[0]?.tier;
    } else if (
      id &&
      id !== "" &&
      factory.factoryData &&
      factory.factoryData.tier
    ) {
      return factory.factoryData.tier;
    } else {
      return null;
    }
  }
);

export const selectFactoryData = createSelector(
  [selectFactory],
  (factory) => factory.factoryData
);

export const selectFacilityPageTab = createSelector(
  [selectFactory],
  (factory) => factory.factoryPageTab
);

export const selectAuditPageFactoryDataTitle = createSelector(
  [selectFactory],
  (factory) =>
    factory.factoryData &&
    factory.factoryData.metadata &&
    factory.factoryData.metadata.auditType &&
    factory.factoryData.metadata.lastAuditDate
      ? `${factory.factoryData.metadata.auditType} (${moment(
          factory.factoryData.metadata.lastAuditDate
        ).format("MMM. DD, YYYY")})`
      : null
);
export const selectFactoryConfidentialInformation = createSelector(
  [selectFactory],
  (factory) => {
    if (factory.factoryData) {
      const factoryMetaData = factory.factoryData.metadata;
      return [
        [
          {
            heading: "Product Categories",
            value:
              !factoryMetaData.productCategories ||
              factoryMetaData.productCategories === ""
                ? "-"
                : factoryMetaData.productCategories,
            xs: 12,
          },
        ],
        [
          {
            heading: "Products Produced",
            value:
              !factoryMetaData.productProduced ||
              factoryMetaData.productProduced === ""
                ? "-"
                : factoryMetaData.productProduced,
            xs: 12,
          },
        ],
        [
          {
            heading: "4imprint Note",
            value:
              !factoryMetaData.note || factoryMetaData.note === ""
                ? "-"
                : factoryMetaData.note,
            xs: 12,
          },
        ],
      ];
    } else {
      return [];
    }
  }
);

export const selectFactoryIssuesData = createSelector(
  [selectFactory],
  (factory) => {
    const metadata = factory.factoryData ? factory.factoryData.metadata : null;

    const safeAccess = (path, defaultValue = 0) => {
      return path.reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue),
        metadata
      );
    };

    const detailedIssues = [
      {
        category: "Management Systems",
        zt: safeAccess(["issues", "managementSystems", "zt"]),
        critical: safeAccess(["issues", "managementSystems", "critical"]),
        major: safeAccess(["issues", "managementSystems", "major"]),
        minor: safeAccess(["issues", "managementSystems", "minor"]),
      },
      {
        category: "Health & Safety",
        zt: safeAccess(["issues", "healthSafety", "zt"]),
        critical: safeAccess(["issues", "healthSafety", "critical"]),
        major: safeAccess(["issues", "healthSafety", "major"]),
        minor: safeAccess(["issues", "healthSafety", "minor"]),
      },
      {
        category: "Working Hours",
        zt: safeAccess(["issues", "workingHours", "zt"]),
        critical: safeAccess(["issues", "workingHours", "critical"]),
        major: safeAccess(["issues", "workingHours", "major"]),
        minor: safeAccess(["issues", "workingHours", "minor"]),
      },
      {
        category: "Wages & Benefits",
        zt: safeAccess(["issues", "wagesBenefits", "zt"]),
        critical: safeAccess(["issues", "wagesBenefits", "critical"]),
        major: safeAccess(["issues", "wagesBenefits", "major"]),
        minor: safeAccess(["issues", "wagesBenefits", "minor"]),
      },
      {
        category: "Business Ethics",
        zt: safeAccess(["issues", "businessEthics", "zt"]),
        critical: safeAccess(["issues", "businessEthics", "critical"]),
        major: safeAccess(["issues", "businessEthics", "major"]),
        minor: safeAccess(["issues", "businessEthics", "minor"]),
      },
      {
        category: "Employment, Discipline, & Grievances",
        zt: safeAccess(["issues", "employmentDisciplineGrievances", "zt"]),
        critical: safeAccess([
          "issues",
          "employmentDisciplineGrievances",
          "critical",
        ]),
        major: safeAccess([
          "issues",
          "employmentDisciplineGrievances",
          "major",
        ]),
        minor: safeAccess([
          "issues",
          "employmentDisciplineGrievances",
          "minor",
        ]),
      },
      {
        category: "Discrimination & Harassment",
        zt: safeAccess(["issues", "discriminationHarassment", "zt"]),
        critical: safeAccess([
          "issues",
          "discriminationHarassment",
          "critical",
        ]),
        major: safeAccess(["issues", "discriminationHarassment", "major"]),
        minor: safeAccess(["issues", "discriminationHarassment", "minor"]),
      },
      {
        category: "Freedom of Association & Collective Bargaining",
        zt: safeAccess([
          "issues",
          "freedomAssociationCollectiveBargaining",
          "zt",
        ]),
        critical: safeAccess([
          "issues",
          "freedomAssociationCollectiveBargaining",
          "critical",
        ]),
        major: safeAccess([
          "issues",
          "freedomAssociationCollectiveBargaining",
          "major",
        ]),
        minor: safeAccess([
          "issues",
          "freedomAssociationCollectiveBargaining",
          "minor",
        ]),
      },
      {
        category: "Young & Underage Workers",
        zt: safeAccess(["issues", "youngUnderageWorkers", "zt"]),
        critical: safeAccess(["issues", "youngUnderageWorkers", "critical"]),
        major: safeAccess(["issues", "youngUnderageWorkers", "major"]),
        minor: safeAccess(["issues", "youngUnderageWorkers", "minor"]),
      },
      {
        category: "Forced Labor",
        zt: safeAccess(["issues", "forcedLabor", "zt"]),
        critical: safeAccess(["issues", "forcedLabor", "critical"]),
        major: safeAccess(["issues", "forcedLabor", "major"]),
        minor: safeAccess(["issues", "forcedLabor", "minor"]),
      },
      {
        category: "Sub-contracting & Homework",
        zt: safeAccess(["issues", "subContractingHomework", "zt"]),
        critical: safeAccess(["issues", "subContractingHomework", "critical"]),
        major: safeAccess(["issues", "subContractingHomework", "major"]),
        minor: safeAccess(["issues", "subContractingHomework", "minor"]),
      },
      {
        category: "Environment",
        zt: safeAccess(["issues", "environment", "zt"]),
        critical: safeAccess(["issues", "environment", "critical"]),
        major: safeAccess(["issues", "environment", "major"]),
        minor: safeAccess(["issues", "environment", "minor"]),
      },
      {
        category: "Other",
        zt: safeAccess(["issues", "other", "zt"]),
        critical: safeAccess(["issues", "other", "critical"]),
        major: safeAccess(["issues", "other", "major"]),
        minor: safeAccess(["issues", "other", "minor"]),
      },
    ];

    const issuesSummary = {
      zt: detailedIssues.reduce((acc, curr) => acc + (curr.zt || 0), 0),
      critical: detailedIssues.reduce(
        (acc, curr) => acc + (curr.critical || 0),
        0
      ),
      major: detailedIssues.reduce((acc, curr) => acc + (curr.major || 0), 0),
      minor: detailedIssues.reduce((acc, curr) => acc + (curr.minor || 0), 0),
    };
    return {
      totalIssues: Object.values(issuesSummary).reduce(
        (acc, curr) => acc + (curr || 0),
        0
      ),
      issuesSummary,
      detailedIssues,
    };
  }
);

export const selectFactoryActionNeededData = createSelector(
  [selectFactory],
  (factory) => {
    const capDetails = [
      {
        title: "Past CAP",

        data: [
          {
            title: "Past CAP",
            status: "Past Due 20 Days",
            dueDate: "05/2/2024",
            findings: "The factory has no sprinkler system.",
            key: "past",
          },
          {
            title: "Open CAP",
            status: "Past Due 20 Days",
            dueDate: "05/2/2024",
            findings: "The factory has no sprinkler system.",
            key: "past",
          },
        ],
      },
      {
        title: "Open CAP",

        data: [
          {
            status: "Open for 20 Days",
            dueDate: "05/2/2024",
            findings: "The factory has no sprinkler system.",
            key: "open",
          },
          {
            status: "Open for 20 Days",
            dueDate: "05/2/2024",
            findings: "The factory has no sprinkler system.",
            key: "open",
          },
        ],
      },
    ];
    return null;
  }
);

export const selectAdditionalFactoryInformation = createSelector(
  [selectFactory],
  (factory) => {
    const metadata = factory.factoryData ? factory.factoryData.metadata : null;

    const safeAccess = (path, defaultValue = "-") => {
      return path.reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue),
        metadata
      );
    };

    const factoryInfo = [
      {
        heading: "Worker Count",
        values: [
          { label: "Total", value: safeAccess(["workerCountTotal"]) },
          { label: "Permanent", value: safeAccess(["workerCountPermanent"]) },
          { label: "Temporary", value: safeAccess(["workerCountTemporary"]) },
          { label: "Agency", value: safeAccess(["workerCountAgency"]) },
        ],
      },
      {
        heading: "Worker Demographics",
        values: [
          {
            label: "Foreign Migrant Workers",
            value: safeAccess(["foreignMigrantWorkers"]),
          },
          {
            label: "Domestic Migrant Workers",
            value: safeAccess(["domesticMigrantWorkers"]),
          },
          { label: "Young Workers", value: safeAccess(["youngWorkers"]) },
          { label: "Home Workers", value: safeAccess(["homeWorkers"]) },
        ],
      },
      {
        heading: "Worker Gender",
        values: [
          { label: "Female", value: safeAccess(["workerGenderFemale"]) },
          { label: "Male", value: safeAccess(["workerGenderMale"]) },
          { label: "Other", value: safeAccess(["workerGenderOther"]) },
          { label: "", value: "" },
        ],
      },
      {
        heading: "Production Seasonality",
        values: [
          { label: "Peak", value: safeAccess(["productionSeasonalityPeak"]) },
          { label: "Low", value: safeAccess(["productionSeasonalityLow"]) },
        ],
      },
    ];
    return factoryInfo;
  }
);
