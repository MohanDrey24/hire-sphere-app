import { create } from 'zustand';
import type { Job } from '../dashboard/types';

type JobState = {
  jobs: Job[];
};

type JobAction = {
  setJobs: (job: Job[]) => void;
};

const useJobStore = create<JobState & JobAction>((set) => ({
  jobs: [],
  setJobs: (jobs: Job[]) => set({ jobs })
}))

export default useJobStore;