const mongoose = require('mongoose');
const Task = mongoose.model('Task');

module.exports = {
    index: (req, res) => {
        Task.find()
            .then(tasks => res.json(tasks))
            .catch(err => res.json(err));
    },

    getById: (req, res) => {
        
        Task.findOne({_id: req.query._id})
            .then(task => res.json(task))
            .catch(err => res.json(err));
    },

    create: (req, res) => {
        const task = req.body;
        Task.create(task)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        Task.findOne({ _id: req.body._id })
            .then(task => {
                task.title = req.body.title;
                task.description = req.body.description;
                task.completed = req.body.completed;
                return task.save();
            })
            .then(result => res.json(result))
            .catch(err => res.json(err));
    },

    remove: (req, res) => {
        Task.deleteOne({_id: req.body._id})
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
} 