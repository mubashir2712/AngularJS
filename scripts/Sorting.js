angular.module("myApp",[]).controller("myController",function($scope){
      var employees = [
       {name : "Sachin",dob : new Date("November 27,1990"),gender : "male",Salary : 5000},
       {name : "Rahul",dob : new Date("Jan 27,1990"),gender : "male",Salary : 10000},
       {name : "Sourav",dob : new Date("August 27,1990"),gender : "male",Salary : 12000},
       {name : "Virat",dob : new Date("September 27,1995"),gender : "male",Salary : 15000},
      ]
      $scope.employees = employees
      $scope.property = "+Salary"

      $scope.sortData = function(column){
         $scope.property = column
      }
})