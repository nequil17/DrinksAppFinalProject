var DrinkApp = angular.module("DrinkApp", ['ngRoute'])
    .config(function ($sceProvider) {
        $sceProvider.enabled(false);
    })
    .config(function ($routeProvider, ) {
        $routeProvider
            .when("/", {
                templateUrl: "./views/home.html"
                
            })
            .when("/login", {
                templateUrl: "./views/login.html"
            })
            .when("/user", {
                templateUrl: "./views/user.html"
            })
            .when("/achievements", {
                templateUrl: "./views/achievements.html"
            })
            .when("/drink/:id", {
                templateUrl: "./views/singledrink.html"
            })
            .when("/drinks", {
                templateUrl: "./views/drinks.html"
            })
            .when("/searchresult/:query", {
                templateUrl: "./views/searchresult.html"
            })
            .when("/random", {
                templateUrl: './views/random.html'
            })
    })
    .run(function ($rootScope) {
        addb.init({
            appId: 14561
        });
        $rootScope.$apply.searchresults = []
        $rootScope.$apply.achievements= []
        $rootScope.$apply.randomdrink=[]
        
    })
DrinkApp.controller("HomeController", ['$rootScope', function ($rootScope) {
    $rootScope.navbar = true;
}]);

DrinkApp.controller("userController", ['$rootScope', function ($rootScope) {
    $rootScope.navbar = false;
    
}]);
DrinkApp.controller("loginController", ['$rootScope', function ($rootScope) {
    $rootScope.navbar = false;
    
}]);


DrinkApp.controller('DrinksListController', function ($http, $scope, $routeParams, $location, $rootScope) {
    $rootScope.navbar = false;
    
    var skip = 0
    var take = 50
    addb.drinks('eg').skip(skip).take(take).loadSet(function (query) {
        $scope.$apply(function () {
            $scope.drinks = query.result;
            console.log(query.result)
        });
    });
    $scope.getId = function (id) {
        $location.path('/drink/' + id)
    }
    $scope.nextpage = function () {
        skip += 10
        take += 10
        addb.drinks('eg').skip(skip).take(take).loadSet(function (query) {
            $scope.$apply(function () {
                $scope.drinks = query.result;
                console.log(query.result)
            });
            window.scrollTo(0, 0);
        })
    }
    $scope.prevpage = function () {
        if (skip >= 10) {
            skip -= 10
            take -= 10
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
DrinkApp.controller('SingleDrinkController', function ($http, $scope, $routeParams, $location, $rootScope) {
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
        console.log(video(single.videos[0].video))
    }
})

DrinkApp.controller('SearchController', function ($http, $scope, $routeParams, $location, $rootScope) {
    $rootScope.navbar = false;
    
    console.log($location.$$url)
    $scope.loader = true;
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
                       $scope.loader = false;
                       $rootScope.searchresults= filtered
                       console.log($rootScope.searchresults)
                    });
        })
        
    }
    
    $scope.locate = function () {
         $scope.loader = true;
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
                       $scope.loader = false;
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
DrinkApp.controller('RandomController', function ($http, $scope, $routeParams, $location, $rootScope) {
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
})