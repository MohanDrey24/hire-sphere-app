import { create } from 'zustand';
import type { Job } from '../dashboard/types';

type JobState = {
  jobs: Job[];
  selectedJobId: string;
  showAutocomplete: boolean;
};

type JobAction = {
  setJobs: (job: Job[]) => void;
  setSelectedJobId: (id: string) => void;
  setShowAutocomplete: (condition: boolean) => void;
};

const useJobStore = create<JobState & JobAction>((set) => ({
  jobs: [],
  selectedJobId: "",
  showAutocomplete: true,
  setJobs: (jobs: Job[]) => set({ jobs }),
  setSelectedJobId: (id: string) => set({ selectedJobId: id }),
  setShowAutocomplete: (condition) => set({ showAutocomplete: condition }),
}))

export default useJobStore;