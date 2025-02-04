// doesnt work might delete later
import { signIn } from "@/app/auth";
import Icon from "./Icon";
import { Button } from "./ui/button";

interface Props {
  status: boolean;
}

export const GoogleSignIn = async ({ status }: Props) => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button
          className="flex space-x-2"
          variant="outline"
          type="submit"
          disabled={status}
        >
          <Icon
            src="/icons/google.svg"
            alt="google-icon"
            height="20px"
            width="20px"
          />
          <p>Continue with Google</p>
        </Button>
      </form>
    </>
  );
};
