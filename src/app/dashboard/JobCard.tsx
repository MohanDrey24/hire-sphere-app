import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import dayjs from 'dayjs'
import { type Job } from "./types";
// import Icon from "@/components/Icon";

interface CardProps {
  jobData?: Job[];
  isPending: boolean;
};

export default function JobCard ({ jobData, isPending = false }: CardProps) {
  const computeTotalDays = (createdAt: string) => {
    const currentDate = dayjs()
    const createdDate = dayjs(createdAt)
    return currentDate.diff(createdDate, 'day')
  }


  if (isPending) {
    return (
      <div className="grid gap-4 p-4">
        <Card className="w-60 min-h-60 flex flex-col">
          <div className="animate-pulse flex flex-col gap-2 p-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="bg-slate-200 h-5 w-full rounded" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4">
    { jobData?.map((job: Job) => (
      <Card 
        key={job.id}
        className="w-60 min-h-60 flex flex-col"
      >
      
        {/* <Icon
          className="cursor-pointer self-end"
          alt="bookmark"
          src="/icons/bookmark-outline.svg"
          height="20px"
          width="20px"
        /> */}

        <CardHeader>
          <CardTitle>{job.position}</CardTitle>
          <CardDescription>{job.company.name}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow text-sm">
          <p>${job.salary}</p>
          <p>{job.type}</p>
          <p>{job.country}</p>
        </CardContent>
        <p className="text-muted-foreground text-xs ml-6 mb-2">
          {computeTotalDays(job.createdAt)} days ago
        </p>
      </Card>
      ))
    }
    </div>
  );
}

