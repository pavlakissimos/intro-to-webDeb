var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");
    
// Home Page
router.get("/", function(req, res){
    res.render("landing");
});

// Show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// Handling sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
               res.redirect("/campgrounds");
            });
        }
    });
});

// Show login form
router.get("/login", function(req, res) {
    res.render("login");
});

// Handling login logic(middleware)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
});

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req , res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;