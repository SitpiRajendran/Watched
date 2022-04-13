const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User.js');


router.post('/register', function (req, res) {
    const {
        email,
        password
    } = req.query;

    console.log(req.query)
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                console.log("Sending 409 - already registered")
                res.status(409).send('User already registered.///' + email);
                return;
            }
            console.log(email + '//' + password)
            const newUser = new UserModel({
                email: email,
                password: password,
                following: [],
                movieList: [],
            });

            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            console.log("Sending 200 - User created")
                            res.status(200).send('User Created')
                        })
                        .catch(err => { 
                            console.log("Sending 500 - error during registration///'"+ err)
                            res.status(500).send('Error during registration.///' + err); });
                }))
        })
})

router.post('/login', (req, res) => {
    const {
        email,
        password,
    } = req.query;
    console.log(email + "//" + password)
    UserModel.findOne({ email: email }).then(user => {
        if (!user) {
            console.log("SENDING 400 - User not found")
            res.status(400).send('No user found with this email.')
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    console.log("Password Match")
                    const accessToken = jwt.sign({ email: email }, "process.env.ACCESS_TOKEN_SECRET", { expiresIn: '1 days' })
                    res.status(200).send(accessToken);
                } else {
                    console.log("Password incorrect")
                    res.status(400).send('password incorrect');
                }
            });
        }
    }).catch(err => {
        res.status(501).send('error during logging');
    });
})


module.exports = router;
