import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: Number(config.smtpPort),
  secure: Number(config.smtpPort) === 465,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: config.smtpFrom,
      to,
      subject,
      html,
    });
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error to prevent failing the main transaction if email fails
  }
};
