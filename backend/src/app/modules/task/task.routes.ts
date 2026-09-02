import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TaskController } from './task.controller';
import { TaskValidation } from './task.validation';

const router = express.Router();

router.post('/columns/:columnId/tasks', auth(), validateRequest(TaskValidation.createTaskZodSchema), TaskController.createTask);
router.patch('/tasks/:id', auth(), validateRequest(TaskValidation.updateTaskZodSchema), TaskController.updateTask);
router.delete('/tasks/:id', auth(), TaskController.deleteTask);
router.patch('/tasks/:id/move', auth(), validateRequest(TaskValidation.moveTaskZodSchema), TaskController.moveTask);

export const TaskRoutes = router;
