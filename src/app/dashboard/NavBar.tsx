"use client";

import useMutationAPI from "@/hooks/useMutationAPI";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import HDropdown from "@/components/HDropDown";
import SearchBar from "@/components/SearchBar";
import { useCurrentUser } from "@/lib/auth";

type NavBarProps = {
  className?: string;
};

export function NavBar({ className }: NavBarProps) {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const { mutate } = useMutationAPI("/auth/signout");

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        router.refresh();
      },
      onError: () => {
        // improve error handling in the future
        console.log("log out failed");
      },
    });
  };

  const DropdownItems = ["Profile", "Logout"];

  return (
    <nav className={className}>
      <div className="fixed flex h-24 min-w-full items-center justify-between bg-slate-100">
        <div className="ml-5 h-10 w-10 rounded-full border-none bg-red-100 sm:ml-10" />

        <SearchBar />

        <motion.div
          className="mr-8 flex cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          <HDropdown
            userState={currentUser.data ?? null}
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
