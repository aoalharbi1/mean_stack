const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const server = app.listen(8080, () => {
    console.log("listening on port 8080")
});

app.get("/", (req, res) => {
    res.render('index');
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {

    socket.on('posting_form', function (data) {

        socket.emit('updated_message', { msg: data.msg });

        socket.emit('random_number', {
            msg:
            {
                "number": Math.floor((Math.random() * 10) + 1)
            }
        });
    });
});