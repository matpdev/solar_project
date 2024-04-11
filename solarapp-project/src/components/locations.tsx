"use client";

import { useLocationsContext } from "@/context/locationsContext";
import React, { useState } from "react";
import LocationItem from "./fragments/locationItem";
import { getInsights } from "@/repo/repo";
import { Input, TextField } from "@mui/material";

export default function Locations() {
  const {
    locations,
    handleLocationClick,
    setPosition,
    setInsightOfThebuilding,
    isLoading,
    setIsLoading,
  } = useLocationsContext();
  const [search, setSearch] = useState("");
  return (
    <div className="w-3/12 bg-slate-400 h-full rounded-md overflow-scroll p-2">
      <div>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar a estrutura"
          variant="outlined"
          color="primary"
          fullWidth
          sx={{
            root: {
              "& .MuiFilledInput-root": {
                background: "rgb(232, 241, 250)",
              },
            },
          }}
        ></TextField>
      </div>
      {locations
        .filter((x) => x.name.includes(search) && x)
        .map((location, index) => (
          <LocationItem
            title={location.name}
            street={location.description}
            key={index}
            onClick={async function () {
              handleLocationClick(index);
              setPosition({ lat: location.lat, lng: location.lng });
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
            isSelected={location.isSelected}
          ></LocationItem>
        ))}
    </div>
  );
}
