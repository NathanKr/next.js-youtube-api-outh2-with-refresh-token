// /types/next.d.ts

import { OAuth2Client } from 'google-auth-library';
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    oauth2Client?: OAuth2Client;
  }
}
