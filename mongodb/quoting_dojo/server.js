const mongoose = require('mongoose');
const express = require("express");
const session = require("express-session");
const flash = require('express-flash');
const app = express();
const bodyParser = require("body-parser");

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/client/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app)



app.listen(8000, () => console.log("listening on port 8000"));
