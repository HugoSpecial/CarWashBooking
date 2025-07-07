import { Response, CookieOptions } from 'express';

import { NODE_ENV } from '../../config/config.js';

function setTokenCookie(token: string, res: Response) {
  const options: CookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60,
    path: '/',
  };

  res.cookie('accessToken', token, options);
}

export default setTokenCookie;
