import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma';
import ApiError from '../../errorHelpers/ApiError';
import config from '../../config';

const register = async (payload: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already in use');
  }

  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds) || 10);
  const passwordHash = await bcrypt.hash(payload.password, salt);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      passwordHash,
    },
  });

  const tokenPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };

  const accessToken = jwt.sign(tokenPayload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in as any,
  });

  return {
    accessToken,
    user: tokenPayload,
  };
};

const login = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.passwordHash);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const tokenPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };

  const accessToken = jwt.sign(tokenPayload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in as any,
  });

  return {
    accessToken,
    user: tokenPayload,
  };
};

const updateProfile = async (userId: string, payload: { name: string }) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { name: payload.name },
  });

  const tokenPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };

  const accessToken = jwt.sign(tokenPayload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in as any,
  });

  return {
    accessToken,
    user: tokenPayload,
  };
};

const changePassword = async (userId: string, payload: any) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(payload.currentPassword, user.passwordHash);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect current password');
  }

  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds) || 10);
  const passwordHash = await bcrypt.hash(payload.newPassword, salt);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
};

export const AuthService = {
  register,
  login,
  updateProfile,
  changePassword,
};
