var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assigment!");
});

app.get("/speak/:animalName", function(req, res){
   var animal = req.params.animalName.toLowerCase();
   var sound = {
     dog: "Woof Woof",
     cow: "Moo",
     pig: "Oink"
   };
   var sound = sound[animal];

  res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:saying/:times", function(req, res) {
    var say = req.params.saying;
    var times = Number(req.params.times);
    var result = "";
    
    for (var i = 0; i < times; i++){
        result += say + " ";
    }

    res.send(result);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});

// Tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});