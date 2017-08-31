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
    $scope.locate = function () {
         $scope.loader = true;
         
         var el=document.getElementById('spinner')
        var filtered = [];
        var input = document.getElementById('usersearch').value
        var midinput = input.replace(" ", "-")
       var fixedinput= midinput.charAt(0).toUpperCase() + midinput.slice(1)
        console.log(fixedinput)
        // addb.drinks().tasting(fixedinput).loadSet(function (query) {
        //     $scope.$apply(function () {
        //         if (query.result.length != 0) {
        //             // console.log(query.result)
        //             // var parse1= JSON.parse(query.result[0])
        //             filtered.push(query.result)
        //         }
        //     });
        // });
        // addb.drinks().withIngredient(fixedinput).loadSet(function (query) {
        //     $scope.$apply(function () {
        //         // $scope.ingredient = query.result;
        //         // console.log($scope.ingredient)
        //         if (query.result.length != 0) {
        //             // var parsed1= JSON.parse(query.result[0])
        //             // console.log(query.result)
        //             filtered.push(query.result)
        //         }
        //     });
        // })
        // addb.drinks().load(fixedinput, function (shake) {
        //     $scope.$apply(function () {
        //         if (shake.result.length != 0) {
        //             filtered.push(shake.result)
        //         }
        //     });
        // })
        addb.drinks('eg').skip(0).take(3000).loadSet(function (query) {
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
                    //    console.log(filtered);
                       $scope.loader = false;
                       $rootScope.$apply.searchresults= filtered
                       console.log($rootScope.$apply.searchresults)
                    });
        })
        // addb.drinks('eg').skip(0).take(30).loadSet(function (query) {
        //     $scope.$apply(function () {
        //         // var type = 'whisky';
                

        //        var results = query.result;

        //        results.forEach((r) => {
        //             // r.name.forEach((i) => {
        //                 console.log(r.name)
        //                 if (r.name == fixedinput) {
        //                     filtered.push(r);
        //                 }
        //             // });
        //        });
        //        console.log(filtered);
        //     });
        // })






        //  addb.drinks('eg').skip(0).take(300).loadSet(function (query) {
        //     $scope.$apply(function () {
        //         // var type = 'whisky';
                

        //        var results = query.result;

        //        results.forEach((r) => {
        //             r.ingredients.forEach((i) => {
        //                 if (i.type === fixedinput) {
        //                     filtered.push(r);
        //                     console.log(i.type)
        //                 }
        //             });
        //        });
        //        console.log(filtered);
        //     });
        // })

        // if (filtered = []) {
        //         alert('Your search '+ '"' +input+ '"' + ' returned no results! Please check your spelling and try again.')
        //     }
    

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


    }
   
})
addtofavorites= function (){

}

clearinput =function(){
    var input = document.getElementById('usersearch').value
    console.log(input)
    input = ''; 
}