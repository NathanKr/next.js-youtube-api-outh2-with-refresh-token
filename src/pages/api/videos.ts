// /api/videos.ts

import withAuth from "@/logic/middleware/withAuth";
import { getUserVideos } from "@/logic/google-utils";
import { Pages } from "@/types/enums";
import { OAuth2Client } from "google-auth-library";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // The oauth2Client is available in req, passed from the middleware
    const oauth2Client = req.oauth2Client as OAuth2Client;

    const items = (await getUserVideos(oauth2Client)) ?? [];
    res.redirect(`${Pages.Videos}?length=${items.length}`);
  } catch (error) {
    console.error(error);
    res.status(500).send({});
  }
}

export default withAuth(handler);
