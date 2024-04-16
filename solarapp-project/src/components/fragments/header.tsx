import { Input, ScrollShadow } from "@nextui-org/react";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

import { motion, AnimatePresence } from "framer-motion";
import { useLocationsContext } from "@/context/locationsContext";
import LocationItem from "./locationItem";
import { getInsights } from "@/repo/repo";

export default function Header() {
  const [animation, setAnimation] = useState(false);
  const [search, setSearch] = useState<string>("");
  const {
    locations,
    handleLocationClick,
    setPosition,
    setIsLoading,
    setInsightOfThebuilding,
    isLoading,
  } = useLocationsContext();

  return (
    <>
      <div className="h-16 top-0 z-10 w-10/12 left-0 right-0 mx-auto my-8 rounded-md flex md:my-0 md:w-2/3 md:p-2 md:relative absolute md:-mb-16">
        <Input
          startContent={<MdSearch></MdSearch>}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          color="primary"
          classNames={{
            inputWrapper: "bg-white shadow-md",
          }}
          placeholder="Digite a sua pesquisa"
          onFocus={() => {
            setAnimation(true);
          }}
          onBlur={() => {
            setAnimation(false);
          }}
        />
        <motion.div
          className="w-full m-10 absolute top-4 left-0 right-0 bg-white mx-auto rounded-lg p-2 px-3 overflow-scroll md:w-11/12 z-50 shadow-md"
          key="animation-on-state"
          animate={animation ? "show" : "hide"}
          variants={{
            show: {
              opacity: 1,
              y: 0,
              transition: {
                ease: "easeOut",
                duration: 0.3,
              },
              display: "block",
            },
            hide: {
              y: -20,
              opacity: 0,
              transitionEnd: {
                display: "none",
              },
            },
          }}
          style={{
            display: "none",
            height: "calc(100vh - 350px)",
          }}
        >
          {locations
            .filter(
              (x) => x.name.toLowerCase().includes(search.toLowerCase()) && x
            )
            .map((location, index) => (
              <LocationItem
                title={location.name}
                street={location.description}
                key={index}
                lat={location.lat}
                lng={location.lng}
                onClick={async () => {
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
        </motion.div>
      </div>
    </>
  );
}
