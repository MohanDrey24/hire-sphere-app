import { memo } from "react";
import { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface NavBarProps {
  onClickLogin?: MouseEventHandler<HTMLButtonElement>;
  onClickSignUp?: MouseEventHandler<HTMLButtonElement>;
}

function NavBar({ onClickLogin, onClickSignUp }: NavBarProps) {
  return (
    <nav className="flex h-24 items-center">
      <Image
        src="/icons/hire_sphere_logo.svg"
        width={240}
        height={240}
        alt="HS Logo"
        className="ml-5 hidden sm:block"
      />
      <Image
        src="/icons/sphere.svg"
        width={70}
        height={70}
        alt="Sphere Logo"
        className="ml-5 block sm:hidden"
      />
      <div className="ml-auto flex space-x-4 px-12 *:h-8 *:w-20">
        <Button variant="fuchsia" onClick={onClickLogin}>
          <span className="font-bold text-fuchsia-light">Log in</span>
        </Button>
        <Button variant="brown" onClick={onClickSignUp}>
          <span className="font-bold">Sign Up</span>
        </Button>
      </div>
    </nav>
  );
}

export default memo(NavBar);
