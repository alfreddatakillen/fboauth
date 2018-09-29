Facebook OAuth Token
====================

Use this node.js express server to login with a Facebook application to get
an OAuth token.

Environment variables
---------------------

Those are mandatory: 

* `BASEURL` - protcol and domain, in this format: `https://www.example.com`.
  If needed, you can also include a port: `https://www.example.com:8080`.
  Note: You probably do not want a trailing slash.
* `FB_CLIENT_ID` - your Facebook application client id.
* `FB_CLIENT_SECRET` - your Facebook application client secret.

Optional variables:

* `PORT` - The port you want to listen to. (Defaults to 8080.)

Run it!
-------

```
$ npm start
```

