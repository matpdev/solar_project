"use client";

import React, { useEffect, useState } from "react";
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
  const [myPosition, setMyPosition] = useState<GeolocationPosition | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [zoom, setZoom] = React.useState<number>(12);
  const [insight, setInsight] = React.useState<any>(null);

  let [position, setPosition] = React.useState({
    lat: -5.800679461020519,
    lng: -35.21531137091306,
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) => {
        setMyPosition(e);
        setPosition({ lat: e.coords.latitude, lng: e.coords.longitude });
        setZoom(18);
      });
    }
  }, []);

  return (
    <LocationsContext.Provider
      value={{
        zoom,
        setZoom,
        locations: locations,
        handleLocationClick,
        currentActiveLocation: currentActiveLocation,
        position,
        setPosition,
        insightOfThebuilding: insight,
        setInsightOfThebuilding: setInsight,
        isLoading,
        setIsLoading,
        setLocations,
        myPosition,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
}
