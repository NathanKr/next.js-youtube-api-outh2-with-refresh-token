<h2>Motivation</h2>
I have implementation for accessing from the server youtube api using outh2 - check <a href='https://github.com/NathanKr/youtube-api-server-private'>youtube-api-server-private</a>. Now i want to add also the client and use next.js

<h2>Usage</h2>
    <ol>
        <li>From the index page, choose "Get videos".</li>
        <li>If required, log in using <code>nathan@nathankrasney.com</code>.</li>
        <li>View the number of videos.</li>
    </ol>


<h2>Design</h2>
    <ul>
        <li><strong>Architecture</strong>: Similar to <code>youtube-api-server-private</code> but improved.</li>
        <li><strong>Framework</strong>: Using Next.js, starting from the client.</li>
        <li><strong>APIs</strong>:
            <ul>
                <li><code>/api/authlogin</code>: Initate authentication process - login to google</li>
                <li><code>/api/oauth2callback</code>: Called by /api/authlogin with code </li>
                <li><code>/api/refresh-token</code>: Automatically request a new access token when the access token one hour is expired </li>
                <li><code>/api/videos</code>: Standalone API for video-related operations.</li>
            </ul>
        </li>
        <li><strong>Session Management</strong>: Using <code>iron-session</code> to store in encrypted cookie <code>accessToken</code> and <code>refreshToken</code> (valid for one week, configurable). The <code>accessToken</code> is valid for one hour, allowing usage without re-login.</li>
        <li><strong>Middleware</strong>: Using <code>withAuth</code> middleware to handle authentication, so APIs like <code>videos</code> handle only video-related operations.</li>
        <li><strong>Token Refresh</strong>: Added a <code>refresh-token</code> endpoint to automatically request a new access token when the current one expires .</li>
        <li><strong>Video Count</strong>: Passes video count back to the page, different from <code>youtube-api-server-private</code>.</li>
    </ul>

<h2>Credentials</h2>
    These must be kept privately
    <p>Same as in <code>youtube-api-server-private</code>, but here add <code>IRON_SESSION_PASSWORD</code> and put inside a next.js file <code>.env.local</code> with:</p>
    <ul>
        <li><code>GOOGLE_CLIENT_ID</code></li>
        <li><code>GOOGLE_CLIENT_SECRET</code></li>
        <li><code>NEXT_PUBLIC_YOUTUBE_REDIRECT_URI</code></li>
    </ul>


<h2>Scopes</h2>
These scopes MUST be set in the google cloude project on top of the code here

```ts
const SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly", // -- require to get video list
    "https://www.googleapis.com/auth/userinfo.profile", // -- require to get user profile
    "https://www.googleapis.com/auth/userinfo.email"    // -- require to get user email
  ];
```

<h2>Logout</h2>
To login a user to google you do in /api/authlogin

```ts
const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.redirect(authUrl);
```

But the user info : accessToken , refreshToken and userInfo are stored in iron-session session which is actially a cookie. so if you dont want the current user to keep making google API operations you simple destroy the cookie 

```ts
function logout(session: IronSession<IronSessionData>){
  session.destroy(); // --- this is actually logout , start from scratch
}
```