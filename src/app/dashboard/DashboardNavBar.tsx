"use client"

import Icon from "@/components/Icon";
import JobCard from "@/components/JobCard";
import { Avatar,
  AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useMutationAPI from "@/hooks/useMutationAPI";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Job {
  id: string;
  companyId: string;
  position: string;
  location: string;
  country?: string;
  salary: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

export function DashboardNavBar () {

  const router = useRouter()

  const { mutate } = useMutationAPI('/auth/signout');

  const handleLogout = () => {
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

  const { isPending, data, error } = useQuery<Array<Job>>({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await fetch('http://localhost:4000/api/jobs/all', {
        credentials: 'include'
      })

      return await response.json()
    }
  })

  return (
    <>
      <div className="flex justify-between bg-slate-100 h-20 min-w-full items-center">
        <div className="border-none ml-10 bg-red-100 w-10 h-10 rounded-full" />

        <div className="flex flex-row relative">
          <Input
            className="w-[300px]"
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
          className="mr-8 cursor-pointer hidden md:flex"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          {/* should be component to remove boiler plate */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                {/* should be dynamic depending on the initials of the user */}
                <AvatarFallback className="text-white">MD</AvatarFallback>
              </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-8 hidden md:flex md:flex-col">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>

      <JobCard 
        jobData={data}
      />
    </>
  );
}