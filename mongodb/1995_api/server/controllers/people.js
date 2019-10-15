const mongoose = require('mongoose');
const Person = mongoose.model('Person');

module.exports = {
    index: (req, res) => {
        Person.find()
            .then(people => res.json(people))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const person = req.params;
        Person.create(person)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    remove: (req, res) => {
        Person.deleteOne(req.params)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    getByName: (req, res) => {
        Person.findOne(req.params)
            .then(person => res.json(person))
            .catch(err => res.json(err));
    },
} 