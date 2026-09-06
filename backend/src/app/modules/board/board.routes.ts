import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BoardController } from './board.controller';
import { BoardValidation } from './board.validation';
import { ColumnController } from '../column/column.controller';
import { ColumnValidation } from '../column/column.validation';

const router = express.Router();

router.post('/', auth(), validateRequest(BoardValidation.createBoardZodSchema), BoardController.createBoard);
router.get('/', auth(), BoardController.getAllBoards);
router.get('/:id', auth(), BoardController.getSingleBoard);
router.patch('/:id', auth(), validateRequest(BoardValidation.updateBoardZodSchema), BoardController.updateBoard);
router.delete('/:id', auth(), BoardController.deleteBoard);

// Column route nested under board
router.post('/:boardId/columns', auth(), validateRequest(ColumnValidation.createColumnZodSchema), ColumnController.createColumn);

// Sharing route
router.post('/:id/members', auth(), validateRequest(BoardValidation.shareBoardZodSchema), BoardController.shareBoard);
router.delete('/:id/members/:memberId', auth(), BoardController.removeBoardMember);

export const BoardRoutes = router;
