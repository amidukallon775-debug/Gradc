
export enum UserRole {
  JobSeeker = 'Job Seeker',
  Employer = 'Employer',
  Admin = 'Admin',
}

export enum ApplicationStatus {
  Submitted = 'Submitted',
  Viewed = 'Viewed',
  Interviewing = 'Interviewing',
  Offered = 'Offered',
  Rejected = 'Rejected',
}

export enum VerificationStatus {
  Verified = 'Verified',
  Pending = 'Pending',
  NotVerified = 'Not Verified',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  companyName?: string;
  jobTitle?: string;
  location?: string;
  skills?: string[];
  education?: { degree: string; school: string; year: number }[];
  experience?: { title: string; company: string; years: string }[];
  verificationStatus?: VerificationStatus;
}

export interface Job {
  id: number;
  title: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salaryRange: string;
  description: string;
  requirements: string[];
  postedAt: string;
  employerId: number;
}

export interface Application {
  id: number;
  jobId: number;
  applicantId: number;
  status: ApplicationStatus;
  submittedAt: string;
}

export interface Post {
  id: number;
  authorId: number;
  content: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  type: 'Announcement' | 'Blog' | 'Press Release';
}

export interface Comment {
  id: number;
  authorId: number;
  text: string;
  createdAt: string;
}

export type View = 'LOGIN' | 'DASHBOARD' | 'JOBS' | 'JOB_DETAILS' | 'APPLICATIONS' | 'COMMUNITY' | 'PROFILE' | 'CHAT';