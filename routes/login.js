module.exports = app => {

    const users = require('../controllers/userController.js');
    var router = require('express').Router();

    router.post("/account", users.login);
    router.get("/account", users.getAccount);

    app.use('/api', router);
}