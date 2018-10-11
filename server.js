var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var exphbs  = require('express-handlebars');
var path = require('path');
var port = process.env.PORT || 5000;

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/views'));
app.use(favicon(path.join(__dirname, 'views', 'icons', 'favicon.ico')))

app.listen(port, function(){
    console.log("Listening to port : " + port);
});

app.get("/", function(req, res){
    res.render('home', {'dinesh': 'adhithya'});
});
