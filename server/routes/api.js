'use strict';

var services = require('../services/services')

var router  = require('express').Router();

module.exports = function () {

	router.route('/name').get(services.getInfoJSON);
	router.route('/name').post(services.addName);
	router.route('/webhooks').post(services.webhooks);
	
	
return router;

};
