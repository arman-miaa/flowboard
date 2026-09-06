import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ColumnController } from './column.controller';
import { ColumnValidation } from './column.validation';
import { TaskController } from '../task/task.controller';
import { TaskValidation } from '../task/task.validation';

const router = express.Router();

// Nested Task route
router.post('/:columnId/tasks', auth(), validateRequest(TaskValidation.createTaskZodSchema), TaskController.createTask);

router.patch('/:id', auth(), validateRequest(ColumnValidation.updateColumnZodSchema), ColumnController.updateColumn);
router.delete('/:id', auth(), ColumnController.deleteColumn);
export const ColumnRoutes = router;
