const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get("/cat1", (req, res) => {
    
    var cat_array = {
        name: "MeowMeow", favorite_food: "Tuna", age: 5, sleeping_spots: ["On the stairs", "Behind the sofa"], url:"/images/cat1.jpg"
    };

    res.render('cat_display', {cat_info: cat_array});
});

app.get("/cat2", (req, res) => {
    var cat_array = {
        name: "Meow", favorite_food: "milk", age: 2, sleeping_spots: ["Under the bed", "In the kitchen"], url:"/images/cat2.jpg"
    };

    res.render('cat_display', {cat_info: cat_array});
});

app.listen(8000, () => console.log("listening on port 8000"));