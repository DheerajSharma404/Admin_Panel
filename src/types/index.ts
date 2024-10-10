import { IconType } from "react-icons";

export interface IAuth {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IQuotes {
  quote: string;
  author: string;
  id: number;
}
export interface ITaskCards {
  id: string;
  priority: string;
  task: string;
  projectname: string;
  status: string;
  dueDate: string;
  assignee: string[];
  totalMembers: number;
}

export interface INavLinkUser {
  name: string;
  path: string;
}
export interface IProgressCounter {
  progress: number;
  size: number;
}

export interface IUserDashboardCards {
  title: string;
  score: number;
  icon: IconType;
  totalScore: number;
}

export interface IModal {
  modal: boolean;
  data: string;
}

export interface IEvent {
  title: string;
  start: Date;
  end: Date;
  type: 'event' | 'leave';
  status?: 'pending' | 'approved' | 'rejected';
}

export interface ProductFormValues {
  productTitle: string;
  productDescription: string;
  productCategory: string;
  productThumbnail: File | null;
  productSample: File | null;
  productFile: File | null;
}
export interface ITable {
  headings: string[];
  data: any[];
}
export interface Product {
  _id: string;
  productTitle: string;
  productDescription: string;
  productCategory: string;
  productThumbnail: string;
  productSample: string;
  productFile: string;
}

export interface JobApplication {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  portfolioLink: string;
  coverNote: string;
  resumeLink: string;
  coverLetterLink: string;
}

export interface JobData {
  _id: string | any;
  jobTitle: string;
  jobDescription: string;
  skillsRequired: string[];
  location?: string;
  jobType?: string;
  thumbnail: string | File | null;
  applicationCount?: number;
  applicationDetails?: JobApplication[];
}

export interface JobDataResponse {
  success: boolean;
  data: {
    jobs: JobData[];
    currentPage: number;
    totalPages: number;
    totalJobs: number;
  };
}
export interface JobApplicationResponse {
  success: boolean;
  data:{
    jobs:JobApplication[],
    currentPage:number,
    totalPages:number,
    totalJobs:number
  }
}
export interface singleJobDataResponse {
  success: boolean;
  data:  JobData;
} 

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
