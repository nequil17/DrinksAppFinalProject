var DrinkApp = angular.module("DrinkApp", ['ngRoute', 'controllers', 'services', 'ui', 'angular.filter'])
    .config(function ($sceProvider) {
        $sceProvider.enabled(false);
    })
    .config(function ($routeProvider, ) {
        $routeProvider
            .when("/", {
                templateUrl: "../views/home.html"
                
            })
            .when("/login", {
                templateUrl: "../views/login.html"
            })
            .when("/user", {
                templateUrl: "../views/user.html"
            })
            .when("/achievements", {
                templateUrl: "../views/achievements.html"
            })
            .when("/drink/:id", {
                templateUrl: "../views/singledrink.html"
            })
            .when("/drinks", {
                templateUrl: "../views/drinks.html",
                reloadOnSearch: true
            })
            .when("/searchresult/:query", {
                templateUrl: "../views/searchresult.html",
                controller: 'SearchController',
                reloadOnSearch: true
            })
            .when("/random", {
                templateUrl: '../views/random.html'
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
    angular.module('services', [])
    angular.module("controllers", [])
   
