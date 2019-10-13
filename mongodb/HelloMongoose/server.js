const mongoose = require('mongoose');
const express = require("express");
const session = require("express-session");
const flash = require('express-flash');
const app = express();
var bodyParser = require("body-parser");

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
// create an object to that contains methods for mongoose to interface with MongoDB
const User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => {
    User.find()
        .then(data => res.render("index", { users: data }))
        .catch(err => res.json(err));
});

// app.post('/users', (req, res) => {
//     const user = new User();
//     user.name = req.body.name;
//     user.age = req.body.age;

//     user.save()
//         .then(newUserData => console.log('user created: ', newUserData))
//         .catch(err => console.log(err));

//     res.redirect('/');
// })

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(() => res.redirect('/'))
        .catch((err) => {
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
});

app.listen(8000, () => console.log("listening on port 8000"));
