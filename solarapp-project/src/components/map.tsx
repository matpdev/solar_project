"use client";
import React, { useMemo, useState } from "react";
import {
  GoogleMap,
  HeatmapLayer,
  Marker,
  useGoogleMap,
} from "@react-google-maps/api";
import { useLocationsContext } from "@/context/locationsContext";

const defaultMapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px 0px 0px 15px",
};

const defaultMapZoom = 12;

export default function MapComponent() {
  const { locations, handleLocationClick, position, setPosition } =
    useLocationsContext();

  return (
    <div className="w-9/12 h-full bg-slate-400 rounded-md">
      <div className="w-full h-full rounded-md">
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={position}
          zoom={defaultMapZoom}
          options={{
            zoomControl: true,
            tilt: 0,
            gestureHandling: "auto",
          }}
        >
          {locations.map((location, index) => (
            <Marker
              onClick={(e) => {
                console.log(location);
                e.domEvent.preventDefault();
                handleLocationClick(index);
                setPosition({ lat: location.lat, lng: location.lng });
              }}
              position={{ lat: location.lat, lng: location.lng }}
              key={index}
            ></Marker>
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
