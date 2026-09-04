# FlowBoard - Mini Kanban Board

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
   DATABASE_URL="postgresql://postgres:password@localhost:5432/flowboard?schema=public"
   PORT=5000
   JWT_SECRET="supersecretjwtkey_flowboard"
   JWT_EXPIRES_IN="7d"
   FRONTEND_URL="http://localhost:3000"
   ```
4. Push the schema to your database: `npx prisma db push`
5. Start the server: `npm run dev`

**Frontend Setup:**
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   NEXT_PUBLIC_BASE_API_URL="http://localhost:5000/api/v1"
   ```
4. Start the application: `npm run dev`

## Core API Endpoints

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Authenticate and get JWT
- `GET /api/v1/boards` - Fetch all accessible boards
- `POST /api/v1/boards/:id/share` - Share board with a user
- `POST /api/v1/columns` - Create a column inside a board
- `PATCH /api/v1/tasks/:id/move` - Move task within/across columns securely
