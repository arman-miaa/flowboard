import prisma from '../../config/prisma';
import ApiError from '../../errorHelpers/ApiError';
import httpStatus from 'http-status-codes';
import { Role } from '@prisma/client';
import { sendEmail } from '../../utils/email';

const createBoard = async (userId: string, payload: any) => {
  return prisma.board.create({
    data: {
      ...payload,
      ownerId: userId,
    },
  });
};

const getAllBoards = async (userId: string, searchTerm?: string) => {
  const whereConditions: any = {
    OR: [
      { ownerId: userId },
      { accesses: { some: { userId } } },
    ],
  };

  if (searchTerm) {
    whereConditions.AND = {
      name: { contains: searchTerm, mode: 'insensitive' }
    };
  }

  return prisma.board.findMany({
    where: whereConditions,
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
  
  let userRole = 'VIEWER';
  if (board.ownerId === userId) {
    userRole = 'OWNER';
  } else {
    const access = board.accesses.find(a => a.userId === userId);
    if (!access) throw new ApiError(httpStatus.FORBIDDEN, 'Not allowed to view this board');
    userRole = access.role;
  }

  return { ...board, userRole };
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

  const newAccess = await prisma.boardAccess.create({
    data: {
      boardId,
      userId: targetUser.id,
      role: payload.role,
    }
  });

  const inviteLink = `${process.env.FRONTEND_URL}/dashboard/shared`;
  await sendEmail(
    targetUser.email,
    'You have been invited to a FlowBoard',
    `<p>Hello ${targetUser.name},</p>
    <p>You have been invited to collaborate on the board <strong>${board.name}</strong> as a <strong>${payload.role}</strong>.</p>
    <p>Click <a href="${inviteLink}">here</a> to view your shared boards.</p>
    <br/>
    <p>Thanks,<br/>The FlowBoard Team</p>`
  );

  return newAccess;
};

export const BoardService = {
  createBoard,
  getAllBoards,
  getSingleBoard,
  updateBoard,
  deleteBoard,
  shareBoard,
};
