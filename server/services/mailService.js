'use strict';

var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var config = require('../config');



module.exports = {

	sendMail: function(req, res){


    	console.log('SEND mail');
		var generator = require('xoauth2').createXOAuth2Generator({
		    user: config.user,
		    clientId: config.clientId,
		    clientSecret: config.secret,
		    refreshToken: config.token,
		   
		});

		// listen for token updates
		// you probably want to store these to a db
		generator.on('token', function(token){
		    console.log('New token for %s: %s', token.user, token.accessToken);
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
		    to: 'tuhin.gupta@gmail.com',
		    subject: 'hello world!',
		    text: 'Authenticated with OAuth2'
		}, function(error, response) {
		   if (error) {
		        console.log(error);
		   } else {
		        console.log('Message sent');
		   }
		});

	}

};