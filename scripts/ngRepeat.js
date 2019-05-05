angular.module("myApp",[]).
controller("myController",function($scope){
  var employees = [
   {firstName : "Amir" ,lastName :"Khan", gender : "male"},                
   {firstName : "Salman" ,lastName :"Khan", gender : "male"},
   {firstName : "Priyanka" ,lastName :"Chopra", gender : "Female"},
  ]

  var countries = [
      {
       name : "UK",
       cities : [
                { name : "London"},   
                { name : "Manchester"}, 
       ]
      }, 
      {
        name : "India",
        cities : [
                 { name : "Delhi"},   
                 { name : "Mumbai"}, 
        ]
       },
       {
        name : "USA",
        cities : [
                 { name : "Washington"},   
                 { name : "California"}, 
        ]
       },
  ]
    
$scope.countries = countries
$scope.employees = employees
})