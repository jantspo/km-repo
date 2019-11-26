require("dotenv").config();
const express = require("express");
const http = require("http");
const next = require("next");
const session = require("express-session");
// 1 - importing dependencies
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const uid = require('uid-safe');
const authController = require('./controllers/auth.controller');
const dev = process.env.NODE_ENV !== "production";

const sessionStore = require('./session-store');
const routes = require('./routes/index');
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
var cors = require('cors');
const app = next({
    dev,
    dir: "./"
});

var whitelist = ['https://assetmanager.hgm-co.com'];

var corsOptions = {
  origin: process.env.CORS_ORIGIN
}

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use((bodyParser({limit: '750mb'})));
    server.use(bodyParser.json({ limit: '750mb' }));
    server.use(bodyParser.urlencoded({ extended: true, limit: '750mb' }));
    // 2 - add session management to Express
    const sessionConfig = {
        secret: uid.sync(18),
        cookie: {
            maxAge: 86400 * 1000 // 24 hours in milliseconds
        },
        resave: false,
        saveUninitialized: true,
        store: sessionStore
    };

    server.use(cors(corsOptions));
    server.use(session(sessionConfig));

    sessionStore.sync();

    // 4 - configuring Passport
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
       async function(email, password, done) {
            try{
                const user = await authController.find(email);
                if (!user) { return done(null, false); }
                const cleanUser = user.toJSON();
                const valid = bcrypt.compareSync(password, cleanUser.password);
                if(valid){
                    delete cleanUser.password;
                    return done(null, cleanUser);
                }else {
                    return done(null, false);
                }
            }catch(error){
                return error;
            }
        }
    ));

    passport.serializeUser((user, done) => {
        delete user.password;
        done(null, user)
    });

    passport.deserializeUser((user, done) => {
        delete user.password;
        done(null, user)
    });

    // 5 - adding Passport and authentication routes
    server.use(passport.initialize());
    server.use(passport.session());

    // 6 - you are restricting access to some routes
    const restrictAccess = (req, res, next) => {
        if (!req.isAuthenticated()) return false;
        return true;
    };

    server.use((req, res, next) => {
        // if(req.url.match('/')){
        //     if(restrictAccess){
        //         res.redirect('/account');
        //     }else{
        //         next();
        //     }
        // }else 
        if(req.url.match('/|/login|/register|/api/login|/api/register') || req.url.includes('images/')) {
            next();
        }else if(req.url.length > 1) {
            if(restrictAccess){
                res.redirect('/');
            }
            return;
        }else if(req.url == '/health'){
            console.log('health check')
            return res.status(200).json({"message": "active"});
        }
    })
    server.use("/account", restrictAccess);

    server.use(routes);

    // handling everything else with Next.js
    server.get("*", handle);

    http.createServer(server).listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`);
    });
});