"use client";

import { useSearchParams } from "next/navigation";
import purify from "dompurify";

import { cn } from "@/lib/utils";
import useJobStore from "../stores/useJobStore";

type JobDetailsProp = {
  className?: string;
};

export function JobDetails({ className }: JobDetailsProp) {
  const searchParams = useSearchParams();

  const selectedJobId = searchParams.get("job-id");
  const jobState = useJobStore((state) => state.jobs);
  const selectedJob = jobState.find((job) => job?.id === selectedJobId);

  const renderContent = () => {
    if (selectedJob?.description) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: purify.sanitize(selectedJob.description),
          }}
        />
      );
    }

    const message = searchParams.has("job-id")
      ? "No Job Description"
      : "Select a Job";

    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>{message}</p>
      </div>
    );
  };

  return (
    <div
      className={cn(
        `h-full w-full ${selectedJobId ? "block" : "hidden"}`,
        className
      )}
    >
      <div className="h-full w-full overflow-y-auto p-4 pt-6">
        {renderContent()}
      </div>
    </div>
  );
}
