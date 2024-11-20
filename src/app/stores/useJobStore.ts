import { create } from 'zustand';
import type { Job } from '../dashboard/types';

type JobState = {
  jobs: Job[];
  selectedJobId: string;
};

type JobAction = {
  setJobs: (job: Job[]) => void;
  setSelectedJobId: (id: string) => void;
};

const useJobStore = create<JobState & JobAction>((set) => ({
  jobs: [],
  selectedJobId: "",
  setJobs: (jobs: Job[]) => set({ jobs }),
  setSelectedJobId: (id: string) => set({ selectedJobId: id })
}))

export default useJobStore;