var Cont= angular.module("controllers")
Cont.controller("HomeController", ['$rootScope', function ($rootScope, $scope, $location) {
    $rootScope.navbar = true;
    goToLogin = function(){
     window.location= 'http://localhost:3000/#/login'
    }
}]);

Cont.controller("userController", ['$rootScope','$http','$scope', function ($rootScope, $http, $scope) {
    $rootScope.navbar = false;
    $http.get("http://localhost:3000/api/achievements")
    .then(function (response) {
        $scope.achievements = response.data;

    })
}]);
Cont.controller("loginController", ['$rootScope', function ($rootScope) {
    $rootScope.navbar = true;
    
}]);

Cont.controller("AchievementController", ['$rootScope', '$http', '$scope', function ($rootScope, $http, $scope) {
    $rootScope.loading=true; 
    $rootScope.navbar = false;
    $http.get("http://localhost:3000/api/achievements")
    .then(function (response) {

        $scope.achievements = response.data;
        $scope.$apply();
        $rootScope.loading=false; 
    })
    
}]);



Cont.controller('DrinksListController', function ($http, $scope, $routeParams, $location, $rootScope, addbService) {
    $rootScope.loading=true; 
    $rootScope.navbar = false;
    

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
        console.log(response)
    });

    $scope.nextpage = function() {
        $location.search('page', ++initialPage);
    }

    $scope.prevpage = function () {
        $location.search('page', --initialPage);
    }
    $scope.getDrink= function(id){
        $location.path( '/drink/'+id)
    }
})
Cont.controller('SingleDrinkController', function ($http, $scope, $routeParams, $location, $rootScope, addbService, $sce) {
    $rootScope.navbar = false;
     $rootScope.loading = true;

     $scope.insertdata = function () {
         var isFav
            console.log('insert')
         var addFav =   confirm('Add this drink to your Favorites as well?')
        if (addFav==true) {
            isFav=true
            $http.post("http://localhost:3000/api/achievements", {'name': $scope.singledrink.name, 'id': $scope.singledrink.id , 'isFav': isFav})
            
            .success(function (data, status, headers, config) {
               console.log($scope.singledrink.id)
               alert($scope.singledrink.name + " was added to your collection! You've gained +1exp!")
            })
        } else {
            isFav=false
            $http.post("http://localhost:3000/api/achievements", {'name': $scope.singledrink.name, 'id': $scope.singledrink.id , 'isFav': isFav})
            
            .success(function (data, status, headers, config) {
               console.log($scope.singledrink.id)
               alert($scope.singledrink.name + 'was added to your collection!')
            })
        }
       
        }
     
    console.log($routeParams.id)
    addbService.getDrink($routeParams.id).then(function(result){
        $rootScope.loadingdata=true;

        if (result.videos) {
            result.videos.forEach(function(v) {
                if (v.type === 'youtube') {
                    result.iframeVideo = $sce.trustAsResourceUrl(formatVideoUrl(v.video));
                }
            });
        }

        $scope.singledrink=result;
        $rootScope.loading=false;
        
        $scope.$apply();
        console.log(result)
    });
    
    
    $rootScope.loadingdata=false;


    function formatVideoUrl(video) {
        return 'http://www.youtube.com/embed/' + video;
     }
     
})

Cont.controller('SearchController', function ($http, $scope, $routeParams, $location, $route, $rootScope,addbService) {
    $rootScope.loading = true;
    
    $scope.getDrink= function(id){
       $location.path( '/drink/'+id)
   }
 
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
        $scope.response = response;
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
        $rootScope.loading=true;
        var input = document.getElementById('usersearch').value
        $location.path('/searchresult/' + input)
    }
     $rootScope.navbar = false;
    
});

Cont.controller('RandomController', function ($http, $scope, $routeParams, $location, $rootScope, addbService) {
     
     $rootScope.loading =true;
     addbService.getRandom().then(function(result){
        $rootScope.loadingdata=true;
        $rootScope.loading=false;
       console.log('randomcont', result)
       $scope.randomdrink= result
       $scope.$apply()
      
   })
   
          

   $rootScope.navbar = false;

     $scope.insertdata = function () {
        var isFav
           console.log('insert')
        var addFav =   confirm('Add this drink to your Favorites as well?')
       if (addFav==true) {
           isFav=true
           $http.post("http://localhost:3000/api/achievements", {'name': $scope.randomdrink.name, 'id': $scope.randomdrink.id , 'isFav': isFav})
           
           .success(function (data, status, headers, config) {
              console.log($scope.randomdrink.id)
              alert($scope.randomdrink.name + 'was added to your collection!')
           })
       } else {
           isFav=false
           $http.post("http://localhost:3000/api/achievements", {'name': $scope.randomdrink.name, 'id': $scope.randomdrink.id , 'isFav': isFav})
           
           .success(function (data, status, headers, config) {
              console.log($scope.randomdrink.id)
              alert($scope.randomdrink.name + " was added to your collection! You've gained +1exp!")
           })
       }
    }
    // $rootScope.loading = false
    
    
})



Cont.controller('navController', function( $location, $scope, $rootScope){
   
    $scope.locate= function(){
        
        // $rootScope.loading = false;
        var input = document.getElementById('usersearch').value
        input.value=''
        $location.path('/searchresult/' + input).search('page', 1);
    }
    
})

