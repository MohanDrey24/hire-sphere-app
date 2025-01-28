"use client";

import { memo } from "react";
import { MouseEventHandler } from "react";
import { Button } from "./ui/button";

interface NavBarProps {
  className?: string | undefined;
  onClickLogin?: MouseEventHandler<HTMLButtonElement>;
  onClickSignUp?: MouseEventHandler<HTMLButtonElement>;
}

function NavBar({ className, onClickLogin, onClickSignUp }: NavBarProps) {
  return (
    <nav className={`border-gray flex items-center border-b-2 ${className}`}>
      <div className="ml-10 h-10 w-10 rounded-full border-none bg-red-100" />
      <div className="ml-auto space-x-4 px-12 *:h-8 *:w-20">
        <Button variant="outline" onClick={onClickLogin}>
          Log in
        </Button>
        <Button onClick={onClickSignUp}>Sign Up</Button>
      </div>
    </nav>
  );
}

export default memo(NavBar);
