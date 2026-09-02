import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BoardController } from './board.controller';
import { BoardValidation } from './board.validation';

const router = express.Router();

router.post('/', auth(), validateRequest(BoardValidation.createBoardZodSchema), BoardController.createBoard);
router.get('/', auth(), BoardController.getAllBoards);
router.get('/:id', auth(), BoardController.getSingleBoard);
router.patch('/:id', auth(), validateRequest(BoardValidation.updateBoardZodSchema), BoardController.updateBoard);
router.delete('/:id', auth(), BoardController.deleteBoard);

// Sharing route
router.post('/:id/members', auth(), validateRequest(BoardValidation.shareBoardZodSchema), BoardController.shareBoard);

export const BoardRoutes = router;
