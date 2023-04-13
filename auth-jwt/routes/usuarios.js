const bcrypt = require('bcrypt');

const express = require('express');
const utilities = require('../util/utilities');

function init(Usuario) {
    const router = express.Router();

    router.use((req, res, next) => {
        next();
    });

    router.get('/', utilities.authenticateToken, (req, res) => {
        Usuario.findAll().then(usuarios => res.json(usuarios));
    });

    router.post('/', (req, res) => {
        const body = req.body;
        const password = body.password;

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.status(500).json({
                    error: err
                });
            }

            body.password = hash;

            Usuario.create(req.body).then(usuario => {
                res.json({
                    message: 'Usuario creado exitosamente'
                });
            });
        });
    });

    router.post('/login', (req, res) => {
        const body = req.body;
        const email = body.email;
        const password = body.password;

        Usuario.findOne({
            where: {
                email: email
            }
        }).then(usuario => {
            if (usuario) {
                bcrypt.compare(password, usuario.password, (err, result) => {
                    if (err) {
                        res.status(401).json({
                            message: 'Usuario o contraseña incorrectos'
                        });
                    } else {
                        if (result) {
                            const token = utilities.generateAccessToken({'id': usuario.id, 'email': usuario.email, 'rol': usuario.rol_id});
                            res.json({
                                message: 'Usuario autenticado exitosamente',
                                token: token
                            });
                        } else {
                            res.status(401).json({
                                message: 'Usuario o contraseña incorrectos'
                            });
                        }
                    }
                });
            } else {
                res.status(401).json({
                    message: 'Usuario o contraseña incorrectos'
                });
            }
        });
    });


    return router;
}

module.exports = init;
