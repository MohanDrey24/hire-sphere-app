"use client"

import Icon from "@/components/Icon";
import { Input } from "@/components/ui/input";
import useMutationAPI from "@/hooks/useMutationAPI";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useUserStore from "../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import type { User } from "./types";
import { useEffect } from "react";
import HDropdown from "@/components/HDropDown";

type Props = {
  className?: string
}

export function DashboardNavBar ({ className }: Props) {
  const setUser = useUserStore((state) => state.setUser);
  const userState = useUserStore((state) => state.user);

  const router = useRouter();

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
        router.push('/')
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

        <div className="flex flex-row relative">
          <Input
            className="w-44 sm:w-80"
            placeholder="Search for jobs"
          >
            <motion.button
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
          </Input>
        </div>

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