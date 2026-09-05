# FlowBoard - Mini Kanban Board

<p align="center">
  <img src="./frontend/public/hero.png" alt="FlowBoard Hero Section" />
</p>

<p align="center">
  <em>A full-stack Kanban board for task management, collaboration, and seamless workflows.</em>
</p>

---

FlowBoard is a full-stack Kanban board application designed to amplify team velocity and reduce friction. It supports real-time collaboration, board sharing with granular access control, and seamless drag-and-drop task reordering.

## Features

- **Authentication**: JWT-based secure user registration and login.
- **Workflow Management**: Create multiple boards, customize columns, and manage tasks easily.
- **Task Movement**: Interactive drag-and-drop task movement with conflict-free order consistency.
- **Collaboration & Sharing**: Share boards with other registered users as a `VIEWER` or `EDITOR`.
- **Access Control**: Strict backend authorization rules preventing unauthorized cross-board access or mutations.
- **Premium UI**: Modern, glassmorphism-inspired aesthetic built with Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js 14, React (TypeScript), Tailwind CSS, dnd-kit, Lucide React
- **Backend**: Node.js, Express.js (TypeScript), Zod
- **Database**: PostgreSQL with Prisma ORM
- **DevOps**: Docker, Docker Compose

## System Architecture

```mermaid
graph TD
    Client[Client Browser / Frontend App]
    Client -->|REST API| Express[Express Backend API]
    
    subgraph Backend Services
    Express --> Auth[Auth Middleware]
    Auth --> TaskSvc[Task Service]
    Auth --> BoardSvc[Board Service]
    Auth --> ColSvc[Column Service]
    end
    
    TaskSvc --> Prisma[Prisma ORM]
    BoardSvc --> Prisma
    ColSvc --> Prisma
    
    Prisma --> DB[(PostgreSQL)]
```

## Database Schema

```mermaid
erDiagram
    User ||--o{ Board : "owns"
    User ||--o{ BoardAccess : "has access to"
    Board ||--o{ Column : "contains"
    Board ||--o{ BoardAccess : "is shared via"
    Column ||--o{ Task : "contains"
    
    User {
        String id
        String name
        String email
        String passwordHash
    }
    Board {
        String id
        String name
        String ownerId
    }
    BoardAccess {
        String id
        String role
        String boardId
        String userId
    }
    Column {
        String id
        String title
        Int position
    }
    Task {
        String id
        String title
        Int position
    }
```

## Setup Instructions

You can run this project using Docker (Recommended) or locally.

### 1. Run with Docker (Recommended)

1. Clone the repository and navigate to the project root.
2. Run the following command to spin up the database, backend, and frontend:
   ```bash
   docker-compose up --build
   ```
3. Access the application at [http://localhost:3000](http://localhost:3000).

*(Note: The database migrations run automatically inside the backend container).*

### 2. Manual Local Setup

**Prerequisites:**
- Node.js (v18+)
- PostgreSQL running locally.

**Backend Setup:**
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the sample:
   ```env
   PORT=5000
   NODE_ENV=development
   
   # Database Connections
   DATABASE_URL="postgresql://user:password@host:5432/db?pgbouncer=true"
   DIRECT_URL="postgresql://user:password@host:5432/db"

   # JWT
   JWT_ACCESS_SECRET="your_access_secret"
   JWT_ACCESS_EXPIRES="1d"
   JWT_REFRESH_SECRET="your_refresh_secret"
   JWT_REFRESH_EXPIRES="7d"

   # Security
   BCRYPT_SALT_ROUND=10

   # App URLs
   FRONTEND_URL="http://localhost:3000"

   # SMTP for Emails
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=465
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   SMTP_FROM="your-email@gmail.com"
   ```
4. Push the schema to your database: `npx prisma db push`
5. Start the server: `npm run dev`

**Frontend Setup:**
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   NEXT_PUBLIC_BASE_API_URL="http://localhost:5000/api/v1"
   
   # JWT Config matching backend (for edge middleware verification)
   JWT_ACCESS_SECRET="your_access_secret"
   JWT_ACCESS_EXPIRES="1d"
   JWT_REFRESH_SECRET="your_refresh_secret"
   JWT_REFRESH_EXPIRES="7d"
   ```
4. Start the application: `npm run dev`

## Core API Endpoints

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Authenticate and get JWT
- `POST /api/v1/auth/forgot-password` - Request a password reset link
- `POST /api/v1/auth/reset-password` - Set a new password
- `GET /api/v1/boards` - Fetch all accessible boards
- `POST /api/v1/boards/:id/share` - Share board with a user or update role
- `DELETE /api/v1/boards/:id/members/:memberId` - Remove a member's access from a board
- `POST /api/v1/columns` - Create a column inside a board
- `PATCH /api/v1/tasks/:id/move` - Move task within/across columns securely
