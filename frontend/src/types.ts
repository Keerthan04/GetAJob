export enum JobType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    INTERNSHIP = 'INTERNSHIP',
    CONTRACT = 'CONTRACT',
    REMOTE = 'REMOTE'
}

export enum CompanySize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE'
}

export enum Industry {
    TECH = 'TECH',
    HEALTHCARE = 'HEALTHCARE',
    FINANCE = 'FINANCE',
    EDUCATION = 'EDUCATION',
    MANUFACTURING = 'MANUFACTURING'
}

export enum ApplicationStatus {
    UNDER_CONSIDERATION = 'UNDER_CONSIDERATION',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    skills: string[];
    experience: number;
    education?: string;
    resumeLink?: string;
    portfolio?: string;
    jobTitle?: string;
    jobType: JobType[];
    availability: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Employer {
    id: string;
    name: string;
    email: string;
    companyName: string;
    companyWebsite?: string;
    companySize: CompanySize;
    industry: Industry;
    location: string;
    description?: string;
    logoUrl?: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Job {
    id: string;
    title: string;
    description: string;
    company: string;
    location: string;
    skillsRequired: string[];
    salaryRange?: string;
    jobType: JobType;
    employerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Application {
    id: string;
    jobId: string;
    userId: string;
    status: ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
}

// Response types for API calls
export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: User;
    error?: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

// Request types for API calls
export interface LoginRequest {
    email: string;
    password: string;
    role: 'user' | 'employer';
}

export interface RegisterUserRequest extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
    password: string;
}

export interface RegisterEmployerRequest extends Omit<Employer, 'id' | 'createdAt' | 'updatedAt'> {
    password: string;
}
