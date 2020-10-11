var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

module.exports = app => {
    const statistics = require("../controllers/controller");

    // Retrieve all Users
    app.get("/findAllUser", statistics.findAll);
    app.get("/insertTestUser", statistics.insert);
    app.post("/insert",jsonParser ,statistics.insert2);
    app.get("/deleteTestUser", statistics.delete);
    app.delete("/delete/:id", statistics.deletebyid);
    app.get("/updateTestUser", statistics.update);
    app.get("/init", statistics.init);
    app.post("/login",jsonParser,statistics.login);
    app.get("/authenticate", statistics.authenticateJWT);
    app.post("/jwt",jsonParser,statistics.generateJWT);




    
};