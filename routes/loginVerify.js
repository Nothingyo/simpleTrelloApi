var express = require('express');
var secretKey = require('../jwt/constent')
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200', msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

//router.route只能返回一个，并且同一个方法只匹配第一个
router.route(['/', '/login'])
  .post((req, res, next) => {
    pool.getConnection((err, connection) => {
      var param = req.body || req.params;
      console.log('req.body is ', req.body, param);
      connection.query(userSQL.loginVerify, [param.email, param.password], (err, result) => {
        console.log('result is ', result);
        if (err) {
          console.log('用户登陆失败 ', err.message)
          res.send({
            "isLogin": "false"
          })
        } else {
          //result返回一个数组
          if (result[0]) {
            const jwt = require('jsonwebtoken')
            let token = jwt.sign({
              id: result[0].id,
              permissions: [
                "user:write"
              ]
            },
              secretKey,
              {
                expiresIn: 60 * 60 * 24 * 7
              });
            res.json({
              isLogin: true,
              token: token
            })
          } else {
            res.send({
              "isLogin": "false"
            })
          }

        }
        connection.release();
      });
    });
  })

module.exports = router;
