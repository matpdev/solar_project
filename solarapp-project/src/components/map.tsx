"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  HeatmapLayer,
  InfoWindow,
  Marker,
  OverlayView,
  useGoogleMap,
} from "@react-google-maps/api";
import { useLocationsContext } from "@/context/locationsContext";
import { IStateLocations } from "@/types/requestsTypes";

import IconUser from "@/utils/icon-user.json";

import { IoTriangle } from "react-icons/io5";
import { getInsights } from "@/repo/repo";
import Lottie from "lottie-react";

const defaultMapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px 15px 0px 0px",
};

const defaultMapZoom = 12;

export default function MapComponent({
  locationsData = [],
}: {
  locationsData: IStateLocations[];
}) {
  const {
    locations,
    handleLocationClick,
    position,
    insightOfThebuilding,
    setPosition,
    setLocations,
    setIsLoading,
    setInsightOfThebuilding,
    isLoading,
    setZoom,
    zoom,
    myPosition,
  } = useLocationsContext();

  useEffect(() => {
    setIsLoading(true);
    setLocations(locationsData);
    setIsLoading(false);
  }, []);

  console.log(insightOfThebuilding);

  return (
    <div className="w-full h-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={position}
        zoom={zoom}
        options={{
          mapId: "1c19d8cb8ae129e0",
          disableDefaultUI: true,
        }}
      >
        {locations.map((location, index) => (
          <Marker
            onClick={async (e) => {
              e.domEvent.preventDefault();
              handleLocationClick(index);
              setPosition({ lat: location.lat, lng: location.lng });
              setZoom(18);
              if (isLoading) return;
              setIsLoading(true);
              try {
                let data = await getInsights(location.lat, location.lng);
                setInsightOfThebuilding(data);
                setIsLoading(false);
              } catch (error) {
                setIsLoading(false);
              }
            }}
            position={{ lat: location.lat, lng: location.lng }}
            key={index}
          >
            {location.isSelected && insightOfThebuilding != null && (
              <InfoWindow>
                <div className="flex flex-col items-center">
                  <p className="font-bold text-xl">{location.name}</p>
                  <p className="my-2">{location.description}</p>
                  <div className="flex gap-2">
                    <p className="">{location.lat}</p>|
                    <p className="">{location.lng}</p>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
        {myPosition != null && (
          <OverlayView
            position={{
              lat: myPosition?.coords.latitude,
              lng: myPosition?.coords.longitude,
            }}
            mapPaneName={"floatPane"}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <Lottie
                animationData={IconUser}
                style={{
                  width: 25,
                }}
              />
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  );
}
