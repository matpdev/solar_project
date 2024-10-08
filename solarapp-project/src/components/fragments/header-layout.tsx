import React, { useState } from "react";
import { motion } from "framer-motion";

import Lottie from "lottie-react";

import SunAnimaton from "@/utils/sun.json";
import clsx from "clsx";
import { Button } from "@nextui-org/react";
import { MdDataExploration } from "react-icons/md";

export default function HeaderLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div className="w-full">
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-4">
              <div className="rounded-full w-[45px] h-[45px] border overflow-hidden flex items-center justify-center">
                <Lottie
                  animationData={SunAnimaton}
                  style={{
                    width: "40px",
                  }}
                />
              </div>
              <p>Solar Info</p>
            </a>
            <div className="flex items-center lg:order-2">
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <motion.div
              className={clsx(
                "sm:hidden justify-between items-center w-full lg:!flex lg:w-auto lg:order-1 md:!opacity-100 lg:!translate-y-0",
                isOpen ? "block" : "hidden"
              )}
              id="mobile-menu-2"
              animate={isOpen ? "show" : "hide"}
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
                  y: -80,
                  opacity: 0,
                  transition: {
                    ease: "easeOut",
                    duration: 0.2,
                  },
                  transitionEnd: {
                    display: "none",
                  },
                },
              }}
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 gap-2">
                <li>
                  <Button fullWidth color="warning">
                    <a
                      href="/"
                      className="h-full w-full flex justify-center items-center"
                      aria-current="page"
                    >
                      Página Inicial
                    </a>
                  </Button>
                </li>
                <li>
                  <Button fullWidth color="warning">
                    <a
                      href="/random"
                      className="h-full w-full flex justify-center items-center"
                      aria-current="page"
                    >
                      Modo Aleatório
                    </a>
                  </Button>
                </li>
              </ul>
            </motion.div>
          </div>
        </nav>
      </header>
    </motion.div>
  );
}
