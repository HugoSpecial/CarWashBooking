import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserRole } from '../../db/models/user.model.js';

function authorizedRoles(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user!.role;

    if (!roles.includes(role)) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'You are not authorized to use this operation.',
      });
    }

    next();
  };
}

export default authorizedRoles;
