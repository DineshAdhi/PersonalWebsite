var express = require('express');
var app = express();
var route = express.Router();

app.use('/', route);
app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
    console.log("Listening to port : 3000");
});

route.get("/", function(req, res){
        res.sendFile(__dirname + "/views/index.html");
});