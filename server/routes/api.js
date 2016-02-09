'use strict';

var services = require('../services/services');

var router  = require('express').Router();

module.exports = function () {

	router.route('/licence').get(services.getInfoJSON);
	router.route('/licence').post(services.addLicence);
	router.route('/webhooks').post(services.webhooks);
	
	
return router;

};
