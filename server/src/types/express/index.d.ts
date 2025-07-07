import { UserRole } from '../../infrastructure/db/models/user.model.ts';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: UserRole;
      };
    }
  }
}

export {};
