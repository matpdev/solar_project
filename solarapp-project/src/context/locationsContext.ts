"use client";

import { IResponseAPI, IStateLocations } from "@/types/requestsTypes";
import { ILocationsContext } from "@/types/types";
import { createContext, useContext } from "react";

export const LocationsContext = createContext<ILocationsContext>({
  locations: [],
  handleLocationClick: () => {},
  currentActiveLocation: null,
  position: {
    lat: 0,
    lng: 0,
  },
  zoom: 12,
  setPosition: () => {},
  setZoom: () => {},
  insightOfThebuilding: null,
  setInsightOfThebuilding: () => {},
  isLoading: false,
  setIsLoading: () => {},
  setLocations: () => {},
});

export const useLocationsContext = () => {
  return useContext(LocationsContext);
};
