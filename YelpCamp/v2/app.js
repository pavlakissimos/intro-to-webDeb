var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
    mongoose.connect("mongodb://localhost/yelp_camp");
    
    // SCHEMA SET UP
    var campgroundSchema = new mongoose.Schema({
        name: String,
        image: String,
        description: String
    });
    
    var Campground = mongoose.model("Campground", campgroundSchema);
    
    // Campground.create({
    //     name: "Granite Hill",
    //     image: "http://www.photosforclass.com/download/1430198323",
    //     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
    // }, function(err, campground){
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("NEWLY CREATED CAMPGROUND: ");
    //         console.log(campground);
    //     }
    // });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ==========================
//          ROUTES
// ==========================

// Home Page
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - Display the cammpgorunds 
app.get("/campgrounds", function(req, res){
    // GET ALL CAMPGROUNDS FROM DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - Add a new campground to the DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name= req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create an new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            // Redirect to campgrounds page
            res.redirect("/campgrounds");    
        }
    });
});

// NEW - Display form to make a new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// SHOW - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    // find campground with the provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            // render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

// Tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});