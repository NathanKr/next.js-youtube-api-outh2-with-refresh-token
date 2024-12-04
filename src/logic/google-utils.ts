import { OAuth2Client, TokenInfo } from "google-auth-library";
import { google, oauth2_v2, youtube_v3 } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_YOUTUBE_REDIRECT_URI
);

export async function getAuthenticatedUserInfo(
  oauth2Client: OAuth2Client
): Promise<oauth2_v2.Schema$Userinfo> {
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });
  try {
    const userInfo = await oauth2.userinfo.get();
    return userInfo.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}

export async function getUserVideos(
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

export async function isAccessTokenExpired(
  accessToken: string
): Promise<boolean | never> {
  try {
    console.log(`Enter isAccessTokenExpired`);
    const tokenInfo: TokenInfo = (await oauth2Client.getTokenInfo(
      accessToken
    )) as TokenInfo;

    console.log(tokenInfo);

    // Convert `expiry_date` to a local date and time
    const localExpiryDate = new Date(tokenInfo.expiry_date);
    console.log(
      "Local Expiry Date (milliseconds):",
      localExpiryDate.toString()
    ); 
    

    const currentTime = Date.now(); // Current time in milliseconds
    return tokenInfo.expiry_date <= currentTime; // Check if the token has expired
  } catch (error) {
    if (error instanceof Error && error.message.includes("invalid_token")) {
      // --- exception is thrown in case the token has expired
      return true;
    } else {
      console.error("Error checking token expiry : ", error);
      throw error;
    }
  }
}
