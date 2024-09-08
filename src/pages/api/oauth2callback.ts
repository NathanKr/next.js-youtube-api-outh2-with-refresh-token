// --- api/oauth2callback

import { getIronSessionDefaultMaxAge } from "@/logic/iron-session-utils";
import { LoginStatus, Pages } from "@/types/enums";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // --- got the code from /api/authlogin
  const { code } = req.query as { code?: string }; // Type the query parameters

  console.log(`code : ${code}`);

  if (!code) {
    res.status(400).send("Missing authorization code");
    return;
  }

  try {
    const session = await getIronSessionDefaultMaxAge(req, res);
    session.code = code;
    await session.save(); // --- encrypt the session data and set cookie

    res.redirect(`${Pages.Login}?status=${LoginStatus.LoginSuccess}`);
  } catch (error) {
    res.status(500).send({});
  }
}
