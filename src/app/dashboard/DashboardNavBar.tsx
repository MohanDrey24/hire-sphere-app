import Icon from "@/components/Icon";
import { Input } from "@/components/ui/input";

export function DashboardNavBar () {
  return (
    <div className="flex justify-between bg-slate-100 h-20 min-w-full items-center">
      <div className="border-none ml-10 bg-red-100 w-10 h-10 rounded-full" />

      {/* Icon should be an optional prop for Input component */}
      <div className="flex flex-row relative">
        <Input
          className="w-[300px]"
          placeholder="Search for jobs"
        />
        <Icon
          className="absolute inset-y-0 right-[15px] top-[15px] cursor-pointer"
          alt="search"
          src="/icons/search.svg"
          height="20px"
          width="20px"
        />
      </div>

      <div className="">Logo dropdown</div>
    </div>
  );
}