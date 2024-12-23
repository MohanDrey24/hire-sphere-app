import { memo } from "react";
import { MouseEventHandler } from "react";
import { Button } from "./ui/button";

interface NavBarProps {
  className?: string | undefined;
  onClickLogin?: MouseEventHandler<HTMLButtonElement>;
  onClickSignUp?: MouseEventHandler<HTMLButtonElement>;
}

function NavBar ({ className, onClickLogin, onClickSignUp }: NavBarProps) {
  return (
    <div className={`flex items-center border-gray border-b-2 ${className}`}>
      <div className="border-none ml-10 bg-red-100 w-10 h-10 rounded-full" />
      <div className="space-x-4 ml-auto px-12 *:w-20 *:h-8">
        <Button 
          variant="outline"
          onClick={onClickLogin}
        >
          Log in
        </Button>
        <Button onClick={onClickSignUp}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default memo(NavBar);