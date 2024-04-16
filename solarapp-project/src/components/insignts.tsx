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
import { Slider, Spacer } from "@nextui-org/react";

export default function Insights() {
  const { insightOfThebuilding, isLoading } = useLocationsContext();
  let [panelVision, setPanelVision] = useState(1);

  if (!isLoading && !!insightOfThebuilding?.error)
    return (
      <div className="flex flex-col items-center justify-center text-center h-full">
        <p className="font-semibold">
          Nenhum dado encontrado com esta localização
        </p>
      </div>
    );

  let yearTotalSavings = 0,
    currentSavings = 0;
  // Flag with John re uncertainity with calculations here.
  if (insightOfThebuilding) {
    yearTotalSavings = Math.round(
      (insightOfThebuilding?.solarPotential?.maxArrayPanelsCount *
        insightOfThebuilding?.solarPotential?.maxSunshineHoursPerYear *
        insightOfThebuilding?.solarPotential?.panelCapacityWatts) /
        1000
    );
    currentSavings = Math.round(
      (panelVision *
        insightOfThebuilding?.solarPotential?.maxSunshineHoursPerYear *
        insightOfThebuilding?.solarPotential?.panelCapacityWatts) /
        1000
    );
  }

  return (
    <div className="h-full overflow-scroll py-5 px-5 flex flex-col items-center">
      {!isLoading && insightOfThebuilding != null && (
        <>
          <h2 className="flex items-center text-xl text-center font-semibold mb-5">
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

          <h2 className="flex items-center text-xl text-center font-semibold my-5">
            Economia por ano (kw/h)
          </h2>
          <div className="flex items-center justify-between ">
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
          <p className="text-center mt-5 font-medium">{panelVision} Paineis</p>

          <Slider
            step={1}
            maxValue={insightOfThebuilding.solarPotential.maxArrayPanelsCount}
            minValue={1}
            value={panelVision ? panelVision : 1}
            onChange={(e) => setPanelVision(e as number)}
          />

          <h2 className="flex items-center text-xl text-center font-semibold my-4">
            Horas de Raios Solares por Ano:{" "}
            {insightOfThebuilding.solarPotential.maxSunshineHoursPerYear}
          </h2>
        </>
      )}
    </div>
  );
}
