// pages/api/auth/callback.ts

import { oauth2Client } from "@/logic/google";
import getUserVideos from "@/logic/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query as { code?: string }; // Type the query parameters

  console.log(`code : ${code}`);
  

  if (!code) {
    res.status(400).send("Missing authorization code");
    return;
  }

  try {
    // Exchange authorization code for access tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const items = await getUserVideos(oauth2Client)
    console.log(items);
    

    // Store tokens in a secure place (e.g., session, database)
    // For demonstration, we'll redirect to the home page
    console.log('before redirect to /');
    
    res.redirect("/log");
  } catch (error) {
    console.error("Error retrieving tokens", error);
    res.status(500).send("Authentication failed");
  }
}
