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
                <li><code>/api/authlogin</code>: Handles only authentication.</li>
                <li><code>/api/oauth2callback</code>: Handles only authentication.</li>
                <li><code>/api/refresh-token</code>: Automatically request a new access token when the current one expires (not working yet)</li>
                <li><code>/api/videos</code>: Standalone API for video-related operations.</li>
            </ul>
        </li>
        <li><strong>Session Management</strong>: Using <code>iron-session</code> to store <code>accessToken</code> and <code>refreshToken</code> (valid for one week, configurable). The <code>accessToken</code> is valid for one hour, allowing usage without re-login.</li>
        <li><strong>Middleware</strong>: Using <code>withAuth</code> middleware to handle authentication, so APIs like <code>videos</code> handle only video-related operations.</li>
        <li><strong>Token Refresh</strong>: Added a <code>refresh-token</code> endpoint to automatically request a new access token when the current one expires (not working yet).</li>
        <li><strong>Video Count</strong>: Passes video count back to the page, different from <code>youtube-api-server-private</code>.</li>
    </ul>

<h2>Credentials</h2>
    <p>Same as in <code>youtube-api-server-private</code>, but using <code>.env.local</code> for:</p>
    <ul>
        <li><code>GOOGLE_CLIENT_ID</code></li>
        <li><code>GOOGLE_CLIENT_SECRET</code></li>
        <li><code>NEXT_PUBLIC_YOUTUBE_REDIRECT_URI</code></li>
    </ul>
