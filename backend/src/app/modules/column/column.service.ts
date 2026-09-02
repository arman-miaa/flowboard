import prisma from '../../config/prisma';
import ApiError from '../../errorHelpers/ApiError';
import httpStatus from 'http-status-codes';

const checkEditorAccess = async (boardId: string, userId: string) => {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: { accesses: true }
  });
  if (!board) throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');

  if (board.ownerId === userId) return;

  const access = board.accesses.find(a => a.userId === userId);
  if (!access || access.role !== 'EDITOR') {
    throw new ApiError(httpStatus.FORBIDDEN, 'EDITOR permission required');
  }
};

const createColumn = async (userId: string, boardId: string, payload: any) => {
  await checkEditorAccess(boardId, userId);

  return prisma.column.create({
    data: {
      ...payload,
      boardId,
    },
  });
};

const updateColumn = async (userId: string, columnId: string, payload: any) => {
  const column = await prisma.column.findUnique({ where: { id: columnId } });
  if (!column) throw new ApiError(httpStatus.NOT_FOUND, 'Column not found');

  await checkEditorAccess(column.boardId, userId);

  return prisma.column.update({
    where: { id: columnId },
    data: payload,
  });
};

const deleteColumn = async (userId: string, columnId: string) => {
  const column = await prisma.column.findUnique({ where: { id: columnId } });
  if (!column) throw new ApiError(httpStatus.NOT_FOUND, 'Column not found');

  await checkEditorAccess(column.boardId, userId);

  return prisma.column.delete({
    where: { id: columnId },
  });
};

export const ColumnService = {
  createColumn,
  updateColumn,
  deleteColumn,
  checkEditorAccess, // exported for task service
};
