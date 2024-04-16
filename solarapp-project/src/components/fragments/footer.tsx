import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";

import { motion, AnimatePresence } from "framer-motion";
import { IoTriangle } from "react-icons/io5";
import Insights from "../insignts";
import { useLocationsContext } from "@/context/locationsContext";

export default function Footer() {
  const { insightOfThebuilding, isLoading, setInsightOfThebuilding } =
    useLocationsContext();
  return (
    <motion.div
      className="absolute bottom-6 left-0 right-0 bg-white mx-auto rounded-lg w-10/12 md:!hidden shadow-md"
      key="animation-on-state"
      animate={!isLoading && insightOfThebuilding != null ? "show" : "hide"}
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
        height: "calc(100vh * 0.45)",
      }}
    >
      <div
        className="absolute top-0 right-0 w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-warning-400 transition-all rounded-full m-2 hover:text-white"
        onClick={() => {
          setInsightOfThebuilding(null);
        }}
      >
        <MdClose></MdClose>
      </div>
      <Insights></Insights>
    </motion.div>
  );
}
