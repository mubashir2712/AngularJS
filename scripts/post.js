var app = angular.module("myApp",[])

app.factory('service',function($resource){
    return $resource("http://localhost:8081/messenger/webapi/messages/:message",{message : "@message"})
})


app.controller("PostController",function($scope,service){
 $scope.message = ""
 $resource.save()

})
