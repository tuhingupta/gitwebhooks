'use strict';

var nodemailer = require('nodemailer');

module.export = {

	sendMail: function(req, res){

		var transporter = nodemailer.createTransport("SMTP",{
        service: 'Gmail',
        auth: {
            user: 'tuhin.gupta@gupta.com', // Your email id
      //      pass: '' // Your password
        		}
    	});

    	var text = 'You need to accept Licence information given on Repository page before you can commit code. \n\n';

    	var mailOptions = {
		    from: 'tuhin.gupta@gmail.com', // sender address
		    to: 'tuhin.gupta@aexp.com', // list of receivers
		    subject: 'Your GitHub commit', // Subject line
		    text: text //, // plaintext body
		    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
		};

		var smtpTransport = nodemailer.createTransport('SMTP', {
		    service: 'Gmail',
		    auth: {
		      XOAuth2: {
		        user: 'tuhin.gupta@gmail.com',
		        clientId: '471078254015-nvqormdl1nla4emgj1nv2ob5t5pu2qj6.apps.googleusercontent.com',
		        clientSecret: 'ZRru_G0L7K3jdLCW6Z2SLtuD',
		        refresh_token: "1/uau1FwZ-0ZJQDetR0EfGJSEEpa3wIw_Pephp4xkD1NM"
		      //  timeout: smtpConfig.access_timeout - Date.now()
		      }
		    }
		  });
		var transporter1 = nodemailer.createTransport({
		    service: 'gmail',
		    auth: {
		        xoauth2: xoauth2.createXOAuth2Generator({
		            user: 'tuhin.gupta@gmail.com',
		            clientId: '407408718192.apps.googleusercontent.com',
		           // clientSecret: '{Client Secret}',
		            refreshToken: '1/T_HodIUEa_ofWQNFvPnpNnNXrVICAjBo7bRUi0OAuBc',
		            accessToken: 'ya29.ggIEIy6_F1qnv-q9YE8LAU5BN1XTFJ2Tgag5_GkonW-fJOBwPgSc06bl18JqA1BT7Jkc'
		        })
		    }
		});

		transporter1.sendMail(mailOptions, function(error, info){

			console.log('&&&&reached here');
		    if(error){
		        console.log(error);
		        res.json({yo: 'error'});
		    }else{
		        console.log('Message sent: ' + info.response);
		        res.json({yo: info.response});
		    };
		});

	}

};