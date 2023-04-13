const express = require('express');
const router = express.Router();
const utilities = require('../util/utilities');

function init(Estado) {
    router.use((req, res, next) => {
        next();
    });

    router.get('/', utilities.authenticateToken, (req, res) => {
        Estado.findAll().then(data => res.json(data));
    });

    router.post('/', utilities.authenticateToken, (req, res) => {
        const user = req.user;

        if (user.name.rol != utilities.ROLES.ADMIN) {
            return res.status(401).json({
                message: 'No tiene permisos para realizar esta acción.'
            });
        }

        Estado.create(req.body).then(data => res.json(data));
    });

    // Actualizar un estado:
    router.put('/:id', utilities.authenticateToken, (req, res) => {
        const user = req.user;

        if (user.name.rol != utilities.ROLES.ADMIN) {
            return res.status(401).json({
                message: 'No tiene permisos para realizar esta acción.'
            });
        }

        Estado.update(req.body, {
            where: { id: req.params.id }
        }).then(data => Estado.findByPk(req.params.id).then(data => res.json(data)));
    });

    return router;
}

module.exports = init;
