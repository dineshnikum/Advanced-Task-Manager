# My Task Manager

A full-stack task organizer with JWT auth, MongoDB persistence, responsive Kanban-style columns, filtering/sorting, due-date highlights, and polished gradients.

## Features
- Email/password auth with hashed credentials; JWT-protected task APIs.
- Task CRUD with categories, priorities, due dates, and status transitions (todo → inProgress → completed).
- Filtering by search, priority, category; sorting by title, priority, due date, or created date.
- Due-date visuals and warnings (overdue, due soon, completed, default).
- Toast notifications and local persistence (falls back to local state if not authenticated).

## Tech Stack
- Frontend: React 19, Vite, Tailwind 4, Zustand, Axios, React Router, React Toastify.
- Backend: Node.js, Express 5, MongoDB/Mongoose, JWT, bcrypt, cors, dotenv.

## Prerequisites
- Node.js 18+ and npm.
- A MongoDB connection string (local or Atlas).

## Setup
1) Backend
```bash
cd backend
npm install
```
Create `backend/.env`:
```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-strong-secret
PORT=3000
```
Run the API:
```bash
npm run dev
```

2) Frontend
```bash
cd frontend
npm install
```
Create `frontend/.env`:
```
VITE_BACKEND_URL=http://localhost:3000
```
Run the app:
```bash
npm run dev
```

## API Overview
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/google` (stubbed).
- Tasks (auth required via `Authorization: Bearer <token>`):
  - `POST /api/tasks/create`
  - `GET /api/tasks/get`
  - `PUT /api/tasks/update/:id`
  - `DELETE /api/tasks/delete/:id`
  - `GET /api/tasks/due-soon`

## Scripts
- Backend: `npm run dev` (nodemon), `npm start`.
- Frontend: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`.

## Notes
- Set `VITE_BACKEND_URL` to your API origin when deploying.
- Unauthenticated users can still add/edit tasks locally; JWT tokens enable persistence via the backend.

