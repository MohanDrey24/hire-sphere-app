import { AnimatePresence, motion } from "framer-motion";

interface HexagonProps {
  size: "sm" | "md" | "lg";
  color?: "blue" | "red" | "green" | "orange";
  children?: React.ReactNode;
  className?: string;
}

const Hexagon = ({ size = "md", color = "orange", children, className }: HexagonProps) => {
  const sizeClasses = {
    sm: "w-16 h-14",
    smOutside: "w-[68px] h-[60px]",
    md: "w-24 h-21",
    mdOutside: "w-[68px] h-[60px]",
    lg: "w-32 h-28",
    lgOutside: "w-[68px] h-[60px]",
  };

  const colorClasses = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    orange: "bg-orange-400",
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`bg-black ${sizeClasses[`${size}Outside`]} flex items-center justify-center cursor-pointer`}
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0 }}
        // animate={{ rotate: 360, transition: { duration: 3, ease: "easeInOut"} }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        exit={{ opacity: 0 }}
        style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
      >
        <div
          className={`
            ${sizeClasses[size]} 
            ${colorClasses[color]} 
            clip-path-hexagon
            ${className}
          `}
          style={{
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Hexagon;
