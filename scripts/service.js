var app = angular.module("myApp",[]).controller("myController",function($scope,customService){
    $scope.processString = function(input){
           $scope.output = customService.resolve(input)
    }
})