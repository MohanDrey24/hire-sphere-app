"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ 
  children 
} : Readonly<{ 
  children: React.ReactNode
}> ) => {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { duration: 0.4, ease: "easeInOut" }
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.1, duration: 0.4, ease: "easeInOut"}
          }}
          className="fixed h-screen w-screen pointer-events-none"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition;