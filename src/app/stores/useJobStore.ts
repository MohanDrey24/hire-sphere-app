import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Job } from "../dashboard/types";

type JobState = {
  jobs: Job[];
  selectedJobId: string;
  isLoading: boolean;
  showAutocomplete: boolean;
};

type JobAction = {
  setJobs: (job: Job[]) => void;
  setSelectedJobId: (id: string) => void;
  setIsLoading: (condition: boolean) => void;
  setShowAutocomplete: (condition: boolean) => void;
};

const useJobStore = create<JobAction & JobState>()(
  persist(
    (set) => ({
      jobs: [],
      selectedJobId: "",
      isLoading: false,
      showAutocomplete: true,
      setJobs: (jobs: Job[]) => set({ jobs }),
      setSelectedJobId: (id: string) => set({ selectedJobId: id }),
      setIsLoading: (condition: boolean) => set({ isLoading: condition }),
      setShowAutocomplete: (condition: boolean) =>
        set({ showAutocomplete: condition }),
    }),
    {
      name: "show-autocomplete-storage",
      partialize: (state) => ({ showAutocomplete: state.showAutocomplete }),
    }
  )
);

export default useJobStore;
