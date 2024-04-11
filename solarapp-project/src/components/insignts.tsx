"use client";

import MapComponent from "@/components/map";
import HomeComponent from "@/components/screen/home";
import { useLocationsContext } from "@/context/locationsContext";
import { IResponseAPI } from "@/types/requestsTypes";
import Image from "next/image";
import Chart from "react-google-charts";

import SolarPowerIcon from "@mui/icons-material/SolarPower";

import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { useState } from "react";
import { Card, Slider } from "@mui/material";

export default function Insights() {
  const { insightOfThebuilding, isLoading } = useLocationsContext();
  let [panelVision, setPanelVision] = useState(1);

  let yearTotalSavings = 0,
    currentSavings = 0;
  // Flag with John re uncertainity with calculations here.
  if (insightOfThebuilding) {
    yearTotalSavings = Math.round(
      (insightOfThebuilding.solarPotential.maxArrayPanelsCount *
        insightOfThebuilding.solarPotential.maxSunshineHoursPerYear *
        insightOfThebuilding.solarPotential.panelCapacityWatts) /
        1000
    );
    currentSavings = Math.round(
      (panelVision *
        insightOfThebuilding.solarPotential.maxSunshineHoursPerYear *
        insightOfThebuilding.solarPotential.panelCapacityWatts) /
        1000
    );
  }

  return (
    <>
      {!isLoading && insightOfThebuilding != null && (
        <Card
          sx={{
            p: 2,
            overflowY: "scroll",
            height: "100%",
            backgroundColor: "#94a3b850",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full my-20">
            <h2 className="flex items-center text-xl text-center mb-5 font-semibold">
              Dados da Estrutura:
            </h2>
            <div className="flex flex-col items-center mb-5 text-center">
              <p>Região: {insightOfThebuilding.regionCode}</p>
              {insightOfThebuilding.postalCode && (
                <p>Código Posta: {insightOfThebuilding.postalCode}</p>
              )}
              <h3>
                Área total da Estrutura:{" "}
                {(
                  insightOfThebuilding.solarPotential.buildingStats
                    .areaMeters2 as Number
                ).toFixed(2)}{" "}
                M²
              </h3>
            </div>
            <h2 className="flex items-center text-xl text-center mb-5 font-semibold">
              Paneis Solares
            </h2>
            <div className="flex items-center justify-between w-11/12 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <SolarPowerIcon color="primary" fontSize="medium" />
              </div>
              <p className="font-medium">
                {Math.round(panelVision).toLocaleString()}/
                {Math.round(
                  insightOfThebuilding.solarPotential.maxArrayPanelsCount
                ).toLocaleString()}
              </p>
            </div>
            <Chart
              chartType="BarChart"
              data={[
                ["Panels", "Progress"],
                [
                  panelVision,
                  Math.round(
                    (panelVision /
                      insightOfThebuilding.solarPotential.maxArrayPanelsCount) *
                      100
                  ),
                ],
              ]}
              width="100%"
              height="50px"
              options={{
                legend: { position: "none" },
                hAxis: {
                  minValue: 0,
                  title: "%",
                  ticks: [20, 40, 60, 80, 100],
                },
                bar: { groupWidth: "95%" },
                chartArea: {
                  width: "90%",
                },
              }}
            />

            <div className="flex grid grid-rows-3 w-11/12 mx-auto font-sans text-black mt-5">
              <h2 className="flex items-center text-xl text-center font-semibold">
                Economia por ano (kw/h)
              </h2>
              <div className="flex items-center justify-between w-11/12">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <EnergySavingsLeafIcon color="success" fontSize="medium" />
                </div>
                <p className="font-medium">
                  {currentSavings?.toLocaleString()} /{" "}
                  {yearTotalSavings?.toLocaleString()}
                </p>
              </div>
              <Chart
                chartType="BarChart"
                data={[
                  ["Savings", "Progress"],
                  [
                    currentSavings,
                    Math.round((currentSavings / yearTotalSavings) * 100),
                  ],
                ]}
                width="100%"
                height="50px"
                options={{
                  legend: { position: "none" },
                  colors: ["green"],
                  hAxis: {
                    minValue: 0,
                    title: "%",
                    ticks: [20, 40, 60, 80, 100],
                  },
                  bar: { groupWidth: "95%" },
                  chartArea: {
                    width: "90%",
                  },
                }}
              />

              <div className="text-center mt-5">
                Visualizar valor com o total de paineis solares
              </div>
              <p className="text-center mt-5 font-medium">
                {panelVision} Paineis
              </p>

              <Slider
                marks
                step={1}
                min={1}
                max={insightOfThebuilding.solarPotential.maxArrayPanelsCount}
                value={panelVision ? panelVision : 1}
                onChange={(e: any) => setPanelVision(e.target.value)}
                valueLabelDisplay="auto"
              />

              <h2 className="flex items-center text-xl text-center font-semibold my-4">
                Horas de Raios Solares por Ano:{" "}
                {insightOfThebuilding.solarPotential.maxSunshineHoursPerYear}
              </h2>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
