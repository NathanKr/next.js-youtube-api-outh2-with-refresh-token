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
<li>add session to my design in tag 0.21 i was suggested by chatgpt to use next-session but it is not working , this package was last updated two years ago so its not a good sign</li>
</ul>
