import { IconType } from "react-icons";
import { FeedbackFormValues } from "../pages/workshopModule/AssesmentForm";

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
  type: "event" | "leave";
  status?: "pending" | "approved" | "rejected";
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
  resume: string;
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
  message?: string;
  data: {
    jobs: JobData[];
    currentPage: number;
    totalPages: number;
    totalJobs: number;
    message?: string;
  };
}
export interface JobApplicationResponse {
  success: boolean;
  data: {
    jobs: JobApplication[];
    currentPage: number;
    totalPages: number;
    totalJobs: number;
  };
}
export interface singleJobDataResponse {
  success: boolean;
  data: JobData;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface DashboardDataResponse {
  success: boolean;
  message: string;
  data: {
    totalJobs: number;
    totalUsers: number;
    totalJobApplications: number;
    totalProducts: number;
    salesData: {
      month: string;
      sales: number;
    }[];
  };
}

export interface WorkshopEnquiry {
  _id: string;
  name: string;
  age: string;
  guardianName: string;
  guardianContact: string;
  guardianEmail?: string;
  city: string;
  duration: string;
  workshop: string;
}

export interface WorkshopEnquiriesListResponse {
  success: boolean;
  message: string;
  data: {
    enquiryData: WorkshopEnquiry[];
    currentPage: number;
    totalPages: number;
    totalEnquiries: number;
  };
}

export interface SingleWorkshopEnquiryResponse {
  success: boolean;
  message: string;
  data: WorkshopEnquiry;
}

export interface User {
  _id: string;
  clerkId: string;
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  picture: string;
}
export interface CallRequestsResponse {
  success: boolean;
  message: string;
  data: {
    callRequestData: CallRequest[];
    currentPage: number;
    totalPages: number;
    totalCallRequests: number;
  };
}
export type CallRequest = {
  _id: string;
  name: string;
  phone: string;
  status: string;
  assignedTo?: User[];
};

export interface AdminUser {
  _id: string;
  name: string;
}
export interface StatusConfig {
  [key: string]: {
    bg: string;
    text: string;
    border: string;
    label: string;
  };
}

export interface AssesmentReport {
  success: boolean;
  message: string;
  data: {
    feedbacks: FeedbackFormValues[];
    currentPage: number;
    totalPages: number;
    totalFeedbacks: number;
  };
}
export interface ProductImage{
  _id?: string;
  imgaeSrc: string;
}
export interface ProductVideos{
  _id?: string;
  videoSrc: string;
}

export interface DescriptionList{
  _id?: string;
  description: string;
}

export interface ProductDescription{
  _id?: string;
  label: string;
  descriptionList:DescriptionList[]
}

export interface ProductReview{
  _id?: string;
  userId: string;
  productId: string;
  rating: number;
  review: string;
}

export interface Sku{
  _id: string;
  productTitle: string;
  productCategory: string;
  productSummary: string;
  minAge: number;
  maxAge: number;
  ageFilter: string;
  rating: string;
  paperEditionPrice: number;
  printablePrice: number;
  productImages: ProductImage[];
  productVidoes: ProductVideos[];
  productDescriptions: ProductDescription[];
  productReviews: ProductReview[];
}
export interface AllSkuData {
  success: boolean;
  message: string;
  data: {
    allproducts: Sku[];
    
  }
}