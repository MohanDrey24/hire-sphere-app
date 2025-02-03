"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import Loginform from "@/components/forms/Loginform";
import NavBar from "@/components/NavBar";
import SignupForm from "@/components/forms/SignupForm";
import Hero from "@/components/Hero";

const PAGES = {
  LOGIN: "login",
  SIGNUP: "signup",
} as const;

type PageType = (typeof PAGES)[keyof typeof PAGES];

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

    if (searchParams.toString().toLowerCase() !== newParams.toString()) {
      router.replace(`${pathName}?${newParams.toString()}`);
      return PAGES.LOGIN;
    }

    return (currentPage as PageType) || PAGES.LOGIN;
  }, [searchParams, router, pathName]);

  const handleNavigation = useCallback(
    (page: PageType) => {
      const params = new URLSearchParams({ page });
      router.push(`?${params.toString()}`);
    },
    [router],
  );

  const currentPage = cleanQueryParams();

  return (
    <div className="flex h-screen flex-col">
      <NavBar
        onClickLogin={() => handleNavigation(PAGES.LOGIN)}
        onClickSignUp={() => handleNavigation(PAGES.SIGNUP)}
      />

      <div className="flex flex-1 flex-row">
        <Hero className="hidden sm:hidden lg:block lg:w-1/2" />

        {currentPage === PAGES.LOGIN ? (
          <Loginform
            className="lg:w-1/2"
            onClick={() => handleNavigation(PAGES.SIGNUP)}
          />
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  );
}
