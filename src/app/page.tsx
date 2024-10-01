"use client"

import { useState } from "react";
import AuthForm from "@/components/forms/AuthForm";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <div className="h-screen flex flex-col">
      <NavBar 
        onClickLogin={() => setIsLoginPage(true)}
        onClickSignin={() => setIsLoginPage(false)}
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
        <AuthForm 
          className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6"
          isLoginPage={isLoginPage}
          setIsLoginPage={setIsLoginPage}
        />
      </div>
    </div>
  );
}
