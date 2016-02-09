'use strict';

/*
 *  Controller which handles api requests coming from the router.
 */

var mailService = require('./mailService');

module.exports = {
	
	/*
	 *  
	 */
	getInfoJSON: function (req, res) {
		
		mailService.sendMail;
		console.log('----<>'+res.body);

		//var config = req.app.get('config');
		//res.json(config);
		res.send(200);
	},

	addLicence: function(req, res){

		var config = req.app.get('config');
		
		config.push(req.body);
		req.app.set('config',config);

		console.log(config);

		res.send(201);
	},

	webhooks: function(req,res){
		console.log(req.body);
		res.send(204);
	}

};