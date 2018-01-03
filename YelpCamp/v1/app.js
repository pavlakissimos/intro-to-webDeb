var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Salmon Creek", image: "http://www.photosforclass.com/download/16263386718"},
    {name: "Granite Hill", image: "http://www.photosforclass.com/download/1430198323"},
    {name: "Mountain Goats", image: "http://www.photosforclass.com/download/2123340163"},
    {name: "Salmon Creek", image: "http://www.photosforclass.com/download/16263386718"},
    {name: "Granite Hill", image: "http://www.photosforclass.com/download/1430198323"},
    {name: "Mountain Goats", image: "http://www.photosforclass.com/download/2123340163"},
    {name: "Salmon Creek", image: "http://www.photosforclass.com/download/16263386718"},
    {name: "Granite Hill", image: "http://www.photosforclass.com/download/1430198323"},
    {name: "Mountain Goats", image: "http://www.photosforclass.com/download/2123340163"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ==========================
//          ROUTES
// ==========================

// Home Page
app.get("/", function(req, res){
    res.render("landing");
});

// Campagrounds Page
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

// Set up POST Route
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name= req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect to campgrounds page
    res.redirect("/campgrounds");
});

// Form Route
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// Tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});