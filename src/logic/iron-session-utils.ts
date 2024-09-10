import { IronSessionData } from "@/types/types";
import { getIronSession, IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME, MAX_AGE_SEC, } from "./constants";

export function getIronSessionDefaultMaxAge(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<IronSession<IronSessionData>> {
  const sessionOptions = {
    password: process.env.IRON_SESSION_PASSWORD!,
    cookieName: COOKIE_NAME,
    maxAge: MAX_AGE_SEC, 
  };
  return getIronSession<IronSessionData>(req, res, sessionOptions);
}

/**
 * destroy the cookie
 * @param session 
 */
export function logout(session: IronSession<IronSessionData>){
  session.destroy(); // --- this is actually logout , start from scratch
}