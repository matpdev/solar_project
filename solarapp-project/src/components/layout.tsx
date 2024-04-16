import { Button, CircularProgress, Input } from "@nextui-org/react";
import React from "react";
import { MdPin, MdSearch } from "react-icons/md";
import Header from "./fragments/header";
import Footer from "./fragments/footer";
import { useLocationsContext } from "@/context/locationsContext";
import Insights from "./insignts";
import HeaderLayout from "./fragments/header-layout";
import { motion } from "framer-motion";

export default function LayoutAboveAll({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, insightOfThebuilding } = useLocationsContext();
  return (
    <>
      <HeaderLayout></HeaderLayout>
      <div
        className="w-screen flex relative"
        style={{
          height: "calc(100svh - 65px)",
        }}
      >
        {isLoading && (
          <div className="absolute w-screen h-screen left-0 right-0 top-0 flex items-center justify-center z-50 bg-slate-300 opacity-80">
            <CircularProgress></CircularProgress>
          </div>
        )}
        {/* {!isLoading && insightOfThebuilding != null && ( */}
        <motion.div
          className="w-1/3 h-full bg-white md:block"
          animate={!isLoading && insightOfThebuilding != null ? "show" : "hide"}
          variants={{
            show: {
              opacity: 1,
              x: 0,
              transition: {
                ease: "easeOut",
                duration: 0.3,
              },
              display: "block",
            },
            hide: {
              x: -1020,
              opacity: 0,
              transitionEnd: {
                display: "none",
              },
            },
          }}
          style={{
            display: "none",
          }}
        >
          <Insights></Insights>
        </motion.div>
        {/* )} */}
        <div className="w-full h-full">
          <Header />
          <div className="w-full h-full">{children}</div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
