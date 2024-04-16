import { IStateLocations } from "./requestsTypes";

export interface ILocationsContext {
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
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  insightOfThebuilding: any;
  setInsightOfThebuilding: React.Dispatch<any>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<boolean>;
  setLocations: React.Dispatch<React.SetStateAction<IStateLocations[]>>;
  myPosition: GeolocationPosition | null;
}
