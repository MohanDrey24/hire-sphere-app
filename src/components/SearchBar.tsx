import Icon from "./Icon";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

export default function SearchBar() {
  return (
    <div className="flex border rounded-md focus-within:border-blue-500 focus-within:border-2">

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