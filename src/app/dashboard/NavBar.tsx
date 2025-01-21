"use client"

import useMutationAPI from "@/hooks/useMutationAPI";
import { motion } from "framer-motion";
import useUserStore from "../stores/useUserStore";
import { useRouter } from "next/navigation";
import HDropdown from "@/components/HDropDown";
import SearchBar from "@/components/SearchBar";

type NavBarProps = {
  className?: string
}

export function NavBar ({ className }: NavBarProps) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const userState = useUserStore((state) => state.user);

  const { mutate } = useMutationAPI('/auth/signout');

  setUser()

  const handleLogout = () => {
    mutate(undefined, { 
      onSuccess: () => {
        router.refresh();
      },
      onError: () => {
        // improve error handling in the future
        console.log('log out failed')
      }
    });
  };

  const DropdownItems = ["Profile", "Logout"];

  return (
    <nav className={className}>
      <div className="fixed flex justify-between bg-slate-100 h-24 min-w-full items-center">

        <div className="ml-5 sm:ml-10 border-none bg-red-100 w-10 h-10 rounded-full" />

        <SearchBar />

        <motion.div
          className="mr-8 cursor-pointer flex"
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.8}}
        >
          <HDropdown
            userState={userState}
            label="My Account"
            aria-label="drop-down"
            items={DropdownItems}
            onLogout={handleLogout}
          />
        </motion.div>
      </div>
    </nav>
  );
}