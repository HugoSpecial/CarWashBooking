import { Response, CookieOptions } from 'express';

function setTokenCookie(token: string, res: Response) {
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60,
    path: '/',
  };

  res.cookie('accessToken', token, options);
}

export default setTokenCookie;
