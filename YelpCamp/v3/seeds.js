var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest",
            image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
            description: "A very nice campground!"
        },
        {
            name: "Mountain Doom",
            image: "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg",
            description: "The dark Lord will rise once more!"
        },
        {
            name: "Cinnamon Roll",
            image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
            description: "I like cinnamon rolls very much!"
        }
    ];

function seedDB(){
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Campgrounds removed!");
            // ADD A FEW CAMPGROUNDS
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Campground added!");
                        // Add a new comment
                        Comment.create({
                            text: "This place is great, but i whish there was internet!",
                            author: "Homer"
                        }, function(err, comment){
                            if (err) {
                                console.log(err);
                            } else {
                               campground.comments.push(comment);
                               campground.save();
                               console.log("Created a new comment!");
                            }
                        });
                    }
                });
            });
        }
    });
    // ADD A FEW COMMENTS
}

module.exports = seedDB;