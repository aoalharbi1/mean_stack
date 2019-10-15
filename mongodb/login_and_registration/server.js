const mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
const express = require("express");
const session = require("express-session");
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require("body-parser");

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        match: [/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}))\]?$/, "Enter a valid email"]
    },
    password: { type: String, required: true },
    birthday: { type: DateOnly, required: true },
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    const user = req.body;
    User.find({ email: user.email })
        .then(result => {
            if (result.length > 0) {
                return Promise.reject("Error the email is already registered");
            }
            let newUser = user;
            return bcrypt.hash(newUser.password, 10)
        })
        .then(hashed_password => {
            let newUser = user;
            newUser.password = hashed_password;

            return User.create(newUser);
        })
        .then(savedResult => res.redirect("/"))
        .catch(err => res.json(err));
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    User.findOne({ email: req.body.email })
        .then(async user => {
            try {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    user.password = null;
                    req.session.user = user;

                    res.redirect("/user_in");
                }

                else {
                    res.redirect("/login")
                }
            }
            catch(err){
                return Promise.reject(err)
            }
        })
        .catch(err => res.json(err));
});

app.get("/user_in", (req, res) => {
    if (req.session.user.email)
        res.render("user_dashboard");
    else
        res.redirect("/");
});

app.listen(8000, () => console.log("listening on port 8000"));