// --- api/oauth2callback

import { getAuthenticatedUserInfo, oauth2Client } from "@/logic/google-utils";
import { getIronSessionDefaultMaxAge, logout } from "@/logic/iron-session-utils";
import { LoginStatus, Pages } from "@/types/enums";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // --- got the code from /api/auth/authlogin
  const { code } = req.query as { code?: string }; // Type the query parameters
  console.log(`code : ${code}`);

  if (!code) {
    res.status(StatusCodes.BAD_REQUEST).send("Missing authorization code");
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    const {access_token , refresh_token} = tokens;
    if(!access_token || !refresh_token){
      console.error('tokens info is not complete');
      res.redirect(`${Pages.Login}?status=${LoginStatus.LoginFailure}`);
      return;
    }
    oauth2Client.setCredentials(tokens);
    const userInfo = await getAuthenticatedUserInfo(oauth2Client);// --- i do not want to check validation here i will do it when access the info
    
    let session = await getIronSessionDefaultMaxAge(req, res);
    logout(session); 
    session = await getIronSessionDefaultMaxAge(req, res);

    session.accessToken = access_token;
    session.refreshToken = refresh_token;
    session.userInfo = userInfo;
    await session.save(); // --- encrypt the session data and set cookie

    res.redirect(`${Pages.Login}?status=${LoginStatus.LoginSuccess}`);
    return;
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({});
    return;
  }
}
