import { memo } from "react";
import { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavBarProps {
  onClickLogin?: MouseEventHandler<HTMLButtonElement>;
  onClickSignUp?: MouseEventHandler<HTMLButtonElement>;
}

function NavBar({ onClickLogin, onClickSignUp }: NavBarProps) {
  const router = useRouter();
  return (
    <nav className="flex min-h-24 items-center px-6 sm:px-12">
      <Button
        variant="clean"
        className="flex cursor-pointer items-center justify-center gap-4"
        onClick={() => router.push("/")}
      >
        <Image
          src="/icons/sphere.svg"
          width={40}
          height={40}
          alt="Sphere Logo"
        />
        <h1 className="font-anta text-fuchsia-dark xs:block hidden text-3xl font-bold">
          Hire Sphere
        </h1>
      </Button>

      <div className="ml-auto flex space-x-6 md:space-x-8">
        <Button variant="fuchsia" onClick={onClickLogin} className="px-4 py-2">
          <span className="text-fuchsia-light font-bold">Log in</span>
        </Button>
        <Button variant="brown" onClick={onClickSignUp} className="px-4 py-2">
          <span className="font-bold">Sign Up</span>
        </Button>
      </div>
    </nav>
  );
}

export default memo(NavBar);
