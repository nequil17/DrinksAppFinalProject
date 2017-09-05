var Cont= angular.module("controllers")
Cont.controller("HomeController", ['$rootScope', function ($rootScope, $scope, $location) {
    $rootScope.navbar = true;
    goToLogin = function(){
     window.location= 'http://localhost:8080/#/login'
    }
}]);

Cont.controller("userController", ['$rootScope', function ($rootScope) {
    $rootScope.navbar = false;
    
}]);
Cont.controller("loginController", ['$rootScope', function ($rootScope) {
    $rootScope.navbar = false;
    
}]);


Cont.controller('DrinksListController', function ($http, $scope, $routeParams, $location, $rootScope, addbService) {
    $rootScope.navbar = false;
    $rootScope.loading = true;

    var queries = $location.search(),
        initialPage;

    if (!queries.page  || queries.page == 1) {
        initialPage = 1;
        $scope.hasPrevious = false;
    } else {
        initialPage = queries.page;
        $scope.hasPrevious = true;
    }

    addbService.getPage(Number(queries.page))
    .then(function(response) {
        $scope.response = response;
        $rootScope.loading=false;        
        $scope.$apply();
    });

    $scope.nextpage = function() {
        $location.search('page', ++initialPage);
    }

    $scope.prevpage = function () {
        $location.search('page', --initialPage);
    }
})
Cont.controller('SingleDrinkController', function ($http, $scope, $routeParams, $location, $rootScope, addbService) {
    $rootScope.navbar = false;
    
    addbService.getDrink($routeParams.id).then(function(result){
        $scope.singledrink=result;
        $rootScope.loading=false;
        $scope.$apply();
        console.log(result)
    })
})

Cont.controller('SearchController', function ($http, $scope, $routeParams, $location, $route, $rootScope,addbService) {
    console.log('im in here');
    console.log($routeParams.query)
    $rootScope.navbar = false;
    $rootScope.loading=true
 
//    addbService.getDrinks({ searchQuery: $routeParams.query, all: true  }).then(function(result){
//     $scope.drinks=result;
//     $rootScope.loading=false;
//     $scope.$apply();
//     console.log(result)
    var queries = $location.search(),
    initialPage;

    if (!queries.page  || queries.page == 1) {
        initialPage = 1;
        $scope.hasPrevious = false;
    } else {
        initialPage = queries.page;
        $scope.hasPrevious = true;
    }

    console.log('initial page', initialPage);

    addbService.getPage(Number(initialPage), $routeParams.query)
    .then(function(response) {
        $scope.response= response;
        $rootScope.loading=false;        
        $scope.$apply();
    });

    $scope.nextpage = function() {
        $location.search('page', ++initialPage);
    }

    $scope.prevpage = function () {
        $location.path('/searchresults' + $routeParams.query).search('page', --initialPage);
    }

    $scope.locate= function(){
        var input = document.getElementById('usersearch').value
        $location.path('/searchresult/' + input)
    }
});

Cont.controller('RandomController', function ($http, $scope, $routeParams, $location, $rootScope, addbService) {
    $rootScope.navbar = false;
    addbService.getRandom().then(function(result){
        console.log('randomcont', result)
        $scope.randomdrink= result
        $scope.$apply()
        
    })
})
Cont.controller('navController', function( $location, $scope){
    $scope.locate= function(){
        var input = document.getElementById('usersearch').value
        input.value=''
        $location.path('/searchresult/' + input).search('page', 1);
    }
})


// Cont.controller('AchievementController', function ($http, $scope, $routeParams, $location, $rootScope) {
//     $rootScope.navbar = false;
    
// $scope.insertdata = function () {
//     $http.post("http://localhost:8080/api/Achievements", { 'user': $scope.user, 'message': $scope.message })
//         .success(function (data, status, headers, config) {
//             $scope.user = ''
//             $scope.message = ''
//             $route.reload();
//         });
//     $http.get("http://localhost:8080/api/Achievements")
//         .then(function (response) {
//             $scope.allChirps = response.data;
//         })
// }
// })



