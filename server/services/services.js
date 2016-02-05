'use strict';

/*
 *  Controller which handles api requests coming from the router.
 */
module.exports = {
	
	/*
	 *  
	 */
	getInfoJSON: function (req, res) {
		res.json({
		    name: 'Bob'
		  });
		res.send(200);
	},

	addName: function(req, res){

		console.log(req.body.name);
		res.send(201);
	},

	webhooks: function(req,res){
		console.log(req.body);
		res.send(204);
	}
};