const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var counter = 0;

const server = app.listen(8080, () => {
    console.log("listening on port 8080")
});

app.get("/", (req, res) => {
    res.render('index');
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {

    io.emit('updated_counter', { msg: counter });

    socket.on('update', function (data) {
        counter++;
        io.emit('updated_counter', { msg: counter });
    });

    socket.on('reset', function (data) {
        counter = 0;
        io.emit('updated_counter', { msg: counter });
    });
});