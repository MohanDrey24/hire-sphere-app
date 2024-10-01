import { MouseEventHandler } from "react";
import { Button } from "./ui/button";

interface Props {
  className?: string | undefined;
  onClickLogin?: MouseEventHandler<HTMLButtonElement>;
  onClickSignin?: MouseEventHandler<HTMLButtonElement>;
}

export default function NavBar ({ className, onClickLogin, onClickSignin }: Props) {
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
        <Button onClick={onClickSignin}>
          Sign In
        </Button>
      </div>
    </div>
  );
}