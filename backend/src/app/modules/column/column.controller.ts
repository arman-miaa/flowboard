import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { ColumnService } from './column.service';

const createColumn = catchAsync(async (req: Request, res: Response) => {
  const result = await ColumnService.createColumn(req.user!.userId, req.params.boardId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: result
  });
});

const updateColumn = catchAsync(async (req: Request, res: Response) => {
  const result = await ColumnService.updateColumn(req.user!.userId, req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result
  });
});

const deleteColumn = catchAsync(async (req: Request, res: Response) => {
  await ColumnService.deleteColumn(req.user!.userId, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted'
  });
});

export const ColumnController = {
  createColumn,
  updateColumn,
  deleteColumn,
};
