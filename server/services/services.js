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
		
		console.log(mailService);
		mailService.sendMail(req,res);
		
		//var acceptedUsers = req.app.get('acceptedUsers');
		//res.json(acceptedUsers);
		res.send(200);
	},

	addLicence: function(req, res){

		var acceptedUsers = req.app.get('acceptedUsers');
		
		acceptedUsers.push(req.body);
		req.app.set('acceptedUsers',acceptedUsers);

		console.log(acceptedUsers);

		res.send(201);
	},

	webhooks: function(req,res){
		console.log(req.body);
		res.send(204);
	}

};