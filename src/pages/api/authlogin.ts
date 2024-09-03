// pages/api/auth/login.js

import { oauth2Client } from "@/logic/google";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
}
