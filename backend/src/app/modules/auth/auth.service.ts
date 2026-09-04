import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma';
import ApiError from '../../errorHelpers/ApiError';
import config from '../../config';
import { sendEmail } from '../../utils/email';

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
    phone: user.phone,
    address: user.address,
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
    phone: user.phone,
    address: user.address,
  };

  const accessToken = jwt.sign(tokenPayload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in as any,
  });

  return {
    accessToken,
    user: tokenPayload,
  };
};

const updateProfile = async (userId: string, payload: { name: string; phone?: string; address?: string }) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { 
      name: payload.name,
      ...(payload.phone && { phone: payload.phone }),
      ...(payload.address && { address: payload.address }),
    },
  });

  const tokenPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    address: user.address,
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

const forgotPassword = async (payload: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No account found with this email');
  }

  // Generate a short-lived reset token
  const resetToken = jwt.sign(
    { userId: user.id },
    config.jwt.secret as string,
    { expiresIn: '1h' }
  );

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #6366f1; margin: 0;">FlowBoard</h2>
      </div>
      <h3 style="color: #333;">Password Reset Request</h3>
      <p style="color: #555; line-height: 1.6;">Hello ${user.name},</p>
      <p style="color: #555; line-height: 1.6;">We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
      </div>
      <p style="color: #777; font-size: 14px;">This link will expire in 1 hour.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} FlowBoard. All rights reserved.</p>
    </div>
  `;

  await sendEmail(user.email, 'Reset your FlowBoard password', emailHtml);
};

const resetPassword = async (payload: any) => {
  try {
    const decoded = jwt.verify(payload.token, config.jwt.secret as string) as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds) || 10);
    const passwordHash = await bcrypt.hash(payload.newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired token');
  }
};

export const AuthService = {
  register,
  login,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
};
