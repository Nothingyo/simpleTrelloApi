const expressJwt = require('express-jwt');
const { secretKey } = require('./const');
const jwtAuth = expressJwt({ secret: 'simple_trello' }).unless({
    path: [
        '/login', '/'
    ]
});

module.exports = jwtAuth;