const process = require('process');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = {
    'generateAccessToken': function (usuario) {
        return jwt.sign({name: usuario}, process.env.TOKEN_SECRET, {
            expiresIn: '86400s'
        });
    },
    'authenticateToken': function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.status(401).json({
                message: 'No se ha proveído un token'
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    },
    'ROLES': {
        'ADMIN': 1,
    }
}
