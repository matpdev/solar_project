"use client";

import PageTransitionEffect from "@/components/pageTransition/pageTransition";
import React from "react";
import LocationProvider from "./LocationsProvider";
import { MapProvider } from "./MapProvider";
import LayoutAboveAll from "@/components/layout";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PageTransitionEffect>
      <LocationProvider locationsData={[]}>
        <MapProvider>
          <LayoutAboveAll>{children}</LayoutAboveAll>
        </MapProvider>
      </LocationProvider>
    </PageTransitionEffect>
  );
}
