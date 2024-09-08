<h2>Motivation</h2>
I have implementation for accessing from the server youtube api using outh2 - check <a href='https://github.com/NathanKr/youtube-api-server-private'>youtube-api-server-private</a>. Now i want to add also the client and use next.js

<h2>AI prompt</h2>
i have next.js with youtube api and Oauth2. how to implemnent using page router. i do not want to access youtube api from the client i want the server api to do it

<h2>Usage</h2>
from the index page choose "Get videos" than login using nathan@nathankrasney.com and see num videos

<h2>Design</h2>
<ul>
<li>similar to <a href='https://github.com/NathanKr/youtube-api-server-private'>youtube-api-server-private</a> but here we use next.js and start from the client
</li>
<li>here we pass video count back to page : videos which is different from youtube-api-server-private </li>
</ul>

<h2>Credentials</h2>
Same as in <a href='https://github.com/NathanKr/youtube-api-server-private'>youtube-api-server-private</a> (check there credentials.json locally)

<h2>Persist token limitation</h2>
<ul>
<li>To use the youtube api one must authenticate using /api/authlogin which pass code that /api/oauth2callback can use to retrive tokens and access the youtube api via OAuth2Client object. one can store this e.g. in a session so user will not have to login each time.</li>
<li>possible solutions may be next-auth/react and iron-session</li>
</ul>

<h2>Persist token partial solution</h2>
<ul>
<li>i have added iron-ssesion so after /api/loginauth i am able to save the code in a cookie in /api/oauth2callback and use it in /api/videos but only once. Next time i need to re-login</li>
<li>Altough i need to login each time the api structure now is better because videos is stand alone api and /api/loginauth \ /api/oauth2callback are generic</li>
</ul>

