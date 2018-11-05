const express = require('express');
const passport = require("passport");
const session = require("express-session");
const {Strategy} = require("passport-discord");
const app = express();
const bodyparser = require("body-parser");
const client = require('../index');
const path = require('path');

module.exports.load = async (client) => {

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

var scopes = ['identify', 'guilds'];

passport.use(new Strategy({
    clientID: client.user.id,
    clientSecret: client.config.CLIENT_SECRET,
    callbackURL: `${client.config.WEBSITE_URL}/login`,
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
      return done(null, profile);
  });
}));

app
.use(bodyparser.json())
.use(bodyparser.urlencoded({ extended: true }))
.engine("html", require("ejs").renderFile)
.use(express.static(path.join(__dirname, '/public')))
.set("view engine", "ejs")
.use(session({
  secret: 'dashboard.io demo',
  resave: false,
  saveUninitialized: false
}))
.use(passport.initialize())
.use(passport.session())
  
app
.get('/login',

  passport.authenticate('discord', { failureRedirect: '/' }), 

  function(req, res) { res.redirect('/profile') 

})

.get('/logout', function(req, res) {

  req.logout();

  res.redirect('/');

})

.get('/', function(req, res) {
    
  res.render(__dirname+'/views/index.ejs', {
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Login"),
      client: client.user,
      user: req.user,
      login: (req.isAuthenticated() ? "yes" : 'no'),
      invite: `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`
});
})
.get('/addbot', function(req, res) {
  res.render(__dirname+'/views/addbot.ejs', {
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Login"),
      client: client,
      user: req.user,
      login: (req.isAuthenticated() ? "yes" : 'no')
});
})

.get('/profile', CheckAuth, function(req, res) {
    
  res.render(__dirname+'/views/profile.ejs', {
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "To login"),
      client: client.user,
      user: req.user,
      guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591),
      avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
      iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`
  });
})

.get('/servers/:guildID', CheckAuth, (req, res) => {

    const serv = client.guilds.get(req.params.guildID);

    if (!serv) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8&guild_id=${req.params.guildID}`);
    
    if(!client.guilds.get(req.params.guildID).members.get(req.user.id).hasPermission("MANAGE_GUILD")) return res.redirect('/dashboard');


    res.render(__dirname+'/views/guild.ejs', {
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "To Login"),
      client: client.user,
      user: req.user,
      avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
      iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
      guild: serv,
    });

})

.post('/servers/:guildID', function(req, res) {


if(!req.body.send_CHANNELID) return res.send('Error, no channel specified');

if(!req.body.send_MESSAGE) return res.send('Error, no message specified');

 client.guilds.get(req.params.guildID).channels.get(req.body.send_CHANNELID).send(req.body.send_MESSAGE);

  res.redirect(`/serveurs/${req.params.guildID}`);

})
.get('/404',function(req, res) {
 res.render(__dirname + "/views/404.ejs", {
         status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "To login"),
      client: client.user
 });       
})
.get('*', function(req, res) {

  res.redirect("/404");

});

app.post("/botlol", (req, res) => {
        client.sendaddbot(req.body.botid);

        res.redirect("/profile");
        console.log("\n>> Redirecting to homepage");
    });

  
function CheckAuth(req, res, next) {

  if (req.isAuthenticated()) {

    return next();

    }else{

    return res.redirect("/login");

  }
}



app.listen(3000, function (err) {

  if (err) return console.log(err)

  console.log('Dashboard is online!')

  });
};

