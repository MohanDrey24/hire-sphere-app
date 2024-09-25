import LoginForm from "@/components/forms/LoginForm";

export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="flex w-0 md:w-0 lg:w-[60%] h-screen bg-green-100 items-center justify-center" />
      <LoginForm />
    </div>
  );
}
