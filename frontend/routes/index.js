require('dotenv').config()
const express = require('express');
const router = express.Router();
const request = require('request');

// MAIN PAGES

router.get('/', (req, res) => {
    if (req.cookies.accessToken)
        res.redirect("/dashboard")
    else
        res.render('index');
});

router.get('/dashboard', (req, res) => {
    if (!req.cookies.accessToken)
        res.render("index", { error: "Vous devez être connecté pour voir cette page" })
    else {
        request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/popular?accessToken=' + req.cookies.accessToken },
            function (error, response, body) {
                request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/trending?accessToken=' + req.cookies.accessToken },
                    function (err, resp, data) {
                        res.render('dashboard', { moviePopularList: body, movieTrendingList: data });
                    })
            })
    }
})

router.get('/searchMovie', (req, res) => {
    if (!req.cookies.accessToken)
        res.render("index", { error: "Vous devez être connecté pour voir cette page" })
    else {
        res.redirect('/');
    }
})

router.get('/movieDetails', (req, res) => {
    if (!req.cookies.accessToken)
        res.render("index", { error: "Vous devez être connecté pour voir cette page" })
    else {
        if (!req.query.movieID)
            res.redirect('/');
        request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/details?accessToken=' + req.cookies.accessToken + "&query=" + req.query.movieID },
            function (error, response, body) {
                console.log("MovieDetails")
                request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/check?accessToken=' + req.cookies.accessToken + "&movieID=" + req.query.movieID },
                    function (error, checked, body) {
                        console.log("Watched ?")
                        console.log(checked.body)
                        res.render('movieDetails', { movieDetails: response.body, watched: checked.body });
                    })
            })
    }
})

router.get('/account', (req, res) => {
    if (!req.cookies.accessToken)
        res.render("index", { error: "Vous devez être connecté pour voir cette page" })
    else {
        request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/userList?accessToken=' + req.cookies.accessToken },
            function (error, response, body) {
                console.log("Account")
                res.render('account', { movieList: response.body });
            })
    }
})

router.get('/user', (req, res) => {
    if (!req.cookies.accessToken)
        res.render("index", { error: "Vous devez être connecté pour voir cette page" })
    else {
        console.log("USER QUERY : " + req.query.user);
        request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/userList?accessToken=' + req.cookies.accessToken + "&query=" + req.query.user },
            function (error, response, body) {
                request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/follow/check?accessToken=' + req.cookies.accessToken + "&email=" + req.query.user },
                    function (err, resp, data) {
                        console.log("User" + data)
                        res.render('user', { movieList: response.body, searchedUser: req.query.user, isFollowing: data });
                    })
            })
    }
})



router.get('/following', (req, res) => {
    if (!req.cookies.accessToken)
        res.render("index", { error: "Vous devez être connecté pour voir cette page" })
    else {
        let followList = [];
        request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/follow/list?accessToken=' + req.cookies.accessToken },
            function (error, response, body) {
                response.body = response.body.slice(1, response.body.length-1).split(",")
                response.body.forEach(element => {
                    element = element.slice(1, element.length-1)
                    request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/userList?accessToken=' + req.cookies.accessToken + "&query=" + element},
                        function (err, resp, data) {
                            followList.push('{"user": "' + element + '", "movielist":' + data + '}')
                        })
                });
                setTimeout(function() {
                    res.render('following', { list: followList });
                }, 1000);
            })
    }
})


// LOGIN AND REGISTRATION

router.get('/login', (req, res) => {
    if (req.cookies.accessToken)
        res.redirect("/dashboard")
    else
        res.render('index');
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    console.log(email + "// " + password)
    request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/auth/login?email=' + email + '&password=' + password },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Response is 200")
                res.cookie(`accessToken`, body);
                res.cookie(`email`, email);
                res.redirect('/login')
                return;
            } else {
                console.log("Response is ERROR")
                res.render('index', { error: "No user found" })
            }
        }
    );
})

router.get('/register', (req, res, next) => {
    if (req.cookies.accessToken)
        res.redirect("/")
    else
        res.render('register');
});

router.post('/register', (req, res) => {
    const { email, password, password2 } = req.body;

    if (!email.includes('@')) {
        res.render('register', {
            error: 'This mail is not an email 📧',
            email
        });
    }
    console.log("It's an email")
    if (password !== password2) {
        res.render('register', {
            error: 'Both password doesn\'t match 🙈',
            email
        });
        return;
    }
    console.log("Both password are sames")

    if (password.length < 6) {
        res.render('register', {
            error: 'Your password must have 6 character',
            email
        });
        return;
    }
    console.log("Password is long enough")

    request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/auth/register?email=' + email + '&password=' + password },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Resonse is 200")
                res.redirect('/login')
                return;
            }
            if (response.statusCode == 409) {
                console.log("Resonse is 409")
                res.render('register', {
                    error: 'User already register',
                    email
                });
                return;
            }
            else {
                console.log("Resonse is other " + response.statusCode)
                res.render('register', {
                    error: 'ERROR',
                    email
                });
                return;

            }
        }
    );
})

// SEARCH FUNCTIONS

router.post('/searchMovie', (req, res) => {
    const { query } = req.body;

    console.log(query)
    request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/search?accessToken=' + req.cookies.accessToken + "&query=" + query },
        function (error, response, body) {
            res.render('search', { movieQueryList: response.body })
        })
})

// MOVIE FUNCTION

router.post('/addMovie', (req, res) => {
    const { movieID } = req.body;

    request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/add?accessToken=' + req.cookies.accessToken + "&movieID=" + movieID },
        function (error, response, body) {
            console.log(body)
            res.redirect('/movieDetails?movieID=' + movieID)
        })
})

router.post('/deleteMovie', (req, res) => {
    const { movieID } = req.body;

    request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/movie/delete?accessToken=' + req.cookies.accessToken + "&movieID=" + movieID },
        function (error, response, body) {
            console.log(body)
            res.redirect('/movieDetails?movieID=' + movieID)
        })
})


// USER FOLLOW FUNCTIONS

router.post('/follow', (req, res) => {
    const { email } = req.body;

    request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/follow/follow?accessToken=' + req.cookies.accessToken + "&email=" + email },
        function (error, response, body) {
            console.log(body)
            res.redirect('/user?user=' + email)
        })
})

router.post('/unfollow', (req, res) => {
    const { email } = req.body;

    request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/follow/unfollow?accessToken=' + req.cookies.accessToken + "&email=" + email },
        function (error, response, body) {
            console.log(body)
            res.redirect('/user?user=' + email)
        })
})

router.post('/searchuser', (req, res) => {
    const { email } = req.body;

    console.log("Searching User / " + email)
    request.post({ url: 'http://localhost:' + process.env.BACKEND_PORT + '/follow/search?accessToken=' + req.cookies.accessToken + "&email=" + email },
        function (error, response, body) {
            if (response.statusCode == 200) {
                res.redirect('/user?user=' + email)
            } else
                res.redirect('/following')
        })
})

// Déconnection
router.get('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('email');
    res.redirect('/');
})

module.exports = router;