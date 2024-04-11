"use client";

import React from "react";
import { IResponseAPI, IStateLocations } from "@/types/requestsTypes";
import { LocationsContext } from "@/context/locationsContext";

export default function LocationProvider({
  children,
  locationsData = [],
}: {
  children: React.ReactNode;
  locationsData: IResponseAPI[];
}) {
  const [locations, setLocations] = React.useState<IStateLocations[]>(
    locationsData.length > 0
      ? locationsData.map((location) => ({ ...location, isSelected: false }))
      : []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [insight, setInsight] = React.useState<any>(null);

  let [position, setPosition] = React.useState({
    lat: 37.44770507437111,
    lng: -122.1591258640483,
  });

  const [currentActiveLocation, setCurrentActiveLocation] =
    React.useState<IStateLocations | null>(null);

  function handleLocationClick(index: number) {
    let copyLocations = locations;
    for (let i = 0; i < copyLocations.length; ++i) {
      copyLocations[i].isSelected = false;
    }
    copyLocations[index].isSelected = !copyLocations[index].isSelected;
    setLocations([...copyLocations]);
    setCurrentActiveLocation(copyLocations[index]);
  }

  return (
    <LocationsContext.Provider
      value={{
        locations: locations,
        handleLocationClick,
        currentActiveLocation: currentActiveLocation,
        position,
        setPosition,
        insightOfThebuilding: insight,
        setInsightOfThebuilding: setInsight,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
}
