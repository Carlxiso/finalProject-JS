'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
  res.json(data);

});

router.post('/', function(req, res) {
    var car = {
		id: req.body.id,
		image: req.body.image,
	    brandModel: req.body.brandModel,
	    year: req.body.year,
	    plate: req.body.plate,
	    color: req.body.color
	}
	data.push(car);
	res.json(car);
});

module.exports = router;
