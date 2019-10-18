const tasks = require('../controllers/tasks.js');

module.exports = function (app) {
    app.get('/tasks', (req, res) => {
        tasks.index(req, res);
    });

    app.get('/task', (req, res) => {
        tasks.getById(req, res);
    });

    app.post('/task', (req, res) => {
        tasks.create(req, res);
    });

    app.put('/task', (req, res) => {
        tasks.update(req, res);
    });

    app.delete('/task', (req, res) => {
        tasks.remove(req, res);
    });

}