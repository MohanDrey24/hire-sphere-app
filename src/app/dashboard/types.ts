export interface Company {
  id: string;
  name: string;
  description?: string;
  website?: string;
};

export interface Job {
  id: string;
  companyId: string;
  position: string;
  type: 'REMOTE' | 'ONSITE' | 'HYBRID';
  country?: string;
  salary: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  company: Company;
  description?: string;
};

export interface Account {
  userId: string;
  provider: string;
  providerAccountId: string;
  password?: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
};

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
};
