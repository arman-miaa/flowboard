# FlowBoard - Mini Kanban Board

A full-stack Kanban board application built for the Web Briks Technical Assessment.

## Tech Stack
* **Frontend**: Next.js (App Router), React, Tailwind CSS, `@dnd-kit/core`
* **Backend**: NestJS, TypeScript, PostgreSQL, Prisma
* **Infrastructure**: Docker Compose

## Prerequisites
* Node.js (v18+)
* Docker and Docker Compose
* pnpm or npm

## Getting Started

### 1. Database Setup
Start the local PostgreSQL database using Docker Compose:
```bash
docker-compose up -d
```

### 2. Backend Setup
```bash
cd backend
npm install
# Set up environment variables
cp .env.example .env
# Run database migrations
npx prisma migrate dev --name init
# Start backend server
npm run start:dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Set up environment variables
cp .env.example .env.local
# Start frontend server
npm run dev
```

The application will be available at `http://localhost:3000`.
