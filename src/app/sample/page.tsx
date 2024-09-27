"use client"

import { motion } from "framer-motion"

export default function Sample () {
  return (
    <div className="flex flex-col h-screen w-screen justify-center">
      <motion.img 
        initial={{ opacity: 0, x: 0, rotateX: '0deg'}}
        animate={{ x: 360, opacity: 1, rotateX: '360deg' }}
        transition={{
          duration: 3,
          ease: "backInOut"
        }}
        className="w-[750px]"
        src="/images/WELCOME_NEW.svg" 
      />
      <motion.img
        initial={{ opacity: 0, x: 0, rotateX: '0deg'}}
        animate={{ x: -600, opacity: 1, rotateX: '360deg' }}
        transition={{
          duration: 3,
          ease: "backInOut"
        }}
        className="w-[200px] ml-auto pr-5"
        src="/images/TO.svg"
      />
      <motion.img
        initial={{ opacity: 0, rotateX: '0deg' }}
        animate={{ opacity: 1, rotateX: '1080deg'}}
        transition={{
          duration: 3,
          ease: "backInOut"
        }}
        className="w-[850px] mx-auto"
        src="/images/HIRE_SPHERE.svg"
      />
    </div>
  )
}