
import { oauth2Client } from "@/logic/google";
import getUserVideos from "@/logic/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const items = getUserVideos(oauth2Client)
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching videos", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
