var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var exphbs  = require('express-handlebars');
var path = require('path');
var admin = require('firebase-admin');
var serviceAccount = require("./serviceaccount.json")
var port = process.env.PORT || 5000;
var no_images = 3;

var json = {};
var posts = {};

// Firebase Implementation
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
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

    var profileimage = "/images/profileimage.png";
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
    posts[id]["views"] += 1;
    counter.doc(id).update({views : posts[id]["views"]});
    res.redirect(url);
});
