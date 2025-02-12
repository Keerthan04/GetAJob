# GetAJob - Job Portal Application(In Development)

## Overview

The Job Portal application is designed to connect job seekers with employers. It provides features for user authentication, job searching, and job application management. The application is built using a modern tech stack including React, TypeScript, Vite, Express, and Prisma.

## Project Structure

```markdown
├── backend
│   ├── prisma
│   ├── src
│   │   ├── controllers
│   │   ├── db
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   └── Types
│   ├── index.ts
│   ├── Readme.md
│   └── package.json
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   |── context
|   |   |── lib
│   ├── package.json
│   └── vite.config.ts
├── .github
│   └── workflows
├── Readme.md
└── .gitignore
`````

## Features

### Current Features

- **User Authentication**: Users and employers can register and log in.
- **Job Listings**: Users can view job listings and apply for jobs.
- **Employer Management**: Employers can post job listings and manage applications.

### In Development

- **NLP and ML Models**: Enhancing job recommendations using NLP and ML models.
- **Resume Upload**: Adding functionality for users to upload and manage their resumes.

## Setup and Installation

### Backend

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate Prisma client:

   ```bash
   npm run prisma:generate
   ```

3. Run database migrations:

   ```bash
   npm run prisma:migrate
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The server will start running at `http://localhost:3000`.

### Frontend

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

The frontend will start running at `http://localhost:5173`.

## API(move to the backend folder readme for complete api documentation)

Endpoints

### Authentication

- **Login User**: `POST /api/auth/user/login`
- **Register User**: `POST /api/auth/user/register`
- **Login Employer**: `POST /api/auth/employer/login`
- **Register Employer**: `POST /api/auth/employer/register`

### User Job Operations

- **Get All Jobs**: `GET /api/users/jobs`
- **Get Job Details**: `GET /api/users/jobs/:job_id`
- **Apply for Job**: `GET /api/users/jobs/:job_id/apply`
- **Get Applied Jobs**: `GET /api/users/applied`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
