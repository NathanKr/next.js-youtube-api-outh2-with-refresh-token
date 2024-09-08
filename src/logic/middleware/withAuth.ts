// /middleware/withAuth.ts

import { oauth2Client } from "@/logic/google";
import { getIronSessionDefaultMaxAge } from "@/logic/iron-session-utils";
import { LoginStatus, Pages } from "@/types/enums";
import { NextApiRequest, NextApiResponse } from "next";

const withAuth = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session = await getIronSessionDefaultMaxAge(req, res);
      const { code } = session;

      if (!code) {
        res.redirect(`${Pages.Login}/?status=${LoginStatus.LoginRequired}`);
        return;
      }

      // Exchange authorization code for access tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Attach oauth2Client to the request object for the handler
      req.oauth2Client = oauth2Client ;

      // Call the actual handler function now
      return handler(req, res);
    } catch (error) {
      console.error(error);
      res.redirect(`${Pages.Login}/?status=${LoginStatus.LoginRequired}`);
    }
  };
};

export default withAuth;
