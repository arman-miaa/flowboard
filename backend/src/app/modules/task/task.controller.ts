import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { TaskService } from './task.service';

const createTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.createTask(req.user!.userId, req.params.columnId, req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, data: result });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.updateTask(req.user!.userId, req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result });
});

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  await TaskService.deleteTask(req.user!.userId, req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Deleted' });
});

const moveTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.moveTask(req.user!.userId, req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result });
});

export const TaskController = {
  createTask,
  updateTask,
  deleteTask,
  moveTask,
};
