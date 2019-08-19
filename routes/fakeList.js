var express = require('express');
var router = express.Router();
var listSQL=require('../db/listsql');
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = mysql.createPool(dbConfig.mysql);


router.post('/add', (req, res, next) => {
    pool.getConnection((err, connection) => {
        var param = req.body || req.params;
        console.log('req.body is ', req.body, param);
        connection.query(listSQL.addList, [param.title,param.bid], (err, result) => {
            console.log('result is ', result);
            if (err) {
                console.log('添加list失败 ', err.message)
                res.send({
                    "addList": "false"
                })
            } else {
                //result返回一个对象
                if (result.insertId) {
                    res.json({
                        addList: true,
                        lid: result.insertId,
                    })
                } else {
                    res.send({
                        "addList": "false"
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
        connection.query(listSQL.queryAll,[param.bid], (err, result) => {
            console.log('result is ', result);
            if (err) {
                console.log('查询allList失败 ', err.message)
                res.send({
                    "isFetchList": "false"
                })
            } else {
                //result返回一个对象
                if (result) {
                    res.json({
                        lists: result,
                    })
                } else {
                    res.send({
                        "isFetchList": "false"
                    })
                }

            }
            connection.release();
        });
    });
});

module.exports = router;