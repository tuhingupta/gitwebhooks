'use strict';

/* Controllers */

angular.module('webhookApp')

        .controller('IndexController', ['$scope','actionService', function($scope, actionService) {
            
            
            var d = new Date();
            var n = d.toISOString();
            $scope.todaydate = n;
            $scope.selected = "";
            var accepts = [];
            $scope.showConfirmation = false;
            

            $scope.submitLicence = function(){

                console.log($scope.licence.name);
                console.log($scope.licence.loginid);
                console.log($scope.selected);
                var d = {name:$scope.licence.name, loginid:$scope.licence.loginid, selection:$scope.selected, date:(new Date()).toISOString()};
                console.log(d);

                actionService.setData(d)
                  .then(
                            function(response) {
                                console.log(response.data);
                                $scope.responseData = "Thanks for your response.";
                                $scope.showConfirmation = true;
                            },
                            function(response) {
                                console.log(response.data);
                                $scope.responseData = "There was some error. Please try again later.";
                                $scope.showConfirmation = true;
                            }

                        );

                //console.log("******"+$scope.responseData);


            };

            $scope.setSelection = function(section) {
                $scope.selected = section;

            };



          }])
  ;