import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ColumnController } from './column.controller';
import { ColumnValidation } from './column.validation';

const router = express.Router();

router.post('/boards/:boardId/columns', auth(), validateRequest(ColumnValidation.createColumnZodSchema), ColumnController.createColumn);
router.patch('/columns/:id', auth(), validateRequest(ColumnValidation.updateColumnZodSchema), ColumnController.updateColumn);
router.delete('/columns/:id', auth(), ColumnController.deleteColumn);

export const ColumnRoutes = router;
