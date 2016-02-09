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
		var acceptedUsers = req.app.get('acceptedUsers');
		res.json(acceptedUsers);
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
		console.log('---------------------');
		console.log(req.body.repository.name);
		console.log(req.body.repository.pusher.name);
		console.log(req.body.repository.url);
		console.log('----------------------');

		mailService.sendMail(req,res);
		res.send(204);
	}

};