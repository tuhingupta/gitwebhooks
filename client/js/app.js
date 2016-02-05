'use strict';

angular.module('webhookApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/index.html',
                    },
                    'content': {
                        templateUrl : '/views/content.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/index.html',
                    }
                }

            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'IndexController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
