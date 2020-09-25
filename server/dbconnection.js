const {MongoClient} = require('mongodb');
/*var MongoClient = require('mongodb'),
Server = MongoClient.Server,
  Db = MongoClient.Db;*/
  
 /* var server = new Server('cluster0.dkyge.mongodb.net/test', 27017, {
    auto_reconnect: true
  });

  var db = new Db('Dipl', server);

  var onErr = function(err, callback) {
    db.close();
    callback(err);
  };*/

async function main(){
    
    const uri = "mongodb+srv://dbUser:dbUser@cluster0.dkyge.mongodb.net/test";

    const client = new MongoClient(uri);

   try {
        await client.connect();
 
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
/*
function list(firstname, callback) {
    db.open(function(err, db) {
      if (!err) {
        db.collection('User', function(err, collection) {
          if (!err) {
            collection.find({
              'firstname': firstname
            }).toArray(function(err, docs) {
              if (!err) {
                db.close();
                
            
                  strJson = '{"firstname":" + firstname }'
                  callback("", JSON.parse(strJson));
                
              } else {
                onErr(err, callback);
              }
            }); //collection.find 
          } else {
            onErr(err, callback);
          }
        }); //db.collection
      } else {
        onErr(err, callback);
      }
    }); //db.open
  };*/