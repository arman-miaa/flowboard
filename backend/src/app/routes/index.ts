import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BoardRoutes } from '../modules/board/board.routes';
import { ColumnRoutes } from '../modules/column/column.routes';
import { TaskRoutes } from '../modules/task/task.routes';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/boards', route: BoardRoutes },
  { path: '/', route: ColumnRoutes }, // Mounted on / since routes include /boards/:boardId and /columns/:id
  { path: '/', route: TaskRoutes },   // Mounted on / since routes include /columns/:columnId and /tasks/:id
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
