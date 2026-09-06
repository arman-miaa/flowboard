import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TaskController } from './task.controller';
import { TaskValidation } from './task.validation';

const router = express.Router();

router.patch('/:id', auth(), validateRequest(TaskValidation.updateTaskZodSchema), TaskController.updateTask);
router.delete('/:id', auth(), TaskController.deleteTask);
router.patch('/:id/move', auth(), validateRequest(TaskValidation.moveTaskZodSchema), TaskController.moveTask);

export const TaskRoutes = router;
