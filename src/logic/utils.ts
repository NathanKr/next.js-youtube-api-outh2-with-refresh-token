import { OAuth2Client } from "google-auth-library";
import { google, youtube_v3 } from "googleapis";

async function getUserVideos(
  oauth2Client: OAuth2Client
): Promise<youtube_v3.Schema$SearchResult[] | undefined> {
  const youtubeV3 = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    // Step 1: Get the user's channel ID
    const channelResponse = await youtubeV3.channels.list({
      part: ["id"],
      mine: true,
    });

    const channelId = channelResponse.data.items?.[0]?.id;

    if (!channelId) {
      throw new Error("User's channel not found");
    }

    // Step 2: Use the channel ID to list videos
    const videoResponse = await youtubeV3.search.list({
      part: ["snippet"],
      channelId: channelId,
      maxResults: 10,
      order: "date", // You can customize this based on your needs
    });

    return videoResponse.data.items;
  } catch (error) {
    console.error("Error fetching user videos:", error);
    throw error;
  }
}

export default getUserVideos;