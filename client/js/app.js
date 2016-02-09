'use strict';

angular.module('webhookApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('/', {
                url:'/',
                views: {
                    
                    'content': {
                        templateUrl : '/views/content.html',
                        controller  : 'IndexController'
                    }
                }

            })

//        $urlRouterProvider.otherwise('/licence');
    })
;
