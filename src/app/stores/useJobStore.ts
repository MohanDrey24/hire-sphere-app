import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

const useJobStore = create<JobAction & JobState>()(
  persist(
    (set) => ({
      jobs: [],
      selectedJobId: "",
      showAutocomplete: true,
      setJobs: (jobs: Job[]) => set({ jobs }),
      setSelectedJobId: (id: string) => set({ selectedJobId: id }),
      setShowAutocomplete: (condition: boolean) => set({ showAutocomplete: condition }),
    }),
    {
      name: 'show-autocomplete-storage',
      partialize: (state) => ({ showAutocomplete: state.showAutocomplete }),
    }
  )
);

export default useJobStore;
