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