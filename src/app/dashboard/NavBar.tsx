"use client"

import useMutationAPI from "@/hooks/useMutationAPI";
import { motion } from "framer-motion";
import useUserStore from "../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import type { User } from "./types";
import { useEffect } from "react";
import HDropdown from "@/components/HDropDown";
import SearchBar from "@/components/SearchBar";

type NavBarProps = {
  className?: string
}

export function NavBar ({ className }: NavBarProps) {
  const setUser = useUserStore((state) => state.setUser);
  const userState = useUserStore((state) => state.user);

  const { mutate } = useMutationAPI('/auth/signout');

  const { data: userData, isSuccess: userDataSuccess} = useQuery<User>({
    queryKey: ['users'],
    queryFn: () => useFetch('/users/current')
  })

  useEffect(() => {
    if (userDataSuccess) {
      setUser(userData)
    }
  }, [userDataSuccess, userData, setUser]);

  const handleLogout = (): void => {
    mutate(undefined, { 
      onSuccess: () => {
        window.location.reload();
      },
      onError: () => {
        // improve error handling in the future
        console.log('log out failed')
      }
    });
  };

  const DropdownItems = ["Profile", "Logout"];

  return (
    <div className={className}>
      <div className="fixed flex justify-between bg-slate-100 h-24 min-w-full items-center">
        <div className="border-none ml-5 sm:ml-10 bg-red-100 w-10 h-10 rounded-full" />

        <SearchBar />

        <motion.div
          className="mr-8 cursor-pointer flex"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          <HDropdown
            userState={userState}
            label="My Account"
            items={DropdownItems}
            onLogout={handleLogout}
          />
        </motion.div>
      </div>
    </div>
  );
}