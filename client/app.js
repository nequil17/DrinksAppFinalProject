// var next= next +=10
// var previous= previous -+10

var DrinkApp = angular.module("DrinkApp", ['ngRoute'])
.config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects or libraries.
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
            });
    })

    .run(function () {
        addb.init({
            appId: 14561
        });
    })

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
    var search = document.getElementById('search').value
    addb.drinks().quickSearch(search, function (query) {
        $scope.$apply(function () {
            $scope.search = query.result;
            console.log($scope.search)
        });
    });
})

// window.addEventListener('load', function() {
//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         if (this.files && this.files[0]) {
//             var img = document.querySelector('img');  // $('img')[0]
//             img.src = URL.createObjectURL(this.files[0]); // set src to file url
//             img.onload = imageIsLoaded; // optional onload event listener
//         }
//     });
//   });

//   function imageIsLoaded(e) { alert(e); } 
