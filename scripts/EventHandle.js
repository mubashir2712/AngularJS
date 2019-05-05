angular.module("myApp",[]).controller("myController",function($scope){
     var Technologies = [
         {name : "ASP",like : 0,dislike :0},
         {name : "Java",like : 0,dislike :0},
         {name : "Angular",like : 0,dislike :0},
         {name : "React",like : 0,dislike :0},
     ]

     $scope.technologies = Technologies
     $scope.like = function(technology){
           technology.like++;
     }
     $scope.Dislike = function(technology){
          technology.dislike++;
     }
})