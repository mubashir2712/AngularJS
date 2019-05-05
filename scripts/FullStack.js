var app = angular.module("myApp",[])

app.factory("myService",function($http){
    var obj = {}
    var message = ""
    obj.callWebService = function(){
      console.log("I have been pressed")
     // var pressed = $http.get("http://localhost:8081/messenger/webapi/profiles:user",{user : "@user"})
     var pressed = $http.get("http://localhost:8081/messenger/webapi/profiles/Babu")
      //then(function success(response){
        //   message = response.data
        //  }).
      //then(function failure(reponse){
        //   message = response
      //})
      return pressed
    }
    return obj
})

app.controller("myController",function($scope,myService){
    var message = "Hello"
    var firstName
    var lastName
    var profileName
    $scope.pressed = function(){
      message = myService.callWebService()
      //var obj = JSON.stringify(message)
      message.then(function success(response){
        console.log("Hi")
        firstName = response.data
        console.log(firstName)
          console.log(firstName.firstName)
        //firstName = response.data[x].firstName
        //lastName = response.data[x].lastName
        //profileName = response.data[x].profileName
        
      })
      
      //console.log(obj)
      //console.log(message["firstName"])
      //firstName = message.firstName
      //lastName = message.lastName
      //profileName = message.profileName
      //$scope.message = message
      //console.log(firstName)
    $scope.firstName = firstName
    $scope.lastName = lastName
    $scope.profileName = profileName
    }
})