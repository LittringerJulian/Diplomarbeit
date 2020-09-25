let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://dbUser:dbUser@cluster0.dkyge.mongodb.net/test";

let _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect(url, function( err, client ) {
      _db = client.db("Dipl");
      return callback( err );
    } );
  },

  getDB: function() {
    return _db;
  },

  disconnectDB: function() {
    _db.close()
  }

};