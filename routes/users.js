
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var express = require('express');
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

// 添加用户
router.get('/addUser', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.query || req.params;
    // 建立连接 增加一个用户信息 
    connection.query(userSQL.insert, [param.email, param.password], function (err, result) {
      if (result) {
        result = {
          code: 200,
          msg: '增加成功'
        };
      }

      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);

      // 释放连接  
      connection.release();

    });
  });
});

router.get('/searchUser', function (req, res, next) {
  // 从连接池获取连接 
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数  
    var param = req.query || req.params;
    // 建立连接 查询一个用户信息       result返回结果可能为[{...}],[]
    connection.query(userSQL.getUserById, [param.id], function (err, result) {

      // 以json形式，把操作结果返回给前台页面     
      responseJSON(res, result);

      // 释放连接  
      connection.release();

    });
  });
});

//router.route只能返回一个，并且同一个方法只匹配第一个
router.route(['/', '/login'])
//   .get( function (req, res, next) {
//     pool.getConnection(function (err, connection) {
//     // 获取前台页面传过来的参数  
//     var param = req.query || req.params;
//     // 建立连接 查询一个用户信息       result返回结果可能为[{...}],[]
//     connection.query(userSQL.getUserById, [param.id], function (err, result) {

//       // 以json形式，把操作结果返回给前台页面     
//       responseJSON(res, result);

//       // 释放连接  
//       connection.release();

//     });
//   })
// })
  .get((req,res,next)=>{
    pool.getConnection((err,connection)=>{
      var param=req.query||req.params;
      connection.query(userSQL.queryIsLogin,[param.email],(err,result)=>{
        responseJSON(res,result);
        connection.release();
      });
    });
  })
  .post((req,res,next)=>{
    pool.getConnection((err,connection)=>{
      var param=req.body;
      // console.log(param);
      connection.query(userSQL.updateLogin,[param.isLogin,param.email],(err,result)=>{
        if(err){
          console.log('数据修改失败 ',err.message)
        }else{
          console.log('param.isLogin is ',param.isLogin)
          res.send({
            "isLogin":"true"
          })
        }
        connection.release();
      });
    });
  })

module.exports = router;
