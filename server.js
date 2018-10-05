var express = require('express');
var app = express();
var route = express.Router();
var port = process.env.PORT || 5000;

app.use('/', route);
app.use(express.static(__dirname + '/views'));

app.listen(port, function(){
    console.log("Listening to port : " + port);
});

route.get("/", function(req, res){
        res.sendFile(__dirname + "/views/index.html");
});
