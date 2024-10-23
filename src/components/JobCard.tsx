import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import dayjs from 'dayjs'

interface Job {
  id: string;
  companyId: string;
  position: string;
  location: string;
  country?: string;
  salary: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

interface CardProps {
  jobData: Job[] | undefined;
};

export default function JobCard ({ jobData }: CardProps) {
  const computeTotalDays = (createdAt: string) => {
    const currentDate = dayjs()
    const createdDate = dayjs(createdAt)
    return currentDate.diff(createdDate, 'day')
  }

  return (
    <div className="grid gap-4 p-4">
    { jobData?.map((job: Job) => (
      <Card 
        key={job.id}
        className="w-60 min-h-60 flex flex-col"
      >
        <CardHeader>
          <CardTitle>{job.position}</CardTitle>
          <CardDescription>Company</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow text-sm">
          <p>${job.salary}</p>
          <p>{job.location}</p>
          <p>{job.country}</p>
        </CardContent>
        <p className="text-muted-foreground text-xs ml-6 mb-2">{computeTotalDays(job.createdAt)} days ago</p>
      </Card>
      ))
    }
    </div>
  );
}

