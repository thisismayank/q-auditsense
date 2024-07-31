import { createSelector } from "@reduxjs/toolkit";

const selectSupplier = (state) => state.supplier;

export const selectSupplierList = createSelector(
  [selectSupplier],
  (supplier) => supplier.suppliers
);
export const selectSearchResultsSupplierList = createSelector(
  [selectSupplier],
  (supplier) => supplier.searchResults
);

export const selectLimitOffset = createSelector(
  [selectSupplier],
  (supplier) => {
    return { limit: supplier.limit, offset: supplier.offset };
  }
);

export const selectSupplierCache = createSelector(
  [selectSupplier, (_, page) => page],
  (supplier, page) => {
    return supplier.supplierCache[page] || null;
  }
);

export const selectTotalCount = createSelector([selectSupplier], (supplier) =>
  supplier.count ? Math.ceil(supplier.count / 8) : 1
);
export const selectSearchCount = createSelector(
  [selectSupplier],
  (supplier) =>
    // supplier.searchCount ? Math.ceil(supplier.searchCount / 8) : 1
    supplier.searchCount
);

export const selectSupplierPageTab = createSelector(
  [selectSupplier],
  (supplier) => supplier.supplierPageTab
);

export const selectSupplierData = createSelector(
  [selectSupplier],
  (supplier) => supplier?.supplierData?.[0] || null
);

export const selectSupplierTableUIConfig = createSelector(
  [selectSupplier],
  (supplier) => supplier?.ui || null
);

export const selectSupplierNameFromId = createSelector(
  [selectSupplier, (_, id) => id],
  (supplier, id) => {
    if (
      id &&
      id !== "" &&
      supplier.suppliers &&
      supplier.suppliers.length > 0
    ) {
      const supplierName = supplier.suppliers.filter(
        (supplier) => supplier.supplierId.toString() === id.toString()
      );
      return supplierName.length > 0 ? supplierName[0]?.name : null;
    } else if (
      id &&
      id !== "" &&
      supplier.supplierData &&
      supplier.supplierData.length > 0 &&
      supplier.supplierData[0]?.name
    ) {
      return supplier.supplierData[0]?.name;
    } else {
      return null;
    }
  }
);
export const selectSupplierConfidentialInformation = createSelector(
  [selectSupplier],
  (supplier) => {
    if (supplier.supplierData && supplier.supplierData.length > 0) {
      const supplierMetadata = supplier.supplierData[0].metadata;
      return [
        [
          {
            heading: "Product Categories",
            value:
              !supplierMetadata.productCategories ||
              supplierMetadata.productCategories === ""
                ? "-"
                : supplierMetadata.productCategories,
            xs: 6,
          },
          {
            heading: "Top Product",
            value:
              !supplierMetadata.topProduct || supplierMetadata.topProduct === ""
                ? "-"
                : supplierMetadata.topProduct,
            xs: 6,
          },
        ],
        [
          {
            heading: "Spend",
            value:
              !supplierMetadata.spend || supplierMetadata.spend === ""
                ? "-"
                : supplierMetadata.spend,
            xs: 12,
          },
        ],
        [
          {
            heading: "Percentage of business from 4imprint",
            value:
              !supplierMetadata.percentageOfBusinessFrom4imprint ||
              supplierMetadata.percentageOfBusinessFrom4imprint === ""
                ? "-"
                : supplierMetadata.percentageOfBusinessFrom4imprint,
            xs: 12,
          },
        ],
      ];
    } else {
      return [];
    }
  }
);

export const selectSupplierRemediationStatusData = createSelector(
  [selectSupplier],
  (supplier) => {
    if (supplier.supplierData && supplier.supplierData.length > 0) {
      const supplierMetadata = supplier.supplierData[0].metadata;
      const data = [
        {
          tier: 1,
          cards: [
            {
              title: "CAPs",
              details: [
                {
                  title: "Past Due",
                  value: supplierMetadata.pastDue || "-",
                  key: "pastDue",
                },
                {
                  title: "Open",
                  value: supplierMetadata.openDue || "-",
                  key: "openDue",
                },
              ],
            },
            {
              title: "Issues",
              details: [
                { title: "ZT Issues", value: "0" || "-", key: "zt" }, // TODO: Tech debt, remove hard coding
                {
                  title: "Critical Issues",
                  value:
                    supplier.supplierData[0].factoryData.criticalCount ==
                      null ||
                    supplier.supplierData[0].factoryData.criticalCount == "-"
                      ? "-"
                      : supplier.supplierData[0].factoryData.criticalCount > 0
                      ? supplier.supplierData[0].factoryData.criticalCount - 1
                      : 0,
                  key: "critical",
                },
              ],
            },
            {
              title: "Audits Due",
              details: [
                {
                  title: "Past Due",
                  value: supplierMetadata.pastDue || "-",
                  key: "pastDue",
                },
                {
                  title: "In 30 days",
                  value: supplierMetadata.in30 || "-",
                  key: "in30",
                },
                // {
                //   title: "In 60 days",
                //   value: supplierMetadata.in60 || "-",
                //   key: "in60",
                // },
              ],
            },
          ],
        },
        {
          tier: 2,
          cards: [
            {
              title: "CAPs",
              details: [
                {
                  title: "Past Due",
                  value: supplierMetadata.pastDue || "-",
                  key: "pastDue",
                },
                {
                  title: "Open",
                  value: supplierMetadata.openDue || "-",
                  key: "openDue",
                },
              ],
            },
            {
              title: "Issues",
              details: [
                { title: "ZT Issues", value: "0", key: "zt" }, // TODO: Tech debt, remove hard coding
                { title: "Critical Issues", value: "0", key: "critical" }, // TODO: Tech debt, remove hard coding
              ],
            },
            {
              title: "Audits Due",
              details: [
                {
                  title: "Past Due",
                  value: supplierMetadata.pastDue || "-",
                  key: "pastDue",
                },
                {
                  title: "In 30 days",
                  value: supplierMetadata.in30 || "-",
                  key: "in30",
                },
                // {
                //   title: "In 60 days",
                //   value: supplierMetadata.in60 || "-",
                //   key: "in60",
                // },
              ],
            },
          ],
        },
      ];
      return data;
    } else {
      return [];
    }
  }
);
