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
			console.log(user.loginid.trim()==userName);

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
		var loginid = req.body.pull_request.user.login;
		console.log('Webhook for '+ postURL + ' - '+loginid);
		var message = 'Pull Request Closed: User '+loginid+' has not accepted our Licence yet. First accept Innov8s Licence agreement';
		var status = req.body.action;
		var acceptedUsers = req.app.get('acceptedUsers');
		var bool = false;

		acceptedUsers.push({"name":"dev tuhin","loginid":"tuhingupta","selection":"accept","date":"2016-02-23T18:10:18.755Z"});

		if(status == 'opened' || status =='reopened'){

		

			//check if users accepted licence
			for (var i = 0; i < acceptedUsers.length; i++) 
			{
				var user = acceptedUsers[i];

				console.log('Accepted Users '+user.loginid);
				console.log(user.loginid.trim()==loginid);

				if(user.loginid.trim()==loginid){
					bool = true;
					break;
				}
			}//for

			console.log('value of bool '+bool);
			
			if(!bool){
				request({
					    url: postURL, //URL to hit
					    //qs: {from: 'blog example', time: +new Date()}, 
					    method: 'PATCH',
					    headers: { 
					        'Content-Type': 'application/json',
					        'Authorization': config.authToken,
					        'User-Agent': 'https://api.github.com/meta'
					    },
					    json: {  //"title":message, 
					    		"body":message, 
					    		"state":"closed"
					    	}
					}, function(error, response, body){
					    if(error) {
					        console.log(error);
					    } else {
					        console.log(response.statusCode, body);
					}
					});

				//mailService.sendMail(req,res);
			}else{
				console.log('user has accepted licence');
			}
		}else{
			console.log('webhook not for open');
		}

		res.send(204);
		
	}

};