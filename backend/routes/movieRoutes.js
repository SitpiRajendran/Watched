require('dotenv').config()
const express = require('express');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const https = require('https');

const router = express.Router();

const apiURL = 'https://api.themoviedb.org/3/'
const apiKey = process.env.API_KEY;


router.post('/check', function (req, res) {
    let {
        accessToken,
        movieID,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });
    let watched = false;
    User.findOne({ email: req.email }).then(async function (user) {
        if (user) {
            user.movieList.forEach(element => {
                if (element == movieID) {
                    watched = true;
                    return;
                }
            });
            console.log("Sending 200 - Check Completed" + watched)
            res.status(200).send(watched)
        }
    })
})

router.post('/add', function (req, res) {
    let {
        accessToken,
        movieID,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });

    User.findOne({ email: req.email }).then(async function (user) {
        if (user) {
            user.movieList.push(movieID)
            User.updateOne({ email: req.email }, { movieList: user.movieList }, function (err, user) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", user);
                    console.log("Sending 200 - Movie Added")
                    res.status(200).send('Movie Added')
                }
            })
        }
    })
})

router.post('/delete', function (req, res) {
    let {
        accessToken,
        movieID,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });

    User.findOne({ email: req.email }).then(async function (user) {
        if (user) {
            let newList = []
            user.movieList.forEach(element => {
                if (element != movieID)
                    newList.push(element);
            });
            User.updateOne({ email: req.email }, { movieList: newList }, function (err, user) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", user);
                    console.log("Sending 200 - Movie Deleted")
                    res.status(200).send('Movie Deleted')
                }
            })
        }
    })
})

router.post('/search', function (req, res) {
    let {
        accessToken,
        query,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });
    console.log("DATA : " + query)
    https.get(apiURL + "search/movie?api_key=" + apiKey + "&query=" + query, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            console.log("Sending 200 - List of founded movie")
            res.status(200).send(JSON.parse(data).results)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})


router.post('/details', function (req, res) {
    let {
        accessToken,
        query,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });
    console.log("DATA : " + query)
    https.get(apiURL + "/movie/" + query + "?api_key=" + apiKey, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            console.log("Sending 200 - Details of the movie")
            res.status(200).send(JSON.parse(data))
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

router.post('/popular', function (req, res) {
    let {
        accessToken,
        query,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });
    console.log("DATA : " + query)
    https.get(apiURL + "discover/movie?api_key=" + apiKey + "&sort_by=popularity.desc", (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            console.log("Sending 200 - List of founded movie")
            res.status(200).send(JSON.parse(data).results)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

router.post('/trending', function (req, res) {
    let {
        accessToken,
        query,
    } = req.query;

    jwt.verify(accessToken, "process.env.ACCESS_TOKEN_SECRET", (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
    });
    console.log("DATA : " + query)
    https.get(apiURL + "trending/movie/week?api_key=" + apiKey, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
            console.log("Sending 200 - List of founded movie")
            res.status(200).send(JSON.parse(data).results)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

module.exports = router;
