var express = require("express");
var app = express();
var request = require("request");

// Configure our app
app.set("view engine", "ejs");

// ==================
//      ROUTES
// ==================

// Home Page
app.get("/", function(req, res) {
   res.render("search");
});

// Make the API call
app.get("/result", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query +"&apikey=thewdb";
    request(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

// Wrong Page
app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});


// Tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});