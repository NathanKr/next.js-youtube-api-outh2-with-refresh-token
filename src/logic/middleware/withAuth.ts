import { oauth2Client } from "@/logic/google-utils";
import { getIronSessionDefaultMaxAge } from "@/logic/iron-session-utils";
import { LoginStatus, Pages } from "@/types/enums";
import { NextApiRequest, NextApiResponse } from "next";
import { isAccessTokenExpired } from "../google-utils";
import axios from "axios";
import { IRefreshTokenOutput } from "@/types/api";

const withAuth = (handler: Function) => {
  console.log(`enter withAuth`);
  
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session = await getIronSessionDefaultMaxAge(req, res);
      const { accessToken } = session;

      if (!accessToken) {
        res.redirect(`${Pages.Login}/?status=${LoginStatus.LoginRequired}`);
        return;
      }

      // Initialize oauth2Client with the accessToken from the session
      oauth2Client.setCredentials({ access_token: accessToken });

      const accessTokenExpired = await isAccessTokenExpired(accessToken);
      if (accessTokenExpired) {
        // Fetch new access token using Axios
        const response = await axios.post(`/api/refresh-token`, {
          refreshToken: session.refreshToken,
        });

        const newTokens = (response.data as IRefreshTokenOutput).tokens;
        if (!newTokens || !newTokens.access_token) {
          console.error("Invalid refresh token response:", response.data);
          res.redirect(`${Pages.Login}/?status=${LoginStatus.LoginRequired}`);
          return;
        }
        oauth2Client.setCredentials(newTokens);

        // Update the session with the new access token
        session.accessToken = newTokens.access_token;
        await session.save();
      }

      // Attach oauth2Client to the request object for the handler
      req.oauth2Client = oauth2Client;

      // Call the actual handler function now
      return handler(req, res);
    } catch (error) {
      console.error("Error refreshing access token:", error);
      res.redirect(`${Pages.Login}/?status=${LoginStatus.LoginRequired}`);
    }
  };
};

export default withAuth;