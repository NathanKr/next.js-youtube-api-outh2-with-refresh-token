// --- api/oauth2callback

import { oauth2Client } from "@/logic/google-utils";
import { getIronSessionDefaultMaxAge } from "@/logic/iron-session-utils";
import { LoginStatus, Pages } from "@/types/enums";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // --- got the code from /api/authlogin
  const { code } = req.query as { code?: string }; // Type the query parameters
  console.log(`code : ${code}`);

  if (!code) {
    res.status(400).send("Missing authorization code");
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    if(!tokens.access_token || !tokens.refresh_token){
      console.error('tokens info is not complete');
      res.redirect(`${Pages.Login}?status=${LoginStatus.LoginFailure}`);
      return;
    }
    oauth2Client.setCredentials(tokens);
    const session = await getIronSessionDefaultMaxAge(req, res);
    
    session.accessToken = tokens.access_token;
    session.refreshToken = tokens.refresh_token;
    await session.save(); // --- encrypt the session data and set cookie

    res.redirect(`${Pages.Login}?status=${LoginStatus.LoginSuccess}`);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send({});
  }
}
