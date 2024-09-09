import axios from "axios";
import { oauth2Client } from "@/logic/google-utils";
import { getIronSessionDefaultMaxAge } from "@/logic/iron-session-utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse, IRefreshTokenOutput } from "@/types/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRefreshTokenOutput | ErrorResponse>
) {
  try {
    const session = await getIronSessionDefaultMaxAge(req, res);
    const refreshToken = session.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const url = `https://oauth2.googleapis.com/token`; // Refresh token endpoint

    const response = await axios.post(url, {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: oauth2Client._clientId!,
      client_secret: oauth2Client._clientSecret!,
    });

    const output = response.data as IRefreshTokenOutput; // Parse response
    const { tokens } = output;

    if (!tokens || !tokens.access_token) {
      console.error("Invalid refresh token response:", response.data);
      throw new Error("Invalid refresh token response");
    }

    oauth2Client.setCredentials(tokens); // Update the client instance

    // Update the session with the new access token
    session.accessToken = tokens.access_token ?? undefined;
    await session.save();

    return res.status(200).json({ ...output });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return res.status(500).json({ error: "Failed to refresh access token" });
  }
}
