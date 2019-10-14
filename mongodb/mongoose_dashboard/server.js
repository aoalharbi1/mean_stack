const mongoose = require('mongoose');
const express = require("express");
const session = require("express-session");
const flash = require('express-flash');
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

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    color: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: true } });

const Animal = mongoose.model('Animal', AnimalSchema);

app.get('/', (req, res) => {
    Animal.find().sort({ _id: -1 })
        .then(data => res.render("index", { animals: data }))
        .catch(err => res.json(err));
});

app.get('/animal/new', (req, res) => {
    res.render("add_animal");
});

app.post('/animal', (req, res) => {
    const animal = req.body;
    Animal.create(animal)
        .then(newAnimal => res.redirect("/animal/" + newAnimal._id))
        .catch(err => res.json(err));
});

app.get('/animal/:id', (req, res) => {
    Animal.findOne({_id: req.params.id})
    .then(animal => res.render("show_animal", {animal_info: animal}))
    .catch(err => res.json(err));
});

app.get('/animal/edit/:id', (req, res) => {
    Animal.findOne({_id: req.params.id})
    .then(animal => res.render("edit_animal", {animal_info: animal}))
    .catch(err => res.json(err));
});

app.post('/animal/:id', (req, res) => {
    Animal.findOne({_id: req.params.id})
    .then(animal => {
        animal.name = req.body.name;
        animal.age = req.body.age;
        animal.color = req.body.color;

        return animal.save();
    })
    .then(editedAnimal => res.redirect("/animal/" + editedAnimal._id))
    .catch(err => res.json(err));
});

app.get('/animal/destroy/:id', (req, res) => {
    Animal.deleteOne({_id: req.params.id})
    .then(animal => res.redirect("/"))
    .catch(err => res.json(err));
});

app.listen(8000, () => console.log("listening on port 8000"));
