var Cont= angular.module("controllers")
Cont.controller("HomeController", ['$rootScope', function ($rootScope, $scope, $location) {
    $rootScope.navbar = true;
    goToLogin = function(){
        console.log('sldkfjdslj')
     window.location= 'http://localhost:8080/#/login'
    }
}]);

Cont.controller("userController", ['$rootScope', function ($rootScope) {
    $rootScope.navbar = false;
    
}]);
Cont.controller("loginController", ['$rootScope', function ($rootScope) {
    $rootScope.navbar = false;
    
}]);


Cont.controller('DrinksListController', function ($http, $scope, $routeParams, $location, $rootScope) {
    $rootScope.navbar = false;
    $rootScope.loading=true
    console.log('hi')
    var skip = 0
    var take = 12
    addb.drinks('eg').skip(skip).take(take).loadSet(function (query) {
        $scope.$apply(function () {
            $scope.drinks = query.result;
            console.log(query.result)
            $rootScope.loading=false
        });
       
        
    });
    $scope.getId = function (id) {
        $location.path('/drink/' + id)
    }
    $scope.nextpage = function () {
        skip += 12
        // take += 12
        console.log(skip, take)
        addb.drinks('eg').skip(skip).take(take).loadSet(function (query) {
            $scope.$apply(function () {
                $scope.drinks = query.result;
                console.log(query.result)
            });
            window.scrollTo(0, 0);
        })
    }
    $scope.prevpage = function () {
        if (skip >= 12) {
            skip -= 12
            // take -= 12
            addb.drinks('eg').skip(skip).take(take).loadSet(function (query) {
                $scope.$apply(function () {
                    $scope.drinks = query.result;
                    console.log(query.result)
                });
                window.scrollTo(0, 0);
            })
        }
    }
})
Cont.controller('SingleDrinkController', function ($http, $scope, $routeParams, $location, $rootScope) {
    $rootScope.navbar = false;
    
    var id = $routeParams.id
    console.log($routeParams)
    console.log(id)
    addb.drinks().load(id, function (shake) {
        $scope.$apply(function () {
            $scope.singledrink = shake.result[0];
            console.log($scope.singledrink)
        });
    });
    $scope.video = function (video) {
        return 'http://www.youtube.com/embed/' + video
        // console.log(video(single.videos[0].video))
    }
})

Cont.controller('SearchController', function ($http, $scope, $routeParams, $location, $rootScope) {
    $rootScope.navbar = false;
    $rootScope.loading=true
    console.log($location.$$url)
   
    var relquery=$location.$$url
        console.log(relquery)
     var el=document.getElementById('spinner')
     var test=relquery.slice(14)
     
     var midrelquery= test.replace("%20", "-")
     console.log(test, midrelquery, fixedquery)
     var fixedquery= test.charAt(0).toUpperCase() + test.slice(1)
    var filtered = [];
    if($location.$$absUrl== ("http://localhost:8080/#/searchresult/"+ test)){
        console.log('if working')
        addb.drinks('eg').skip(0).take(1024).loadSet(function (query) {
            
            $scope.$apply(function () {
                       var results = query.result;
                       results.forEach((r) => {
                        r.ingredients.forEach((i) => {
                            if (i.id === midrelquery) {
                                filtered.push(r);
                            }
                        });
                   });
                   results.forEach((r) => {
                                r.ingredients.forEach((i) => {
                                    if (i.type === fixedquery) {
                                        filtered.push(r);
                                        console.log(i.type)
                                    }
                                });
                           });
                       results.forEach((r) => {
                              
                                if (r.name == fixedquery) {
                                    filtered.push(r);
                                }
                       });
                       $rootScope.loading=false
                       $rootScope.searchresults= filtered
                       console.log($rootScope.searchresults)
                    });
        })
        
    }
    
    $scope.locate = function () {
        $rootScope.loading=true
        var relquery=$location.$$url
            console.log(relquery)
         var el=document.getElementById('spinner')
         var midrelquery= relquery.replace("%20", "-")
         var test=midrelquery.slice(14)
         
         var fixedquery= test.charAt(0).toUpperCase() + test.slice(1)
        var filtered = [];
        var input = document.getElementById('usersearch').value
        var midinput = input.replace(" ", "-")
        
       var fixedinput= midinput.charAt(0).toUpperCase() + midinput.slice(1)
       
        console.log(fixedinput)
        addb.drinks('eg').skip(0).take(1024).loadSet(function (query) {
            console.log(query)
            $scope.$apply(function () {
                       var results = query.result;
                       results.forEach((r) => {
                        r.ingredients.forEach((i) => {
                            if (i.id === midinput) {
                                filtered.push(r);
                            }
                        });
                   });
                   results.forEach((r) => {
                                r.ingredients.forEach((i) => {
                                    if (i.type === fixedinput) {
                                        filtered.push(r);
                                        console.log(i.type)
                                    }
                                });
                           });
                       results.forEach((r) => {
                              
                                if (r.name == fixedinput) {
                                    filtered.push(r);
                                }
                       });
                       $rootScope.loading=false
                       $rootScope.searchresults= filtered
                       console.log($rootScope.searchresults)
                    });
        })

$location.path('/searchresult/' + input)


    }
    $scope.getId = function (id) {
        $location.path('/drink/' + id)
    }
})
addtofavorites= function (){

}

clearinput =function(){
    var input = document.getElementById('usersearch').value
    console.log(input)
    input = ''; 
}
Cont.controller('RandomController', function ($http, $scope, $routeParams, $location, $rootScope) {
    $rootScope.navbar = false;
    
    console.log('in random')
    var random= []
    var number= Math.floor(Math.random() * 1024) + 1 
    
    // console.log(searchparam)
    addb.drinks('eg').skip(0).take(1024).loadSet(function (query) {
    $scope.$apply(function () {
        console.log(query.result)
        var results = query.result;
       
    // console.log(random)
    $rootScope.randomdrink= results[number]
})

console.log($rootScope.randomdrink)
    })
    $scope.video = function (video) {
        return 'http://www.youtube.com/embed/' + video
        // console.log(video(single.videos[0].video))
    }
})



Cont.controller('AchievementController', function ($http, $scope, $routeParams, $location, $rootScope) {
    $rootScope.navbar = false;
    
// $scope.insertdata = function () {
    $http.post("http://localhost:8080/api/Achievements", { 'user': $scope.user, 'message': $scope.message })
        .success(function (data, status, headers, config) {
            $scope.user = ''
            $scope.message = ''
            $route.reload();
        });
    $http.get("http://localhost:8080/api/Achievements")
        .then(function (response) {
            $scope.allChirps = response.data;
        })
// }
})



Cont.controller('NavController', function ($http, $scope, $routeParams, $location, $rootScope) {
$scope.clickrand= function(){
    var random= []
    var number= Math.floor(Math.random() * 1024) + 1 
    
    addb.drinks('eg').skip(0).take(1024).loadSet(function (query) {
    $scope.$apply(function () {
        var results = query.result;
       
    $rootScope.randomdrink= results[number]
})

    })
    $scope.video = function (video) {
        return 'http://www.youtube.com/embed/' + video
    }
}
})
       