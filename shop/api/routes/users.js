var express = require('express');
var router = express.Router();
const mongo = require("mongodb-curd");
const db = "shop";
const coll = "user";

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});


router.post('/login', function(req, res, next) {
	var user = req.body.user;
	var password = req.body.password;
	mongo.find(db, coll, {
		user
	}, function(str) {
		if (str.length == 0) {
			return res.json({
				code: 0,
				target: "账户不存在"
			});
		}
		if (str[0].password == password) {
			delete str[0].user;
			delete str[0].password;
			delete str[0].zpassword;
			res.json({
				code: 1,
				target: "验证成功",
				data: str[0]
			});
		} else {
			res.json({
				code: 0,
				target: "密码验证有误"
			});
		}
	})

});
router.post('/regs', function(req, res, next) {
	var user = req.body.user;
	var data=req.body;
	mongo.find(db, coll, {
		user
	}, function(str) {
		if (str.length > 0) {
			return res.json({
				code: 0,
				target: "账户已存在"
			});
		}
		
		mongo.insert(db,coll,{data},function(str){})
	})
});


module.exports = router;
