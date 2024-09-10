
import { oauth2Client } from "@/logic/google-utils";
import withAuth from "@/logic/middleware/withAuth";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly", // -- require to get video list
    "https://www.googleapis.com/auth/userinfo.profile", // -- require to get user profile
    "https://www.googleapis.com/auth/userinfo.email"    // -- require to get user email
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(authUrl);
}

export default withAuth(handler);