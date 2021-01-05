let mongoUtil = require("../mongo.util");
var User = require("../../user.js");
var User_id = require("../../user_id.js");
var User_new = require("../../user_new.js");
var Scheme = require("../../scheme.js");
var ObjectID = require('mongodb').ObjectID;



const jwt = require("jsonwebtoken");
const { JWTError } = require("json-web-token");
const dotenv = require("dotenv");
dotenv.config();
process.env.TOKEN_SECRET;


exports.findAll = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    db.collection("User")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
};

exports.init = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    var myobj1 = {
      id: 1,
      firstname: "robin",
      lastname: "wiesinger",
      email: "rw@gmail.com",
      sex: "M",
      password: "geheim",
    };

    var myobj2 = {
      id: 2,
      firstname: "julian",
      lastname: "littringer",
      email: "lt@gmail.com",
      sex: "M",
      password: "geheim",
    };

    db.collection("User").insertMany([myobj1, myobj2], function (err, result) {
      if (err) throw err;
      console.log("Initialized");
      res.send("Initialized");
    });
  });
};


//getPublicSchemes
exports.getPublic = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();





    //var string = JSON.parse(req.body.id);
    //var objectid=new ObjectID(req.params.id);

    db.collection("Scheme")
      .find({ published:true  })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
  });
};


//getPublicSchemes by Filter
exports.getPublicByFilter = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var i = 0;


    console.log(req.body.format)

    //var string = JSON.parse(req.body.id);
    //var objectid=new ObjectID(req.params.id);


    var query;
    var formatinput = req.body.format
    var taginput = req.body.tags
    var formatenabled=true;
    var tagsenabled=true;

    if(formatinput==null){
      formatenabled=false;
      
    }
    if(taginput==null){
      tagsenabled = false;
    }

    
    
    console.log(formatenabled,tagsenabled)
    switch (formatenabled+" "+tagsenabled){

      case "false false" :
        query = {published :true}
      break;
      case "true false" :
        query = {published :true,format:formatinput}
      break;
      case "false true" :
        query={published:true,tags:{$all :req.body.tags}}
      break;
      case "true true" :
        query = {published:true,format:req.body.format,tags:{$all :req.body.tags}}
      break;
    }

    console.log(query)
    

    db.collection("Scheme")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result)
      });
  });
};


//insert new Scheme
exports.insertScheme = (req, res) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  let payload;
  payload = jwt.verify(token, process.env.TOKEN_SECRET)
  console.log(payload)
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    var newScheme = new Scheme();
    newScheme.content = req.body.content;
    newScheme.name = req.body.name;
    newScheme.format = req.body.format;
    newScheme.userid = ObjectID(payload);
    newScheme.published=req.body.published;
    newScheme.tags=req.body.tags;



    db.collection("Scheme").insertOne(newScheme, function (err, result) {
      if (err) throw err;
      res.send("Scheme inserted");
    });
  });
};

//get Scheme by ID
exports.getSchemeById = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();





    //var string = JSON.parse(req.body.id);
    //var objectid=new ObjectID(req.params.id);

    db.collection("Scheme")
      .find({ _id: ObjectID(req.body.id) })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result[0].content)
      });
  });
};

exports.getSchemeByUserId = (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  let payload;
  payload = jwt.verify(token, process.env.TOKEN_SECRET)

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();


    //var string = JSON.parse(req.body.id);
    //var objectid=new ObjectID(req.params.id);

    db.collection("Scheme")
      .find({ userid: ObjectID(payload) })
      .toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result)
      });
  });
};

//insert into PublicScheme
exports.insertPublicScheme = (req, res) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  //verify Token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)


    //connecttoDb
    mongoUtil.connectToServer(function (err, client) {
      if (err) console.log(err);

      const db = mongoUtil.getDB();
      var myobj = {
        Schemeid: ObjectID,
        tags: []
      };
      myobj.Schemeid = ObjectID(req.body.schemeid);
      myobj.tags = req.body.tags;


      //find if exists
      db.collection("PublicScheme")
        .find({ Schemeid: myobj.Schemeid })
        .toArray(function (err, result) {
          if (err) throw err;
          if (result.length > 0) {
            console.log("found");
            res.send("found")
          }
          else {

            //insert
            db.collection("PublicScheme").insertOne(myobj, function (err, result) {
              if (err) throw err;
              res.send("inserted")

            });
          }
        });
    });
  })
};




exports.insert = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    var myobj = {
      id: 0,
      firstname: "neuer",
      lastname: "TestUser",
      email: "nt@gmail.com",
      sex: "M",
      password: "geheim",
    };

    db.collection("User").insertOne(myobj, function (err, result) {
      if (err) throw err;
      console.log("1 User inserted");
      res.send("User inserted");
    });
  });
};

exports.insert2 = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    var newUser = new User_id();
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.email = req.body.email;
    newUser.sex = req.body.sex;
    newUser.password = req.body.password;


    const db = mongoUtil.getDB();
    console.log(req.body.email);

    db.collection("User")
      .find({ email: req.body.email })
      .toArray(function (err, result) {
        if (result.length == 0) {

          db.collection("User").insertOne(newUser, function (err, result) {
            if (err) throw err;
            console.log(result.ops[0]._id)
            newUser.inserted = "success";
            newUser._id = result.ops[0]._id;
            newUser.firstname = result.ops[0].firstname;
            newUser.email = result.ops[0].email;
            console.log(newUser)
            res.send(newUser);
          });
        } else {
          console.log(result);

          newUser.inserted = "emailexists"

          console.log("email already exists");
          res.send(newUser);
        }
      });
  });
};

exports.login = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    var newUser = new User_new();
    console.log("email:" + req.body.email)
    console.log("password:" + req.body.password)

    db.collection("User")
      .find({ email: req.body.email, password: req.body.password })
      .toArray(function (err, result) {
        if (err) throw err;
        //console.log(result);
        if (result.length > 0) {

          var json = {
            "id": result[0].id,
            "firstname": result[0].firstname,
            "email": result[0].email,
            "found": "success",
          }
          newUser.found = "success";
          //newUser.id = result[0].id;
          newUser._id = result[0]._id;
          newUser.firstname = result[0].firstname;
          newUser.email = result[0].email;
          console.log(newUser)
          res.send(newUser);
        } else {
          newUser.found = "failed";
          res.send(newUser);
        }
      });
  });
};

exports.delete = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    var myquery = { id: 0 };
    db.collection("User").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 User deleted");
      res.send("User deleted");
    });
  });
};

exports.deletebyid = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();
    var myquery = { id: parseInt(req.params.id) };

    db.collection("User").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 User deleted");
      res.send("User deleted");
    });
  });
};

exports.update = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    var myquery = { id: 0 };
    var newvalues = { $set: { firstname: "updated", lastname: "TestUser" } };
    db.collection("User").updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      console.log("1 User updated");
      res.send("User updated");
    });
  });
};

exports.authenticateJWT = (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  let payload;
  payload = jwt.verify(token, process.env.TOKEN_SECRET)
  console.log("payload: " + payload);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    //eq.user = user

    res.send("allowed");
  })

};

exports.updateScheme = (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  let payload;
  payload = jwt.verify(token, process.env.TOKEN_SECRET)

  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    console.log(req.body._id)
    var myquery = { _id: ObjectID(req.body._id) };
    var newScheme = new Scheme();
    newScheme.content = req.body.content;
    newScheme.name = req.body.name;
    newScheme.format = req.body.format;
    newScheme.userid = ObjectID(payload);
    newScheme.published=req.body.published;
    newScheme.tags=req.body.tags;

    var newvalues = { $set: newScheme };

    db.collection("Scheme").updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      console.log("1 Scheme updated");
      res.send("updated");
    });
  });
};

exports.generateJWT = (req, res) => {


  console.log(req.body.id)
  console.log(jwt.sign(req.body.id, process.env.TOKEN_SECRET));

  var token = jwt.sign(req.body.id, process.env.TOKEN_SECRET);
  res.send(token);
};

exports.generateJWT2 = (req, res) => {


  console.log(req.params.id)
  const id = req.params.id;
  console.log(jwt.sign(req.params.id, process.env.TOKEN_SECRET));
  //var token = jwt.sign(req.params.id, process.env.TOKEN_SECRET);
  const token = jwt.sign(id, process.env.TOKEN_SECRET, {
    algorithm: "HS256"
  })

  res.send(token);
};


exports.getIdByMail = (req, res) => {
  const db = mongoUtil.getDB();


  db.collection("User")
    .find({ email: req.body.email })
    .toArray(function (err, result) {
      if (result.length == 0) {
        res.send("No User found")

      } else {
        res.send(result[0]._id);
      }
    });

};

exports.getUserInformation = (req, res) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  let payload;
  payload = jwt.verify(token, process.env.TOKEN_SECRET)

  var userid = ObjectID(payload);

  const db = mongoUtil.getDB();


  console.log(payload)
  db.collection("User")
    .find({ _id:userid })
    .toArray(function (err, result) {
      var json = {
        "firstname": result[0].firstname,
        "lastname": result[0].lastname,
        "email": result[0].email
      }
      console.log(json)
      res.send(json)
    });

};


