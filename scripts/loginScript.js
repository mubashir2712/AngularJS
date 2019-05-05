var app = angular.module('myApp',['ngRoute']).config(function($routeProvider){
            $routeProvider
                .when("/login",{
                      templateUrl:"templates/login.html",
                      controller : "myController"
                })
                .when("/Register",{
                    templateUrl: "templates/Register.html",
                    controller : "RegisterController"
                })
        })
        app.controller("myController",function($scope){
          $scope.message = "Hello"
        })
        app.controller("RegisterController",function($scope){
            $scope.message = "Hi"
        })

        