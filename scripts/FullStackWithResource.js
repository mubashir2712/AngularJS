var app = angular.module('myApp',['ngResource','ngRoute']).
    config(function($routeProvider,$locationProvider,$httpProvider){
    $routeProvider
          .when('access_token= :accessToken', {
             templateUrl : 'templates/Profile.html',
             /*controller  : function ($location,$rootScope) {
                 console.log("Post")
                  var hash = $location.path().substr(1)
                  
                  var splitted = hash.split('&')
                  var params = {}
        
                  for (var i = 0; i < splitted.length; i++) {
                    var param  = splitted[i].split('=')
                    var key    = param[0]
                    var value  = param[1]
                    params[key] = value
                    $rootScope.accesstoken=params
                  }
                  $location.path("/Post")
                }*/
              })
        .when("/login",{
            templateUrl: "templates/login.html",
            controller : "myController"
        })
        .when("/Profile",{
            templateUrl: "templates/Profile.html",
            controller : "ProfileController"
        })
        .when("/Register",{
            templateUrl: "templates/Register.html",
            controller : "RegisterController"
        })
        .when("/Post",{
            templateUrl: "templates/Post.html",
            controller : "PostController"
        })
        .otherwise({
            redirect: "templates/Register.html"
            //redirect: '/FullStack.html'
        });
        $locationProvider.html5Mode()
        $httpProvider.defaults.headers.common = {}
        $httpProvider.defaults.headers.post = {
           'Content-Type': "Application/json;charset=utf-8;Authorization"
        }
        $httpProvider.defaults.headers.put = {
            'Content-Type': "Application/json;charset=utf-8;Authorization"
        }
        $httpProvider.defaults.headers.patch = {}
        /*.when("/updatePage",{
              templateUrl: "templates/updatePage.html",
              controller : "UpdateController"
        })*/
    })
        app.service('customService',function(){
            //var myService = {}
            var obj = {}
                this.metcustomService = function(){
                  console.log("in getter" + this.obj)  
                  return this.obj
                }
                this.letcustomService = function(value){
                    console.log("in set function")
                    //console.log(myService.obj)
                    this.obj = value
                    console.log("value" + value)
                    console.log("this.obj" + this.obj)
                    //myService.obj = value
                }
        })


        app.factory('service',function($resource){
            return $resource("http://localhost:8081/dashboard/:user",{user : "@user"})
        })
        app.factory('getProfileService',function($resource){
            return $resource("http://localhost:8081/dashboard/peers")
        })
        app.factory('RegisterService',function($resource){
            /*var data = $resource("http://localhost:8081/dashboard/add/:user",{user : "@user"},{
                save:{
                    //method:'POST',
                    headers : {
            //            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  'http://127.0.0.1:5500',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                    }
                    }
                })
                return data;*/
            return $resource("http://localhost:8081/dashboard/add/:user",{user : "@user"})
        })
        app.factory('commentService',function($resource){
            return $resource("http://localhost:8081/dashboard/messages/:msgId/comments",{msgId : "@msgId"})
        })

        app.factory('messageService',function($resource){
            /*var data = $resource("http://localhost:8081/dashboard/messages/:msgId",{msgId : "@msgId"},{
      'get':    {method:'GET', isArray:true},
      'save':   {method:'POST', isArray:true},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'} ,
      
      })
            
            return data*/
            return $resource("http://localhost:8081/dashboard/messages/:msgId",{msgId : "@msgId"})
        })
       app.factory('messagePostService',function($resource){
        return $resource("http://localhost:8081/dashboard/messages/add/:msgId",{msgId : "@msgId"})
       })

       app.factory('updateLikeService', function ($resource) {
            var data = $resource('http://localhost:8081/dashboard/messages/update/:msgId', {msgId : '@msgId'}, {
            update:{
                method:'PUT',
                headers : {
                'Access-Control-Allow-Origin':  'http://127.0.0.1:5500',
                'Access-Control-Allow-Methods': 'PUT'
                }
                }
            });
            return data;
        })

        app.factory('UserService', function ($resource) {
            var data = $resource('http://localhost:8081/dashboard/update/:user', {user : '@user'}, {
            update:{
                method:'PUT',
                headers : {
                    'Access-Control-Allow-Origin':  'http://127.0.0.1:5500',
                    'Access-Control-Allow-Methods': 'PUT'
                    }
                }
            });
            return data;
        })

        app.factory('AddFriendService', function ($resource) {
            var data = $resource('http://localhost:8081/dashboard/addFriend/:user', {user : '@user'}, {
            update:{
                method:'PUT',
                headers : {
                    'Access-Control-Allow-Origin':  'http://127.0.0.1:5500',
                    'Access-Control-Allow-Methods': 'PUT'
                    }
                }
            });
            return data;
        })

        app.controller("myController",function($scope,$location,service,customService){
            //$rootscope.usr = $scope.UserName
            $scope.flag = false
            $scope.flagLogin = true
            $scope.dropDownFlag = true
            $scope.user = $scope.UserName
            $scope.pressed = function(){
                $scope.flag = true
            }

            $scope.LogIn = function(id){
                if(id === "in"){
                $scope.flagLogin = false
                
                var client_id="379181146447-spgqftqktvn36ffl044lvq19r956vdt7.apps.googleusercontent.com";
      	        var scope="email";
      	        var redirect_uri="http://localhost:5500/AngularJS/templates/Post.html";
      	        var response_type="token";
      	        var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
     	        "&response_type="+response_type;
                window.location.replace(url);
                console.log(response_type)
                //$location.path("login")
                }
                else{
                $scope.flagLogin = true
                $location.path("/")    
                }
                
                console.log("currently id is = " +id + "and flag is = "+ $scope.flagLogin)
            }
            var dropDownFlag = true  
            $scope.submit = function($event){
            dropDownFlag = false
            console.log("hello" + $scope.UserName)
            customService.letcustomService($scope.UserName)    
            console.log("hello" + $scope.UserName)
            //$rootScope.ProfileName = $scope.UserName
            // $event.preventDefault();
            var even
            if(angular.isUndefined($scope.UserName)){
                $scope.message  = null
                $scope.password = null
            }
            else{
            var user = service.get({user : $scope.UserName}).$promise.then(function success(success){
                console.log("Hi " + success.$resolved)
                even = success.$resolved
                console.log(success.profileName)
                console.log(success.firstName)
                console.log(success.phoneNo)
                console.log(success.emailId)
                window.ProfileName = success.profileName
                console.log(window.ProfileName)
                var user1 = success.firstName
                var pass  = success.password
                console.log(success)
                if(!angular.isUndefined(user1)){
                    if(!angular.isUndefined($scope.password)){
                    if(pass == $scope.password){
                        $scope.user = user1 
                        $scope.message = null
                        //window.ProfileName = success.profileName
                        $scope.firstName = success.firstName
                        $scope.phoneNo = success.phoneNo
                        $scope.emailId = success.emailId
                        $scope.flag = true
                        console.log("dropDownFlag " + $scope.dropDownFlag)
                        $location.path("Post")
                      //window.location = 'Profile.html'
                    }
                    else{
                        $scope.message = "Please enter the correct password"
                        $scope.user = null
                        console.log(customService.metcustomService())
                    }
                   }
                else{
                    $scope.message = null
                    $scope.user = null
                }
            }
            else{
                    if(!angular.isUndefined($scope.password)){
                    $scope.message = "You are not registered user" 
                    $scope.user = null
                    }
            }

            })
            //console.log(even)
            if(angular.isUndefined(even)){
                //$event.preventDefault();
            }
            }
            }
        })

        app.controller("ProfileController",function($scope,service,UserService,customService,$location){
            $scope.flag = true
            //console.log($rootScope.ProfileName)
            //customService.letcustomService("chu")
            
            var profileName = customService.metcustomService()
            //$scope.profileName = $rootscope.usr
            console.log(profileName)
            service.get({user : profileName}).$promise.then(function (success){
            $scope.ProfileName = success.profileName
            $scope.firstName = success.firstName
            $scope.phoneNo = success.phoneNo
            $scope.emailId = success.emailId
           })
           $scope.pressed = function(){
            
            $scope.ProfileName1 = $scope.ProfileName
            $scope.firstName1 = $scope.firstName
            $scope.phoneNo1 = $scope.phoneNo
            $scope.emailId1 = $scope.emailId
            $scope.flag = false

            $scope.ProfileName = ""
            $scope.firstName = ""
            $scope.phoneNo = ""
            $scope.emailId = ""
        }

        $scope.pressed1 = function(){
            console.log($scope.ProfileName1)
            UserService.update({user : $scope.ProfileName1},{"profileName" : $scope.profileName1,"firstName" : $scope.firstName1,
                "phoneNo" : $scope.phoneNo1, "emailId" : $scope.emailId1, "password" : $scope.pass1})
                console.log($scope.ProfileName1)
                $scope.message = "Updated successfully"

        }

        $scope.names = ["Profile","logOut","Post"]
            $scope.change =function(){
            console.log($scope.selectedName)
            $location.path($scope.selectedName)
            }
        })

        app.controller("RegisterController",function($scope,service,customService,RegisterService){
            $scope.dropDownFlag = true
            $scope.pressed = function(){
                var user = $scope.profileName
                if($scope.pass1 != $scope.pass2){
                    $scope.message1 = "password didn't match"
                }
                if($scope.email.includes("@") && $scope.email.includes(".com")){
                    if($scope.email.indexOf("@") > 0 && $scope.email.indexOf(".") > $scope.email.indexOf("@") + 1){
                        service.get({user : $scope.profileName}).$promise.then(function success(success){
                            console.log("user = "+user)
                            console.log(success)
                            console.log(success.firstName)
                            //console.log(angular.isUndefined("sachin"))
                            if(!angular.isUndefined(success.firstName)){
                              $scope.message1 = "user is already registered"
                            }
                            else{   
                             RegisterService.save({"profileName" : $scope.profileName,"firstName" : $scope.userId,
                                 "phoneNo" : $scope.mobile, "emailId" : $scope.email, "password" : $scope.pass1})  
                             $scope.message1 = "registered successfully"
                             $scope.RegisterForm.$setPristine()
                            }
                     })
                    }
                    else{
                        $scope.message1 = "please enter the correct email Id"
                    }
                }
                else{
                    $scope.message1 = "please enter the correct email Id"
                }
                $scope.flag = false
            }
        })

        app.controller("UpdateController",function($scope,UserService,customService){
            $scope.dropDownFlag = false
            console.log($scope.profileName)
            service.get({user : $scope.profileName}).$promise.then(function success(success){
                   $scope.profileName = success.profileName
                   $scope.userId = success.firstName
                   $scope.email  = success.emailId
                   $scope.mobile = success.phoneNo
            })

            $scope.pressed = function(){
                UserService.update({"profileName" : $scope.profileName,"firstName" : $scope.userId,
                "phoneNo" : $scope.mobile, "emailId" : $scope.email, "password" : $scope.pass1})
                $scope.message = "Updated successfully"
                }
        })

        app.controller("PostController",function($scope,messageService,commentService,service,
            customService,updateLikeService,messagePostService,getProfileService,$location,
            AddFriendService){
            
            $scope.user = customService.metcustomService()
            console.log("scope = " + $scope.user)
            service.get({user : $scope.user}).$promise.then(function success(success){
              $scope.friendList = success.profiles
              console.log($scope.friendList)
            })
            
            const profiles = getProfileService.query()
            var result = messageService.query()
            /*.$promise.then(function success(success){
                console.log(result["message"])
                for(res in result["message"]){
                console.log(res)
            }
            })*/
            profiles.$promise.then(function(){
                $scope.profiles = profiles
            })
            result.$promise.then(function(){
                $scope.result = result
                console.log($scope.result)
                var res
                for(res in $scope.result){
                    console.log("author " + res["author"])
                    console.log("Message " + res["message"])
                    //$scope.message = res["message"]
                    //$scope.author = res["author"]
                }
            })
            console.log(result)
            $scope.submit = function(){   
            var currentDate = new Date()
            console.log("message " + $scope.user)
            var ans = messagePostService.save({"author" : $scope.user, "message" : $scope.messages, "created" : currentDate,
                                 "likes" : 0, "dislikes" : 0})
            console.log(ans)
            $scope.messages = ""
            $scope.messageResponse = "message posted successfully"
            }

            $scope.commented = function(comment){   
            var currentDate = new Date()
            console.log("comm " + $scope.user)
            commentService.save({msgId : $scope.id},{"author" : $scope.user, "message" : comment, "created" : currentDate})
            $scope.commentResponse = "comment posted successfully"
            }

            $scope.setMessageId = function(id,comment){
            $scope.id = id
            console.log($scope.id)
            var currentDate = new Date()
            console.log("comm " + $scope.user)
            commentService.save({msgId : $scope.id},{"author" : $scope.user, "message" : comment, "created" : currentDate})
            //$scope.myForm.$setPristine();
            $scope.commentResponse = "comment posted successfully"
            }

            $scope.increamentLikes = function(result){
                messageService.get({msgId : result.id}).$promise.then(function success(success){              
                result.likes = success.likes + 1
                console.log(result.likes)
                updateLikeService.update({msgId : result.id},{"author" : success.author,
                 "message" : success.message, "created" : success.created,"likes" : result.likes,
                 "comments": success.comments,"dislikes" : success.dislikes})
                })
            }

            $scope.increamentDisLikes = function(result){
                messageService.get({msgId : result.id}).$promise.then(function success(success){              
                result.dislikes = success.dislikes + 1
                console.log(result.dislikes)
                updateLikeService.update({msgId : result.id},{"author" : success.author,
                 "message" : success.message, "created" : success.created,"likes" : success.likes,
                 "comments": success.comments,"dislikes" : result.dislikes})
                })
            }

            $scope.AddFriend = function(profileId){
                service.get({user : $scope.user}).$promise.then(function success(success){              
                    console.log(success)
                    AddFriendService.update({user : profileId},{"profileName" : success.profileName,
                    "firstName" : success.firstName, "emailId" : success.emailId, "password" : success.password})
                    $scope.profileMessage = "Friend Request Sent"
                    })
            }

            $scope.names = ["Profile","logOut","Post"]
            $scope.change =function(){
            console.log($scope.selectedName)
            $location.path($scope.selectedName)
            }
        })