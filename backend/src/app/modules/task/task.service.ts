import prisma from '../../config/prisma';
import ApiError from '../../errorHelpers/ApiError';
import httpStatus from 'http-status-codes';
import { ColumnService } from '../column/column.service';

const createTask = async (userId: string, columnId: string, payload: any) => {
  const column = await prisma.column.findUnique({ where: { id: columnId }});
  if (!column) throw new ApiError(httpStatus.NOT_FOUND, 'Column not found');

  await ColumnService.checkEditorAccess(column.boardId, userId);

  return prisma.task.create({
    data: {
      ...payload,
      columnId,
    },
  });
};

const updateTask = async (userId: string, taskId: string, payload: any) => {
  const task = await prisma.task.findUnique({ 
    where: { id: taskId },
    include: { column: true } 
  });
  if (!task) throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');

  await ColumnService.checkEditorAccess(task.column.boardId, userId);

  return prisma.task.update({
    where: { id: taskId },
    data: payload,
  });
};

const deleteTask = async (userId: string, taskId: string) => {
  const task = await prisma.task.findUnique({ 
    where: { id: taskId },
    include: { column: true } 
  });
  if (!task) throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');

  await ColumnService.checkEditorAccess(task.column.boardId, userId);

  return prisma.task.delete({
    where: { id: taskId },
  });
};

const moveTask = async (userId: string, taskId: string, payload: { columnId: string; position: number }) => {
  const task = await prisma.task.findUnique({ 
    where: { id: taskId },
    include: { column: true } 
  });
  if (!task) throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');

  await ColumnService.checkEditorAccess(task.column.boardId, userId);

  const destColumn = await prisma.column.findUnique({ where: { id: payload.columnId }});
  if (!destColumn) throw new ApiError(httpStatus.NOT_FOUND, 'Destination column not found');

  if (destColumn.boardId !== task.column.boardId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot move tasks across different boards');
  }

  const newPosition = payload.position;
  const oldPosition = task.position;
  const isSameColumn = task.columnId === payload.columnId;

  return prisma.$transaction(async (tx) => {
    if (isSameColumn) {
      if (newPosition === oldPosition) return task; 

      if (newPosition > oldPosition) {
        await tx.task.updateMany({
          where: {
            columnId: task.columnId,
            position: { gt: oldPosition, lte: newPosition },
          },
          data: { position: { decrement: 1 } },
        });
      } else {
        await tx.task.updateMany({
          where: {
            columnId: task.columnId,
            position: { gte: newPosition, lt: oldPosition },
          },
          data: { position: { increment: 1 } },
        });
      }
    } else {
      await tx.task.updateMany({
        where: {
          columnId: task.columnId,
          position: { gt: oldPosition },
        },
        data: { position: { decrement: 1 } },
      });

      await tx.task.updateMany({
        where: {
          columnId: payload.columnId,
          position: { gte: newPosition },
        },
        data: { position: { increment: 1 } },
      });
    }

    return tx.task.update({
      where: { id: taskId },
      data: {
        columnId: payload.columnId,
        position: newPosition,
      },
    });
  });
};

export const TaskService = {
  createTask,
  updateTask,
  deleteTask,
  moveTask,
};
