const expressJwt = require('express-jwt');
var secretKey = require('../jwt/constent');

var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var fakeBoardSQL = require('../db/fakeBoardsql');
var pool = mysql.createPool(dbConfig.mysql);

var express = require('express')
var router = express.Router();
var guard = require('express-jwt-permissions')();
router.use(guard.check(['user:write']));
router.post('/delete', (req, res, next) => {
    pool.getConnection((err, connection) => {
        var param = req.body || req.params;
        console.log('req.body is ', req.body, param.bid);
        connection.query(fakeBoardSQL.delteBoardById, [param.bid], (err, result) => {
            console.log('result is ', result);
            if (err) {
                console.log('删除失败 ', err.message)
                res.send({
                    "deleteBoard": "false"
                })
            } else {
                res.json({
                    deleteBoard: true,
                })
            }
            connection.release();
        });
    });
});
router.post('/add', (req, res, next) => {
    pool.getConnection((err, connection) => {
        var param = req.body || req.params;
        console.log('req.body is ', req.body, param);
        connection.query(fakeBoardSQL.addBoard, [param.title], (err, result) => {
            console.log('result is ', result);
            if (err) {
                console.log('添加board失败 ', err.message)
                res.send({
                    "addBoard": "false"
                })
            } else {
                //result返回一个对象
                if (result.insertId) {
                    res.json({
                        addBoard: true,
                        bid: result.insertId,
                    })
                } else {
                    res.send({
                        "addBoard": "false"
                    })
                }

            }
            connection.release();
        });
    });
});
router.use( (req, res, next) => {
    pool.getConnection((err, connection) => {
        var param = req.body || req.params;
        console.log('req.body is ', req.body, param);
        connection.query(fakeBoardSQL.queryAll, (err, result) => {
            console.log('result is ', result);
            if (err) {
                console.log('查询allboard失败 ', err.message)
                res.send({
                    "isFetchBoard": "false"
                })
            } else {
                //result返回一个对象
                if (result) {
                    res.json({
                        isFetchBoard: true,
                        boards: result,
                    })
                } else {
                    res.send({
                        "isFetchBoard": "false"
                    })
                }

            }
            connection.release();
        });
    });
});

module.exports = router