'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('webhookApp')
	
	.service('actionService', ['$http', function($http) {

		var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };

	 	this.setData = function(data){

	 		console.log('reached service');

	 		return $http.post('/api/licence', data, config);
	 		
	 	};

	 }])

	;
