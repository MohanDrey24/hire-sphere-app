import { motion } from "framer-motion";

const stairAnimation = {
  initial: {
    bottom: "0%",
  },
  animate: {
    bottom: "100%",
  },
  exit: {
    bottom: ["100%", "0%"],
  },
};

const reverseIndex = (index: number) => {
  const totalSteps = 6
  return totalSteps - index - 1
}

const Stair = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => {
        return (<motion.div 
          key={index}
          variants={stairAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            duration: 0.4 ,
            ease: "easeInOut",
            delay: reverseIndex(index) * 0.1
          }}
          className="h-full w-full bg-blue-400 relative"
        />)
      })}
    </>
  )
}

export default Stair;