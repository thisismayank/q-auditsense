import { createSelector } from "@reduxjs/toolkit";

const selectRisk = (state) => state.risk;

export const selectChartData = createSelector(
  [selectRisk],
  (risk) => risk.chartData
);

export const selectChartTypes = createSelector(
  [selectRisk],
  (risk) => risk.chartTypes
);

export const selectSelectedChartType = createSelector(
  [selectRisk],
  (risk) => risk.selectedChartType
);

export const selectFactoryDataFromChartData = createSelector(
  [selectRisk, (_, factoryName) => factoryName],
  (risk, factoryName) => {
    return risk?.chartData?.factoryData?.filter(
      (factory) => factory.name.toLowerCase() === factoryName.toLowerCase()
    );
  }
);
