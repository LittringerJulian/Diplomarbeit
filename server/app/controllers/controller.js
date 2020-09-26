let mongoUtil = require("../mongo.util");
var User = require("../../user.js");

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

    var newUser = new User();
    newUser.id = req.body.id;
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
            console.log("1 User inserted");
            res.send("User inserted");
          });
        } else {
          console.log("email already exists");
          res.send("email already exists");
        }
      });
  });
};

exports.login = (req, res) => {
  mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    const db = mongoUtil.getDB();

    var newUser = new User();

    db.collection("User")
      .find({ email: req.body.email, password: req.body.password })
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
          newUser.found = "success";
          newUser.id = result[0].id;
          newUser.firstname = result[0].firstname;
          newUser.email = result[0].email;
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