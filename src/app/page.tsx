"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import Loginform from "@/components/forms/Loginform";
import NavBar from "@/components/NavBar";
import SignupForm from "@/components/forms/SignupForm";

const PAGES = {
  LOGIN: "login",
  SIGNUP: "signup",
} as const;

type PageType = typeof PAGES[keyof typeof PAGES]

export default function Home() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const cleanQueryParams = useCallback(() => {
    const currentPage = searchParams.get("page");
    const newParams = new URLSearchParams();

    if (currentPage && Object.values(PAGES).includes(currentPage as PageType)) {
      newParams.set("page", currentPage);
    } else {
      newParams.set("page", PAGES.LOGIN);
    }

    if (searchParams.toString() !== newParams.toString()) {
      router.replace(`${pathName}?${newParams.toString()}`);
      return PAGES.LOGIN;
    }

    return currentPage as PageType || PAGES.LOGIN;
  }, [searchParams, router, pathName]);

  const handleNavigation = useCallback((page: PageType) => {
    const params = new URLSearchParams({ page })
    router.push(`?${params.toString()}`)
  }, [router])

  const currentPage = cleanQueryParams();

  return (
    <div className="h-screen flex flex-col">

      <NavBar 
        onClickLogin={() => handleNavigation(PAGES.LOGIN)}
        onClickSignUp={() => handleNavigation(PAGES.SIGNUP)}
        className="h-16"
      />

      <div className="flex-1 flex flex-row">
        <div className="hidden sm:hidden lg:block w-0 lg:w-1/2 xl:w-1/2 relative overflow-hidden">
          <img 
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/palette-ball.png"
            alt="Palette ball"
          />
        </div>

        { currentPage === PAGES.LOGIN ? 
          <Loginform 
            className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6" 
            onClick={() => handleNavigation(PAGES.SIGNUP)}
          /> : 
          <SignupForm />
        }

      </div>
    </div>
  );
}
