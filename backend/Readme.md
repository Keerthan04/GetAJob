# Job Portal Backend API Documentation

## Overview

This is the backend API for the Job Portal application. It provides endpoints for user authentication, user registration, and managing job applications. The API is built using Express and Prisma.

## Database Schema

The database schema is defined using Prisma. Below is the schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id          String    @id @default(uuid())
  name        String
  email       String    @unique
  password    String
  phone       String?   // Optional Contact Number
  location    String?   // Preferred job location or current residence
  skills      String[]  // List of skills extracted from resume
  experience  Int       // Total years of experience
  education   String?   // Highest education qualification (B.Tech, MBA, etc.)
  resumeLink  String?   // Link to uploaded resume (S3, Firebase, etc.)
  portfolio   String?   // Optional portfolio or LinkedIn URL
  jobTitle    String?   // Current or last job title
  jobType     JobType[] // Preferred job type (Full-time, Internship, etc.)
  availability Boolean  @default(true) // Open to job offers?
  applications Application[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum JobType {
  FULL_TIME
  PART_TIME
  INTERNSHIP
  CONTRACT
  REMOTE
}

model Employer {
  id            String   @id @default(uuid())
  name          String   // Employer's Name (Person registering)
  email         String   @unique
  password      String
  companyName   String   // Official Company Name
  companyWebsite String? // Optional: Company Website URL
  companySize   CompanySize   @default(SMALL) // Enum: Small, Medium, Large
  industry      Industry   // Industry Type (Tech, Healthcare, etc.)
  location      String   // Headquarters or Primary Office Location
  description   String?  // Brief Company Overview
  logoUrl       String?  // Company Logo Image Link
  jobs          Job[]
  verified      Boolean  @default(true) // Indicates if the company is verified(for now put to true by default(like a badge we can add))

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum CompanySize {
  SMALL
  MEDIUM
  LARGE
}

enum Industry {
  TECH
  HEALTHCARE
  FINANCE
  EDUCATION
  MANUFACTURING
}

model Job {
  id            String    @id @default(uuid())
  title         String
  description   String
  company       String
  location      String  // Job Location
  skillsRequired String[]
  salaryRange   String?  // Example: "$50k - $70k per year"
  jobType       JobType  // Full-time, Part-time, etc.
  employerId    String
  employer      Employer @relation(fields: [employerId], references: [id])
  applications  Application[]

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Application {
  id         String  @id @default(uuid())
  jobId      String
  userId     String
  status     ApplicationStatus @default(UNDER_CONSIDERATION)
  job        Job    @relation(fields: [jobId], references: [id])
  user       User   @relation(fields: [userId], references: [id])

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

enum ApplicationStatus {
  UNDER_CONSIDERATION
  ACCEPTED
  REJECTED
}
```

## API Endpoints

### Authentication

#### Login User

**POST** `/api/auth/user/login`

Request Body:

```json
{
  "email": "user@example.com",
  "password": "password123",
}
```

Response Body:

```json
{
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "user@example.com",
    "location": "New York",
    "skills": ["JavaScript", "React"],
    "experience": 5,
    "education": "B.Tech",
    "resumeLink": "http://example.com/resume.pdf",
    "portfolio": "http://linkedin.com/in/johndoe",
    "jobTitle": "Software Engineer",
    "jobType": ["FULL_TIME"],
    "availability": true
  }
}
```

#### Register User

**POST** `/api/auth/user/register`

Request Body:

```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "phone": "1234567890",
  "location": "New York",
  "skills": ["JavaScript", "React"],
  "experience": 5,
  "education": "B.Tech",
  "resumeLink": "http://example.com/resume.pdf",
  "portfolio": "http://linkedin.com/in/johndoe",
  "jobTitle": "Software Engineer",
  "jobType": ["FULL_TIME"],
  "availability": true
}
```

Response Body:

```json
{
  "message": "User created successfully",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "user@example.com",
    "location": "New York",
    "skills": ["JavaScript", "React"],
    "experience": 5,
    "education": "B.Tech",
    "resumeLink": "http://example.com/resume.pdf",
    "portfolio": "http://linkedin.com/in/johndoe",
    "jobTitle": "Software Engineer",
    "jobType": ["FULL_TIME"],
    "availability": true
  }
}
```

#### Login Employer

**POST** `/api/auth/employer/login`

Request Body:

```json
{
  "email": "employer@company.com",
  "password": "password123",
}
```

Response Body:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "employer-id",
    "name": "Jane Smith",
    "email": "employer@company.com",
    "companyName": "Tech Corp",
    "companyWebsite": "https://techcorp.com",
    "companySize": "MEDIUM",
    "industry": "TECH",
    "location": "San Francisco",
    "description": "Leading tech company",
    "logoUrl": "https://techcorp.com/logo.png",
    "verified": true
  }
}
```

#### Register Employer

**POST** `/api/auth/employer/register`

Request Body:

```json
{
  "name": "Jane Smith",
  "email": "employer@company.com",
  "password": "password123",
  "companyName": "Tech Corp",
  "companyWebsite": "https://techcorp.com",
  "companySize": "MEDIUM",
  "industry": "TECH",
  "location": "San Francisco",
  "description": "Leading tech company",
  "logoUrl": "https://techcorp.com/logo.png"
}
```

Response Body:

```json
{
  "success": true,
  "message": "Employer Registered successfully",
  "user": {
    "id": "employer-id",
    "name": "Jane Smith",
    "email": "employer@company.com",
    "companyName": "Tech Corp",
    "companyWebsite": "https://techcorp.com",
    "companySize": "MEDIUM",
    "industry": "TECH",
    "location": "San Francisco",
    "description": "Leading tech company",
    "logoUrl": "https://techcorp.com/logo.png",
    "verified": true,
    "createdAt": "2024-01-20T12:00:00Z",
    "updatedAt": "2024-01-20T12:00:00Z"
  }
}
```

## Setup and Installation

1.Install dependencies:

```bash
npm install
```

2.Generate Prisma client:

```bash
npm run prisma:generate
```

3.Run database migrations:

```bash
npm run prisma:migrate
```

4.Start the development server:

```bash
npm run dev
```

The server will start running at `http://localhost:3000`.
