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
            posts[id]["hoverheight"] = posts[id]["index"] * 3;

            if(posts[id]["series"] == true)
            {
                posts[id]["serieslength"] = (posts[id]["chapters"].length + 1) * 8 + "vh"
                console.log(posts[id]);
            }
        });
    });

    var profileimage = "/images/profileimage.png";
    res.render('home', { profileimage : profileimage, posts : posts});
});

app.get("/posts", function(req, res){
    var id = req.query.id;
    var series = req.query.series;
    var chapterid = req.query.chapterid;
    var url = "";

    if(posts[id] == null)
    {
        res.send("Invalid post id");
        return;
    }

    if(series == 'true')
    {
        var array = posts[id]["chapters"];

        for(var i=0; i<array.length; i++)
        {
             var chapter = array[i];
             
             if(chapter["chapterid"] == chapterid)
             {
                 url = chapter["url"];
                 break;
             }
        }
    }
    else 
    {
        url = posts[id]["url"];
    }

    posts[id]["views"] += 1;
    counter.doc(id).update({views : posts[id]["views"]});
    res.redirect(url);
});
