import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { BoardService } from './board.service';

const createBoard = catchAsync(async (req: Request, res: Response) => {
  const result = await BoardService.createBoard(req.user!.userId, req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, data: result });
});

const getAllBoards = catchAsync(async (req: Request, res: Response) => {
  const result = await BoardService.getAllBoards(req.user!.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result });
});

const getSingleBoard = catchAsync(async (req: Request, res: Response) => {
  const result = await BoardService.getSingleBoard(req.user!.userId, req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result });
});

const updateBoard = catchAsync(async (req: Request, res: Response) => {
  const result = await BoardService.updateBoard(req.user!.userId, req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result });
});

const deleteBoard = catchAsync(async (req: Request, res: Response) => {
  await BoardService.deleteBoard(req.user!.userId, req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Deleted' });
});

const shareBoard = catchAsync(async (req: Request, res: Response) => {
  const result = await BoardService.shareBoard(req.user!.userId, req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result });
});

export const BoardController = {
  createBoard,
  getAllBoards,
  getSingleBoard,
  updateBoard,
  deleteBoard,
  shareBoard,
};
