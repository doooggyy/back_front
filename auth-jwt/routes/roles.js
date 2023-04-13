const express = require('express');
const utilities = require('../util/utilities');


function init(Rol) {
    const router = express.Router();

    router.use((req, res, next) => {
        next();
    });

    router.get('/', utilities.authenticateToken, (req, res) => {
        Rol.findAll().then(roles => res.json(roles));
    });

    return router;
}

module.exports = init;
