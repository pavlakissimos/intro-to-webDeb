var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/fellInLoveWith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
            {tittle: "post 1", author: "Simos"},
            {tittle: "My adorable pet bunny", author: "charlie"},
            {tittle: "Can you believe this posky?", author: "Xara"}
        ];
        
        res.render("posts", {posts: posts});
});

// Tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});