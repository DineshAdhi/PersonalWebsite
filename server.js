var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var exphbs  = require('express-handlebars');
var path = require('path');
var port = process.env.PORT || 5000;
var no_images = 3;

var json = { 
    "seeingtheunseeable" : "https://dineshthoughts.wordpress.com/2019/04/12/seeing-the-unseeable/",
    "thoughtscience1" : "https://dineshthoughts.wordpress.com/2018/11/26/thought-science-1/",
    "thoughtscience2" : "https://dineshthoughts.wordpress.com/2018/11/27/thought-science-2/",
    "thoughtscience3" : "https://dineshthoughts.wordpress.com/2018/12/04/thought-science-3/",
    "relationships" : "https://medium.com/@dinesh10c04/what-is-wrong-with-the-idea-of-relationship-b3b2ee96d0a8",
    "losingthekey" : "https://dineshthoughts.wordpress.com/2019/02/17/losing-the-key/",
    "minutetomidnight" : "https://dineshthoughts.wordpress.com/2018/09/03/a-minute-to-midnight/",
    "tonystark" : "https://dineshthoughts.wordpress.com/2018/06/04/tony-stark-the-marvel-avenger/",
    "theoryofeverything" : "https://dineshthoughts.wordpress.com/2018/05/07/the-theory-of-everything/",
    "beingignorant" : "https://dineshthoughts.wordpress.com/2017/08/28/the-art-of-being-an-ignorant/",
    "divinevsdosa" : "https://dineshthoughts.wordpress.com/2017/08/15/divine-vs-dhosa/",
    "tenmonthslater": "https://medium.com/@dinesh10c04/10-months-later-ea158bf7d818",
    "gameofcolor" : "https://medium.com/@dinesh10c04/the-game-of-colour-6c4700aeb3a8",
    "tomatoterrorist" : "https://dineshthoughts.wordpress.com/2019/04/15/the-tomato-terrorist-the-lok-sabha/",
    "profileimage" : "/images/profileimage.jpg"
}

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/views'));
app.use(favicon(path.join(__dirname, 'views', 'icons', 'favicon.ico')))

app.listen(port, function(){
    console.log("Listening to port : " + port);
});

app.get("/", function(req, res){
    var rand = Math.floor(Math.random() * (no_images - 1) + 1);
    json['profileimage'] = "/images/profileimage" + rand + ".jpg";
    res.render('home', json);
});

app.get("/posts", function(req, res){
   var id = req.query.id;
    
    if(json[id] == null)
    {
        res.send("Invalid post id");
        return;
    }
    
    res.redirect(json[id]);
});
