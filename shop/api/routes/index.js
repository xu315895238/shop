var express = require('express');
var router = express.Router();
const mongo = require("mongodb-curd");
const db = "shop";
const coll = "shoplist";

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.get('/shoplist', function(req, res, next) {

	var skip = req.body.page;
	var limit = req.body.pagesize;
	mongo.find(db, coll, function(str) {
		res.json(str);
	}, {
		skip,
		limit
	})

});

module.exports = router;
