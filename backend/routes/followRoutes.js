require('dotenv').config()
const express = require('express');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const https = require('https');

const router = express.Router();

router.post('/follow', (req, res) => {
    let {
        accessToken,
        email,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });

    User.findOne({ email: req.email }).then(async function (user) {
        if (user) {
            user.following.push(email)
            User.updateOne({ email: req.email }, { following: user.following }, function (err, user) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", user);
                    console.log("Sending 200 - Added Email to following")
                    res.status(200).send('Email Added to following')
                }
            })
        }
    })
})

router.post('/unfollow', function (req, res) {
    let {
        accessToken,
        email,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });

    User.findOne({ email: req.email }).then(async function (user) {
        if (user) {
            let newList = []
            user.following.forEach(element => {
                if (element != email)
                    newList.push(element);
            });
            User.updateOne({ email: req.email }, { following: newList }, function (err, user) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", user);
                    console.log("Sending 200 - Unfollowed")
                    res.status(200).send('User Unfollowed')
                }
            })
        }
    })
})

router.post('/check', function (req, res) {
    let {
        accessToken,
        email,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });
    let following = false;
    User.findOne({ email: req.email }).then(async function (user) {
        if (user) {
            user.following.forEach(element => {
                if (element == email) {
                    following = true;
                    return;
                }
            });
            console.log("Sending 200 - User Follow Completed" + following)
            res.status(200).send(following)
        }
    })
})

router.post('/list', function (req, res) {
    let {
        accessToken,
        email,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });
    User.findOne({ email: req.email }).then(async function (user) {
        if (user) {
            console.log("Sending 200 - User Follow List")
            res.status(200).send(user.following)
        }
    })
})


router.post('/search', function (req, res) {
    let {
        accessToken,
        email,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });
    User.findOne({ email: email }).then(function (user) {
        if (user) {
            console.log("Sending 200 - User exist")
            res.status(200).send()
        } else {
            res.status(204).send()
        }
    }).catch(err => {
        res.status(204).send('User not found');
    });
})

module.exports = router;
