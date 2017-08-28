var DrinkApp = angular.module("DrinkApp", ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "./views/home.html"
        })
        .when("/main", {
            templateUrl: "./views/main.html"
        })
        .when("/profile", {
            templateUrl: "./views/user.html"
        })
        .when("/achievements", {
            templateUrl: "./views/achievements.html"
        })
        // .when("/invoice", {
        //     templateUrl: "./views/invoice.html"
        // })
        // .when("/one/:id", {
        //     templateUrl: "./views/single.html"
        // });
})