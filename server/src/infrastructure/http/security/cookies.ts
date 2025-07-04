import { Response } from "express";

function setTokenCookie(token: string, res: Response) {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
    path: "/", 
  })
}

export default setTokenCookie;