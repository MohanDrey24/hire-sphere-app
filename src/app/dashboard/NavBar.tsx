"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import HDropdown from "@/components/HDropDown";
import SearchBar from "@/components/SearchBar";
import useMutationAPI from "@/hooks/useMutationAPI";
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
      <div className="fixed flex h-24 min-w-full items-center justify-between">
        <img src="/icons/hire_sphere_logo.svg" className="ml-5 hidden w-60 sm:block" />
        <img src="/icons/sphere.svg" className="ml-5 block w-[70px] sm:hidden" />

        <SearchBar />

        <motion.div className="mr-8 flex cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
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
