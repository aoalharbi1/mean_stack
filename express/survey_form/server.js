const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/result", (req, res) => {

    res.render("result", {user_info: req.body});
});

app.listen(8000, () => console.log("listening on port 8000"));