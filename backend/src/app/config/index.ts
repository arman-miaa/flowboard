import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 3001,
  jwt_secret: process.env.JWT_SECRET || 'super-secret-jwt-key-for-flowboard-assessment',
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '7d',
};
