const expressJwt = require('express-jwt');
var secretKey  = require('./constent');
//跳过路由 '/login','/'
const jwtAuth = expressJwt({ secret: secretKey }).unless({
    path: [
        '/login', '/'
    ]
});
module.exports = jwtAuth;