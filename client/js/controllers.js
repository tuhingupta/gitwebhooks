'use strict';

/* Controllers */

angular.module('webhookApp')

        .controller('IndexController', ['$scope', function($scope) {
            
            $scope.name = "tuhin";
            var d = new Date();
            var n = d.toISOString();
            $scope.todaydate = n;
          }])
  ;