import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChartData,
  selectFactoryDataFromChartData,
} from "../../selectors/risk.selector";
import { getSupplierById } from "../../reducers/supplier.reducer";
import { getFactoryById } from "../../reducers/factory.reducer";
import { useNavigate } from "react-router-dom";

const RiskBarChart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedChartData = useSelector(selectChartData);
  const [factoryName, setFactoryName] = useState("");

  const handleClick = (event, identifier) => {
    event.preventDefault();
    setFactoryName(selectedChartData.xAxisLabels[identifier.dataIndex]);
  };

  const factoryData = useSelector((state) =>
    selectFactoryDataFromChartData(state, factoryName)
  );

  useEffect(() => {
    if (
      factoryData &&
      factoryData.length > 0 &&
      factoryData[0].supplierId &&
      factoryData[0].factoryId
    ) {
      dispatch(getSupplierById(factoryData[0].supplierId));
      dispatch(
        getFactoryById({
          supplierId: factoryData[0].supplierId,
          factoryId: factoryData[0].factoryId,
        })
      );
    }
  }, [factoryData]);

  return (
    selectedChartData.series && (
      <Grid item sx={{ flex: 1, width: "100%", minHeight: 390 }}>
        {" "}
        <BarChart
          series={[{ data: selectedChartData.series }]}
          xAxis={[
            {
              data: selectedChartData.xAxisLabels,
              scaleType: "band",
              label: selectedChartData.xAxisGlobalLabel,
            },
            { label: "Factory" },
          ]}
          sx={{
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
              transform: "translateX(-10px)",
            },
          }}
          colors={["#3538CD"]}
          yAxis={[{ label: "Inherent Risk" }]}
          onItemClick={(event, identifier) => handleClick(event, identifier)}
        />
      </Grid>
    )
  );
};

export default RiskBarChart;
