import Icon from "./Icon";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

export default function SearchBar() {
  return (
    <div className="flex border border-black rounded-md transition-colors focus-visible:border-blue-100 focus:border-blue-100 focus:border-1 shadow-sm">

      <Input
        className="w-44 sm:w-80 pr-0 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-none"
        placeholder="Search for jobs"
      />

      <motion.button
        className="p-3"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
      >
        <Icon
          alt="search"
          src="/icons/search.svg"
          height="20px"
          width="20px"
        />
      </motion.button>

    </div>
  );
}