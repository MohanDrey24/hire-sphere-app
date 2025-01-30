"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import Loginform from "@/components/forms/Loginform";
import NavBar from "@/components/NavBar";
import SignupForm from "@/components/forms/SignupForm";
import { Infinity } from "lucide-react";

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
        <div className="relative hidden w-0 overflow-hidden sm:hidden lg:block lg:w-1/2 xl:w-1/2">
          <div className="flex h-full w-full flex-col justify-center gap-10 p-20">
            <div className="flex flex-col justify-center">
              <h2 className="text-fuchsia-dark font-anta text-5xl leading-tight font-bold">
                Hire Sphere &ndash;
              </h2>
              <h3 className="text-5xl leading-snug font-bold">
                Your Gateway to Top Talent & Dream Jobs!
              </h3>
            </div>

            <div className="text-md mx-auto max-w-3xl">
              Connecting job seekers with their ideal careers and helping
              employers find the best talent. Fast, easy, and efficient job
              hosting to power the future of work.
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-mint-green-light text-2xl font-bold">
                  1000+
                </span>
                <span>Jobs</span>
              </div>
              <div className="flex flex-col">
                <span className="text-mint-green-light text-2xl font-bold">
                  1000+
                </span>
                <span>Companies</span>
              </div>
              <div className="flex flex-col">
                <Infinity color="#0be0c0" size={30} />
                <span>Opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {currentPage === PAGES.LOGIN ? (
          <Loginform
            className="flex w-full flex-col items-center justify-center space-y-6 lg:w-1/2"
            onClick={() => handleNavigation(PAGES.SIGNUP)}
          />
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  );
}
