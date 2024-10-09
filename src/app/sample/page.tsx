"use client"

import React from "react";

import { motion } from "framer-motion"
import Hexagon from "@/components/Hexagon";
import HexagonHive from "@/components/HexagonHive";
import SignupForm from "@/components/forms/SignupForm";

export default function Sample () {
  return (
    // <div className="flex flex-col h-screen w-screen justify-center">
    //   <motion.img 
    //     initial={{ opacity: 0, x: 0, rotateX: '0deg'}}
    //     animate={{ x: 360, opacity: 1, rotateX: '360deg' }}
    //     transition={{
    //       duration: 3,
    //       ease: "backInOut"
    //     }}
    //     className="w-[750px]"
    //     src="/images/WELCOME_NEW.svg" 
    //   />
    //   <motion.img
    //     initial={{ opacity: 0, x: 0, rotateX: '0deg'}}
    //     animate={{ x: -600, opacity: 1, rotateX: '360deg' }}
    //     transition={{
    //       duration: 3,
    //       ease: "backInOut"
    //     }}
    //     className="w-[200px] ml-auto pr-5"
    //     src="/images/TO.svg"
    //   />
    //   <motion.img
    //     initial={{ opacity: 0, rotateX: '0deg' }}
    //     animate={{ opacity: 1, rotateX: '1080deg'}}
    //     transition={{
    //       duration: 3,
    //       ease: "backInOut"
    //     }}
    //     className="w-[850px] mx-auto"
    //     src="/images/HIRE_SPHERE.svg"
    //   />
    // </div>

    // <div className="flex flex-row items-center">
    //   <div className="flex-col space-y-1">
    //     <Hexagon size="sm" color="blue" className="mr-1" />
    //     <Hexagon size="sm" color="blue" className="mr-1" />
    //     <Hexagon size="sm" color="blue" />
    //   </div>
    //   <div className="flex-col space-y-1 -translate-x-3">
    //     <Hexagon size="sm" color="blue" className="mr-1" />
    //     <Hexagon size="sm" color="blue" className="mr-1" />
    //     <Hexagon size="sm" color="blue" className="mr-1" />
    //     <Hexagon size="sm" color="blue" />
    //   </div>
    // </div>
    <HexagonHive />
    // <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6">
    //   <SignupForm />
    // </div>
  )
}