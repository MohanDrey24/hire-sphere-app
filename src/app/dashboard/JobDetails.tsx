"use client";

import useJobStore from "../stores/useJobStore";
import purify from "dompurify";
import { useSearchParams } from "next/navigation";

type JobDetailsProp = {
  className?: string;
  selectedJobId: string | null;
}

export function JobDetails ({ className, selectedJobId }: JobDetailsProp) {
  const searchParams = useSearchParams();
  const jobState = useJobStore((state) => state.jobs);
  const selectedJob = jobState.find((job) => job.id === selectedJobId);

  const renderContent = () => {
    if (selectedJob?.description) {
      return <div dangerouslySetInnerHTML={{ 
        __html: purify.sanitize(selectedJob.description)
      }} />;
    }

    const message = searchParams.has("job-id")
      ? "No Job Description"
      : "Select a Job";

    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>{message}</p>
      </div>
    )
  }

  return (
    <div className={`${className} w-full h-full`}>
      <div className="w-full h-full overflow-y-auto p-4 pt-6">
        {renderContent()}
      </div>
    </div>
  )
};