// --- /api/videos

import { oauth2Client } from "@/logic/google";
import { getIronSessionDefaultMaxAge } from "@/logic/iron-session-utils";
import { getUserVideos } from "@/logic/utils";
import { LoginStatus, Pages } from "@/types/enums";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getIronSessionDefaultMaxAge(req, res);
    const { code } = session;

    console.log(`code : ${code}`);

    if (!code) {
      console.error(`code is empty`);
      res.redirect(`${Pages.Login}/?status=${LoginStatus.LoginRequired}`);
      return;
    }

    // Exchange authorization code for access tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const items = (await getUserVideos(oauth2Client)) ?? [];
    console.log(`items.length : ${items.length}`);

    res.redirect(`${Pages.Videos}?length=${items.length}`);
  } catch (error) {
    console.log(error);
    res.redirect(`${Pages.Login}/?status=${LoginStatus.LoginRequired}`);
  }
}
