const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://chandu93:Balaji10@ds155577.mlab.com:55577/customerdata', ['customerdata']);


router.get('/customerdata', function(req, res, next)
{
	db.customerdata.find(function(err, data)
	{
		if(err)
		{

			res.send(err);
		}
		res.json(data);
	});
});

//get single task

router.get('/customerdata/:id', function(req, res, next)
{
	db.customerdata.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, data)
	{
		if(err)
		{
			res.send(err);
		}
		res.json(data);
	});
});

module.exports = router;