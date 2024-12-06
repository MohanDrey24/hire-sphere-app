"use client";

import useJobStore from "../stores/useJobStore";
import purify from "dompurify";

type JobDetailsProp = {
  className?: string;
}

export function JobDetails ({ className }: JobDetailsProp) {
  const selectedJobId = useJobStore((state) => state.selectedJobId);
  const jobState = useJobStore((state) => state.jobs);

  const selectedJob = jobState.find((job) => job.id === selectedJobId);

 return (
  <div className={`${className} w-full h-full`}>
    <div className="w-full h-full overflow-y-auto p-4 pt-6">
      {selectedJob?.description ? (
        <div dangerouslySetInnerHTML={{ __html: purify.sanitize(selectedJob?.description) }} />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <p className="text-md">No Job Description</p>
        </div>
      )}
    </div>
  </div>
 )
};