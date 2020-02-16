const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();
const passport =  require('passport');

router.use(bodyParser.json());

router.post("/api/login", (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).send({
                message: '500: Authentication failed, try again.',
            });
        }

        if (!user) {
            return res.status(404).send({
                message: '404: Authentication failed, try again.',
            });
        }

        req.login(user, err => {
            if(!err) {
                delete user.password;
                return res.status(200).json(user);
            }
        })
    })(req, res);
});

router.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;