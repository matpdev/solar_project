"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";
import Image from "next/image";
import Lottie from "lottie-react";

import SunAnimaton from "@/utils/sun.json";

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  if (!frozen) {
    return <>props.children</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const variants = {
  hidden: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  const key = usePathname();

  return (
    <AnimatePresence mode="popLayout">
      <div className="relative">
        <motion.div
          key={key}
          className="fixed z-20 w-screen h-screen bg-white overflow-hidden flex justify-center items-center top-0 left-0"
          animate="enter"
          transition={{
            ease: "circInOut",
            duration: 1.5,
            delay: 2,
          }}
          variants={{
            hidden: {
              height: "100vh",
            },
            enter: {
              height: "0",
              display: "none",
            },
          }}
        >
          <div
            className="relative shrink-0"
            style={{
              width: 360,
              height: 360,
            }}
          >
            <Lottie animationData={SunAnimaton} />
            <p className="font-semibold text-center text-xl">Solar Info</p>
          </div>
        </motion.div>
        <motion.div
          key={key}
          initial="hidden"
          animate="enter"
          variants={variants}
          transition={{ ease: "easeIn", type: "tween", duration: 0.5 }}
          className=""
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PageTransitionEffect;
