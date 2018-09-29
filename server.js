const express = require('express');
const app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy
const session = require('express-session');

const facebookAuth = {
	'clientID'     : process.env.FB_CLIENT_ID,
	'clientSecret' : process.env.FB_CLIENT_SECRET,
	'callbackURL'  : process.env.BASEURL + '/auth/facebook/callback'
};
console.log(facebookAuth);

const facebookLoginRedirects = {
	successRedirect : "/",
	failureRedirect : "/?login=failure"
};

const users = {};

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, users[id]));
passport.use(new FacebookStrategy(facebookAuth,
	(token, refreshToken, profile, done) => {
		if (!users[profile.id]) {
			users[profile.id] = {
				"id"      : profile.id,
				"name"    : profile.displayName,
				"token"   : token
			}
		}
		return done(null, users[profile.id]);
	}
));
 
app.use(session({ secret: "topsecret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
 
app.get("/", function (req, res) {
	if (!req.isAuthenticated()) {
		res.send("<a href='/auth/facebook'>login through facebook</a>");
		return;
	}
	res.send('User info: ' + JSON.stringify(req.user));
});
 
app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email" }));
app.get("/auth/facebook/callback",
	passport.authenticate("facebook", facebookLoginRedirects));

app.get("/logout", function(req, res) {
	req.logout();
	res.send("logout success!");
});
 
const port = process.env.PORT || 8080;
app.listen(port);
console.log("App running at port: " + port);
