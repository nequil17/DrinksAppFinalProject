var DrinkApp = angular.module("DrinkApp", ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "./views/login.html"
            })
            .when("/home", {
                templateUrl: "./views/home.html"
            })
            .when("/main", {
                templateUrl: "./views/main.html"
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
            });
    })
    .run(function () {
        addb.init({
            appId: 14561
        });
    })

DrinkApp.controller('DrinksListController', function ($http, $scope, $routeParams, $location, $rootScope) {
    addb.drinks('eg').skip(0).take(25).loadSet(function (query) {
        $scope.$apply(function () {
            $scope.drinks = query.result;
            console.log(query.result)
        });
    });
    $scope.getId = function (id) {
        $location.path('/drink/' + id)
    }
})

DrinkApp.controller('SingleDrinkController', function ($http, $scope, $routeParams, $location, $rootScope) {
    var id = $routeParams.id
    console.log($routeParams)
    console.log(id)
    addb.drinks().load( id , function(shake) {
        $scope.$apply(function () {
            $scope.singledrink = shake.result[0];
            console.log($scope.singledrink)
        });
    });
})
DrinkApp.controller('SearchController', function ($http, $scope, $routeParams, $location, $rootScope) {
    var id = $routeParams.id

    addb.drinks().quickSearch('some query', function(query) {
        $scope.$apply(function () {
            $scope.search = query.result;
            console.log($scope.search)
        });
    });
})