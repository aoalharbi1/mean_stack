const mongoose = require('mongoose');
const express = require("express");
const session = require("express-session");
const flash = require('express-flash');
const app = express();
const bodyParser = require("body-parser");

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
const QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quote: {type: String, required: true}
}, {timestamps: { createdAt: true, updatedAt: false }});

// create an object to that contains methods for mongoose to interface with MongoDB
const Quote = mongoose.model('Quote', QuoteSchema);

app.get('/', (req, res) => {
    res.render("index")
});

app.get('/quotes', (req, res) => {
    Quote.find().sort({_id: -1})
        .then(data => res.render("quotes", { quotes: data }))
        .catch(err => res.json(err));
});

app.post('/quotes', (req, res) => {
    
    const quote = new Quote(req.body);
    quote.save()
        .then(() => res.redirect('/quotes'))
        .catch((err) => {
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].path);
            }
            res.redirect('/');
        });
});

app.listen(8000, () => console.log("listening on port 8000"));
