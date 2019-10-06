const express = require("express");
const session = require('express-session');
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', (req, res) => {
    if (!req.session.visit)
        req.session.visit = 0;

    req.session.visit++;

    var visits = {
        num: req.session.visit
    };

    res.render('index', {visit: visits});

});

app.post('/double', (req, res) => {
    req.session.visit++;
    res.redirect('/');
});

app.get('/reset', (req, res) => {
    req.session.visit = 0;
    res.redirect('/');
});



app.listen(8000, () => console.log("listening on port 8000"));