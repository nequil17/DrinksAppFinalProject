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
.run( function($rootScope){
    $rootScope.drinks=[]
    console.log(addb)
    addb.init({
        appId: 14561
    });
})

DrinkApp.controller('DrinksListController', function($http, $scope, $routeParams, $location, $rootScope){
addb.drinks().loadSet(function(query) { });
addb.drinks('eg').skip(0).take(25).loadSet(function(query) { 
    $scope.drinks = query.result
    console.log($scope.drinks)
    
});
}) 