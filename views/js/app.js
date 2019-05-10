console.log("dinesh");
var config = {
    apiKey: "AIzaSyBSuDVH6kQfly11M6PC19HzMZIHS3_Ixpc",
    authDomain: "personal-website-ea106.firebaseapp.com",
    databaseURL: "https://personal-website-ea106.firebaseio.com",
    projectId: "personal-website-ea106",
    storageBucket: "personal-website-ea106.appspot.com",
    messagingSenderId: "798911983888"
};

var posts = {};

firebase.initializeApp(config);
var db = firebase.firestore();
var counter = db.collection('Posts');

function trigger(id) {
    posts[id]["views"] += 1;
    console.log(posts[id]["views"]);

    var views_id = id + "_views";

    document.getElementById(views_id).innerHTML = posts[id]["views"] + " Views";

    counter.doc(id).update({views : posts[id]["views"]});
}


counter.onSnapshot(snapshot =>{
    snapshot.forEach((record)=>{
        var id = record.id;
        posts[id] = record.data();
        
        var title_id = id + "_title";
        var views_id = id + "_views";
    
        console.log(views_id + " : " + posts[id]["views"]);

        document.getElementById(title_id).innerHTML = posts[id]["title"];
        document.getElementById(views_id).innerHTML = posts[id]["views"] + " Views";
    });
});

