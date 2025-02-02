export interface Company {
  id: string;
  name: string;
  description?: string;
  website?: string;
}

export interface Job {
  id: string;
  companyId: string;
  position: string;
  type: "REMOTE" | "ONSITE" | "HYBRID";
  country?: string;
  salary: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  company: Company;
  description?: string;
}

export interface SearchResponse {
  jobs: Job[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    perPage: number;
  };
}

export interface Account {
  userId: string;
  provider: string;
  providerAccountId: string;
  expires_at?: number;
}

export interface User {
  id: string;
  email: string;
  emailVerified?: string;
  name?: string;
  firstName: string;
  lastName: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  accounts: Account[];
}

export interface JobAutocomplete {
  id: string;
  companyId: string;
  position: string;
  company: {
    name: string;
  };
}

export interface Favorites {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
}

export type FavoritePayload = {
  jobId: string;
};

export interface FavoriteMutationContext {
  previousFavorites?: FavoritePayload[];
}
