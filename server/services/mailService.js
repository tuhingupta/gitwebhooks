'use strict';

var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var config = require('../config');



module.exports = {

	sendMail: function(req, res){


    	console.log('SEND mail service');
    	console.log(req.body.repository.name+' '+req.body.pusher.name);

		var generator = require('xoauth2').createXOAuth2Generator({
		    user: config.user,
		    clientId: config.clientId,
		    clientSecret: config.secret,
		    refreshToken: config.token,
		   
		});

		// listen for token updates
		generator.on('token', function(token){
		   // console.log('New token for %s: %s', token.user, token.accessToken);
		});

		// login
		var transporter = nodemailer.createTransport(({
		    service: 'gmail',
		    auth: {
		        xoauth2: generator
		    }
		}));

		// send mail
		transporter.sendMail({
			from: config.from,	
		    to: req.body.pusher.email,
		    subject: 'Accept Innov8s Licence to contribute to '+req.body.repository.name,
		    text: 'Dear '+req.body.pusher.name+',\n\nYou are getting this mail because you tried to commit code '+ 
		    	   'to Innov8s repository '+req.body.repository.name +
		    	   '\nAs a prerequisite, you would need to accept Innov8s licence, available on it repository home page. '+
		    	   '\nClick the link and accept to contribute. Repository link - '+req.body.repository.url+
		    	   '\n\nDo not reply to this email.'
		}, function(error, response) {
		   if (error) {
		        console.log(error);
		   } else {
		        console.log('Message sent');
		   }
		});

	}

};