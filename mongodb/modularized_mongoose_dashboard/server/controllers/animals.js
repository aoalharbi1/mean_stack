const mongoose = require('mongoose');
const Animal = mongoose.model('Animal');

module.exports = {
    index: (req, res) => {
        Animal.find().sort({ _id: -1 })
            .then(data => res.render("index", { animals: data }))
            .catch(err => res.json(err));
    },
    newAnimal: (req, res) => {
        res.render("add_animal");
    },
    create: (req, res) => {
        const animal = req.body;
        Animal.create(animal)
            .then(newAnimal => res.redirect("/animal/" + newAnimal._id))
            .catch(err => res.json(err));
    },
    show: (req, res) => {
        Animal.findOne({ _id: req.params.id })
            .then(animal => res.render("show_animal", { animal_info: animal }))
            .catch(err => res.json(err));
    },
    showEditPage: (req, res) => {
        Animal.findOne({ _id: req.params.id })
            .then(animal => res.render("edit_animal", { animal_info: animal }))
            .catch(err => res.json(err));
    },
    edit: (req, res) => {
        Animal.findOne({ _id: req.params.id })
            .then(animal => {
                animal.name = req.body.name;
                animal.age = req.body.age;
                animal.color = req.body.color;

                return animal.save();
            })
            .then(editedAnimal => res.redirect("/animal/" + editedAnimal._id))
            .catch(err => res.json(err));
    },
    delete: (req, res) => {
        Animal.deleteOne({ _id: req.params.id })
            .then(animal => res.redirect("/"))
            .catch(err => res.json(err));
    },
} 