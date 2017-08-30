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
            .when("/searchresult", {
                templateUrl: "./views/searchresult.html"
            })
    })
    .run(function ($rootScope) {
        addb.init({
            appId: 14561
        });
        $rootScope.$apply.searchresults = []
    })
DrinkApp.controller("HomeController", ['$rootScope', function ($rootScope) {
}]);

DrinkApp.controller("userController", ['$rootScope', function ($rootScope) {
}]);
DrinkApp.controller("loginController", ['$rootScope', function ($rootScope) {

}]);


DrinkApp.controller('DrinksListController', function ($http, $scope, $routeParams, $location, $rootScope) {
    var skip = 0
    var take = 10
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
    console.log('in search controller')
    $scope.locate = function () {
        console.log('search working')
        var input = document.getElementById('usersearch').value
        console.log(input)
        addb.drinks().tasting(input).loadSet(function (query) {
            $scope.$apply(function () {
                if (query.result.length != 0) {
                    $rootScope.$apply.searchresults.push(query.result)
                }
            });
        });
        addb.drinks().withIngredient(input).loadSet(function (query) {
            $scope.$apply(function () {
                if (query.result.length != 0) {
                    $rootScope.$apply.searchresults.push(query.result)
                }
            });
        })
        addb.drinks().load(input, function (shake) {
            $scope.$apply(function () {
                if (shake.result.length != 0) {
                    $rootScope.$apply.searchresults.push(shake.result)
                }
            });
        })
        if ($rootScope.$apply.searchresults = []) {
            alert('Your search ' + '"' + input + '"' + ' returned no results! Please check your spelling and try again.')
        }


        // addb.drinks().typeIngredient(input).loadSet(function(query) {
        //     $scope.$apply(function () {
        //         $scope.ingredient = query.result;
        //         console.log($scope.ingredient)
        //         if(query.result.length != 0){
        //             $rootScope.$apply.searchresults.push(query.result)
        //         }


        //     });
        // })

        $location.path('/searchresult/' + input)
        console.log($rootScope.$apply.searchresults)

    }

})
addtofavorites = function () {

}