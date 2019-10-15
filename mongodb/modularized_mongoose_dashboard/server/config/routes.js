const animals = require('../controllers/animals.js');

module.exports = function (app) {
    app.get('/', (req, res) => {
        animals.index(req, res);
    });

    app.get('/animal/new', (req, res) => {
        animals.newAnimal(req, res);
    });

    app.post('/animal', (req, res) => {
        animals.create(req, res);
    });

    app.get('/animal/:id', (req, res) => {
        animals.show(req, res);
    });

    app.get('/animal/edit/:id', (req, res) => {
        animals.showEditPage(req, res);
    });

    app.post('/animal/:id', (req, res) => {
        animals.edit(req, res);
    });

    app.get('/animal/destroy/:id', (req, res) => {
        animals.delete(req, res);
    });
}