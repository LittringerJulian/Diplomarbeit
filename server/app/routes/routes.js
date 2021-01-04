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

    app.get("/jwt2/:id",jsonParser,statistics.generateJWT2);
    app.post("/findMail",jsonParser,statistics.getIdByMail);

    app.post("/insertScheme",jsonParser ,statistics.insertScheme);

    app.post("/getScheme",jsonParser,statistics.getSchemeById);
    app.get("/getSchemeByUserId",jsonParser,statistics.getSchemeByUserId);
    app.post("/insertPublicScheme",jsonParser,statistics.insertPublicScheme);
    //app.get("/findAllPublic",jsonParser,  statistics.findAllPublic);
    
    app.post("/updateScheme", jsonParser,statistics.updateScheme);
    
    app.get("/findAllPublic",jsonParser,  statistics.getPublic);
    app.get("/getUserInfo",jsonParser,  statistics.getUserInformation);
    
    
    app.post("/getPublicSchemeBy", jsonParser,statistics.getPublicByFilter);

};