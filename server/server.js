var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require('body-parser')
require("./app/routes/routes.js")(app);
var User = require("./user.js");
var crypto = require('crypto');
var jsonParser = bodyParser.json()

let mongoUtil = require("./app/mongo.util");



mongoUtil.connectToServer(function(err,client){
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("User").find({}).toArray(function(err,result){
        if (err) throw err;
        console.log(result);
    })
})




http.listen(3000,function(){
console.log("listening on port: 3000");
})


