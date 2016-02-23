'use strict';

/*
 *  Controller which handles api requests coming from the router.
 */

var mailService = require('./mailService');
var request = require('request');
var config = require('../config');


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

	webhooksPush: function(req,res){
		
		var acceptedUsers = req.app.get('acceptedUsers');
		var userName = req.body.pusher.name;

		console.log('Webhook for '+ userName);

		var bool = false;

		for (var i = 0; i < acceptedUsers.length; i++) {
			var user = acceptedUsers[i];

			console.log('Accepted Users '+user.loginid);
			console.log(user.loginid.trim()===userName);

			if(user.loginid.trim()==userName){
				bool = true;
				break;
			}
		}

		if(!bool){
			mailService.sendMail(req,res);
		}

		res.send(204);
	},

	webhooksPull: function(req,res){
		
		var body = req.body;
		var postURL = req.body.pull_request.url;
		var user = req.body.pull_request.user.login;
		console.log('Webhook for '+ postURL + ' - '+user);
		var message = 'User '+user+' has not accepted our Licence yet.'

		request({
			    url: postURL, //URL to hit
			    //qs: {from: 'blog example', time: +new Date()}, 
			    method: 'PATCH',
			    headers: { 
			        'Content-Type': 'application/json',
			        'Authorization': config.authToken,
			        'User-Agent': 'https://api.github.com/meta'
			    },
			    json: {"title":message, 
			    		"body":message, 
			    		"state":"open"
			    	}
			}, function(error, response, body){
			    if(error) {
			        console.log(error);
			    } else {
			        console.log(response.statusCode, body);
			}
			});


		res.send(204);
	}

};