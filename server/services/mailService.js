'use strict';

var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var config = require('../config');



module.exports = {

	sendMail: function(req, res){


    	console.log('SEND mail service');
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
		    to: 'tuhin.gupta@aexp.com',
		    subject: 'Accept Innov8s Licence to contribute',
		    text: config.mailtext
		}, function(error, response) {
		   if (error) {
		        console.log(error);
		   } else {
		        console.log('Message sent');
		   }
		});

	}

};