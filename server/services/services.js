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
		
		var acceptedUsers = req.app.get('acceptedUsers');
		res.json(acceptedUsers);
		res.send(200);
	},

	addLicence: function(req, res){

		var acceptedUsers = req.app.get('acceptedUsers');
		
		acceptedUsers.push(req.body);
		req.app.set('acceptedUsers',acceptedUsers);

		//console.log(acceptedUsers);

		res.send(201);
	},

	webhooks: function(req,res){
		
		var acceptedUsers = req.app.get('acceptedUsers');
		var userName = req.body.repository.name;

		console.log('Webhook for '+ userName);

		var bool = false;

		for (var i = 0; i < acceptedUsers.length; i++) {
			var user = acceptedUsers[i];

			console.log('Accepted Users '+user.loginid);
			
			if(user.loginid.trim()===userName){
				bool = true;
				break;
			}
		};

		if(bool){
			mailService.sendMail(req,res);
		}

		res.send(204);
	}

};