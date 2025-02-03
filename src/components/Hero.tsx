import { Infinity } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroProps = {
  className?: string;
};

const Hero = ({ className }: HeroProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="flex h-full w-full flex-col justify-center gap-10 p-10 sm:p-20">
        <div className="flex flex-col justify-center">
          <h2 className="text-fuchsia-dark font-anta text-5xl leading-tight font-bold">
            Hire Sphere &ndash;
          </h2>
          <h3 className="text-5xl leading-snug font-bold">
            Your Gateway to Top Talent & Dream Jobs!
          </h3>
        </div>

        <div className="text-md mx-auto max-w-3xl">
          Connecting job seekers with their ideal careers and helping employers
          find the best talent. Fast, easy, and efficient job hosting to power
          the future of work.
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
  );
};

export default Hero;
