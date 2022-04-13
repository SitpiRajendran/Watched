const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
var session = require("express-session");
var cookieParser = require('cookie-parser');

const fs = require('fs');
const path = require('path');
const https = require('https')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use('/models', express.static(__dirname + '/models'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());

app.use(session({ secret: "soen467", resave: false, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTING

app.use('/', indexRouter)

app.get('*', function (req, res, next) {
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}

https.createServer(httpsOptions, app).listen(process.env.FRONTEND_PORT || 80, function(err) {
    if (err) console.log("Error in server setup")
    console.log("Server started SECURE on : https://localhost:" +  (process.env.FRONTEND_PORT || 80));
});
/*     app.listen(process.env.PORT || 80, function(err) {
        if (err) console.log("Error in server setup")
        console.log("Server started APP on : http://localhost:" +  (process.env.PORT || 80));
    }) */
    