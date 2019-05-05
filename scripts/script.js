/// < reference path = "angular.min.js"/>
angular.module('myApp',[]).
        controller("myController",function($scope){
            $scope.message = "Angular"

            employee = {
                  firstName : "Amir",
                  lastName  : "Khan",
                  gender : "Male"
            }
            $scope.employee = employee
        })