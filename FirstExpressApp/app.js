var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});
//  "/dog" => "MEOW!!!"
app.get("/dog", function(req, res) {
    console.log("SOMEONE MADE A REQUEST ON /DOG");
    res.send("MEOW!!!");
})

app.get("*", function(req, res) {
    res.send("YOU ARE A STAR!!!");
})

// Tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});