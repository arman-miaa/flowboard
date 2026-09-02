import prisma from '../../config/prisma';
import ApiError from '../../errorHelpers/ApiError';
import httpStatus from 'http-status-codes';
import { Role } from '@prisma/client';

const createBoard = async (userId: string, payload: any) => {
  return prisma.board.create({
    data: {
      ...payload,
      ownerId: userId,
    },
  });
};

const getAllBoards = async (userId: string) => {
  return prisma.board.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { accesses: { some: { userId } } },
      ],
    },
    include: {
      accesses: {
        include: { user: { select: { id: true, name: true, email: true } } }
      },
    }
  });
};

const getSingleBoard = async (userId: string, boardId: string) => {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: {
      columns: {
        orderBy: { position: 'asc' },
        include: {
          tasks: {
            orderBy: { position: 'asc' },
          }
        }
      },
      accesses: {
        include: { user: { select: { id: true, name: true, email: true } } }
      }
    },
  });

  if (!board) throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  
  // Check viewer access
  if (board.ownerId !== userId) {
    const hasAccess = board.accesses.some(a => a.userId === userId);
    if (!hasAccess) throw new ApiError(httpStatus.FORBIDDEN, 'Not allowed to view this board');
  }

  return board;
};

const updateBoard = async (userId: string, boardId: string, payload: any) => {
  const board = await prisma.board.findUnique({ where: { id: boardId }});
  if (!board) throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  if (board.ownerId !== userId) throw new ApiError(httpStatus.FORBIDDEN, 'Only owner can edit');

  return prisma.board.update({
    where: { id: boardId },
    data: payload,
  });
};

const deleteBoard = async (userId: string, boardId: string) => {
  const board = await prisma.board.findUnique({ where: { id: boardId }});
  if (!board) throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  if (board.ownerId !== userId) throw new ApiError(httpStatus.FORBIDDEN, 'Only owner can delete');

  return prisma.board.delete({
    where: { id: boardId },
  });
};

const shareBoard = async (userId: string, boardId: string, payload: { email: string, role: Role }) => {
  const board = await prisma.board.findUnique({ where: { id: boardId }});
  if (!board) throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  if (board.ownerId !== userId) throw new ApiError(httpStatus.FORBIDDEN, 'Only owner can share');

  const targetUser = await prisma.user.findUnique({ where: { email: payload.email }});
  if (!targetUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  if (targetUser.id === userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot share with yourself');

  const existingAccess = await prisma.boardAccess.findUnique({
    where: { boardId_userId: { boardId, userId: targetUser.id } }
  });

  if (existingAccess) {
    return prisma.boardAccess.update({
      where: { id: existingAccess.id },
      data: { role: payload.role }
    });
  }

  return prisma.boardAccess.create({
    data: {
      boardId,
      userId: targetUser.id,
      role: payload.role,
    }
  });
};

export const BoardService = {
  createBoard,
  getAllBoards,
  getSingleBoard,
  updateBoard,
  deleteBoard,
  shareBoard,
};
