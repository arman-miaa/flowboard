# FlowBoard

FlowBoard is a modern, intuitive Mini Kanban Board designed to help teams organize tasks, collaborate in real-time, and streamline their workflow. It allows you to create customizable boards, manage columns, and move tasks with seamless drag-and-drop interactions.

## 🚀 Features

- **Authentication & Authorization**: Secure token-based registration and login.
- **Board Sharing**: Own boards and share access with other registered users securely.
- **Role-based Access**: Users can only view or modify boards they have explicit access to.
- **Interactive Kanban Board**: Fully functional drag-and-drop task movement.
- **Workflow Management**: Create, edit, and delete boards, columns, and tasks.
- **Order Consistency**: Stable task ordering algorithm for conflict-free rearranging.
- **Dynamic Theming**: Full support for Dark & Light modes with a sleek UI built on Shadcn and Tailwind CSS.
- **Fully Responsive**: Optimized for desktops, tablets, and mobile devices.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Shadcn UI
- **State Management**: Zustand
- **Drag & Drop**: `@hello-pangea/dnd`

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT) & bcrypt

---

## 📦 Local Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (or Docker to run the database)
- `pnpm` (recommended) or `npm`

### 1. Database Setup (Docker - Recommended)
A `docker-compose.yml` file is included to easily spin up a local PostgreSQL instance.

```bash
# Start the PostgreSQL database
docker compose up -d postgres
```

### 2. Backend Setup
Navigate into the backend directory and set up the environment.

```bash
cd backend
```

Create a `.env` file in the `backend` directory based on the `.env.example`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/flowboard?schema=public"
PORT=5000
JWT_SECRET="your_super_secret_jwt_key_here"
```

Install dependencies, run migrations, and start the server:
```bash
pnpm install
npx prisma generate
npx prisma migrate dev --name init
pnpm run dev
```
The backend API will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate into the frontend directory, and set up the environment.

```bash
cd frontend
```

Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
```

Install dependencies and start the development server:
```bash
pnpm install
pnpm run dev
```
The application will run on `http://localhost:3000`.

---

## 🏗 System Architecture & Task Movement
- **Task Order Logic**: Tasks are stored with a unique `position` index. When a task is moved via drag-and-drop (within the same column or across columns), the system calculates the new order index by averaging the position values of the adjacent tasks. This ensures `O(1)` time complexity for movement operations without requiring bulk updates to sibling tasks.
- **Access Control**: A centralized middleware validates tokens and ensures users are authorized via a `BoardShare` relational table before performing any mutations.
