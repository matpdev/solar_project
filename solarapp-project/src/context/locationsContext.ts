"use client";

import { IResponseAPI, IStateLocations } from "@/types/requestsTypes";
import { createContext, useContext } from "react";

interface ILocationsContext {
  locations: IStateLocations[];
  handleLocationClick: (index: number) => void;
  currentActiveLocation: IStateLocations | null;
  position: { lat: number; lng: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  insightOfThebuilding: any;
  setInsightOfThebuilding: React.Dispatch<any>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<boolean>;
}

export const LocationsContext = createContext<ILocationsContext>({
  locations: [],
  handleLocationClick: () => {},
  currentActiveLocation: null,
  position: {
    lat: 0,
    lng: 0,
  },
  setPosition: () => {},
  insightOfThebuilding: null,
  setInsightOfThebuilding: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useLocationsContext = () => {
  return useContext(LocationsContext);
};
