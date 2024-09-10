<h2>Motivation</h2>
I have implementation for accessing from the server youtube api using outh2 - check <a href='https://github.com/NathanKr/youtube-api-server-private'>youtube-api-server-private</a>. Now i want to add also the client and use next.js

<h2>AI prompt</h2>
i have next.js with youtube api and Oauth2. how to implemnent using page router. i do not want to access youtube api from the client i want the server api to do it

<h2>Usage</h2>
from the index page choose "Get videos" than login using nathan@nathankrasney.com and see num videos

<h2>Design</h2>
<ul>
<li>similar to <a href='https://github.com/NathanKr/youtube-api-server-private'>youtube-api-server-private</a> but betetr
<ul>
<li>here we use next.js and we start from the client</li>
<li>videos has stand alone api</li>
<li>oauth2callback api does not handle videos only auth stuff</li>
<li>i use iron-session and i store there accessToken and refreshToken (valid for one week - configureable). aceesToken is valid for one hour so i can use it without need to login</li>
<li>i use withAuth middleware to handle authentication so api using it like videos handle only videos not auth</li>
<li>i added refresh-token end point so the app can ask again via api for access token when the 1 hour has expired automatically - this is not working yet</li>
</ul>
</li>
<li>here we pass video count back to page : videos which is different from youtube-api-server-private </li>
</ul>

<h2>Credentials</h2>
Same as in <a href='https://github.com/NathanKr/youtube-api-server-private'>youtube-api-server-private</a> but i am not using credentials.json i prefer to use .env.local where i put : GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET , NEXT_PUBLIC_YOUTUBE_REDIRECT_URI

