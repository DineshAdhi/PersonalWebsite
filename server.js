var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var exphbs  = require('express-handlebars');
var path = require('path');
var firebase = require('firebase');
var port = process.env.PORT || 5000;
var no_images = 3;

var json = {};
var posts = {};

// Firebase Implementation

var config = {
    apiKey: "AIzaSyBSuDVH6kQfly11M6PC19HzMZIHS3_Ixpc",
    authDomain: "personal-website-ea106.firebaseapp.com",
    databaseURL: "https://personal-website-ea106.firebaseio.com",
    projectId: "personal-website-ea106",
    storageBucket: "personal-website-ea106.appspot.com",
    messagingSenderId: "798911983888"
};

firebase.initializeApp(config);
var db = firebase.firestore();
var counter = db.collection('Posts');

counter.orderBy('index', 'desc').get().then(snapshot =>{
    snapshot.forEach((record)=>{
        var id = record.id;
        posts[id] = record.data();
        posts[id]["id"] = id;
    });
});

////////////////////////////////////////

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');
app.use("/css", express.static(__dirname + '/views/css'));
app.use("/icons", express.static(__dirname + '/views/icons'));
app.use("/js", express.static(__dirname + '/views/js'));
app.use("/images", express.static(__dirname + '/views/images'));
app.use("/", express.static(__dirname));

app.use(favicon(path.join(__dirname, 'views', 'icons', 'favicon.ico')))

app.listen(port, function(){
    console.log("Listening to port : " + port);
});

app.get("/", function(req, res){

    counter.orderBy('index', 'desc').get().then(snapshot =>{
        snapshot.forEach((record)=>{
            var id = record.id;
            posts[id] = record.data();
            posts[id]["id"] = id;
        });
    });

    var rand = Math.floor(Math.random() * (no_images - 1) + 1);
    var profileimage = "/images/profileimage" + rand + ".jpg";
    res.render('home', { profileimage : profileimage, posts : posts});
});

app.get("/posts", function(req, res){
    var id = req.query.id;
    
    if(posts[id] == null)
    {
        res.send("Invalid post id");
        return;
    }

    var url = posts[id]["url"];
    res.redirect(url);
});
