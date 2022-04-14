//SETUP / INITIALIZE
require('dotenv').config()
const express = require('express');
var cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes.js')
const movieRouter = require('./routes/movieRoutes.js')
const followRouter = require('./routes/followRoutes.js')

console.log(process.env.BACKEND_PORT)
//MONGOOSE
mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', error => console.log('Connected to MongoDB database'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/models', express.static(__dirname + '/models'));


app.get('/', function (req, res, next) {
    res.status(200);
    res.type('txt').send('Watched server is up 😁');
});

app.use('/auth', authRouter);
app.use('/movie', movieRouter);
app.use('/follow', followRouter);

app.get('*', function (req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
        res.status(404).send('Url not found:' + req.url);
        return;
    }
    res.type('txt').send('Not found');
});


app.listen(process.env.BACKEND_PORT || 3001, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server started on port: " + (process.env.BACKEND_PORT || 3001));
})

module.exports = app;