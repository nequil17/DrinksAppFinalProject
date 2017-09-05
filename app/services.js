angular.module('services')
.service('addbService', function($http){
    var page =  1;
    
    this.getDrinks = function(options = { skip: null, take: null, searchQuery: null, all: null, pageNumber: 1 }){
        return new Promise(function(resolve, reject){
            var take = options.take || 12,
                skip = options.skip || 0,
                searchQuery = '';

            if (options.all) {
                take = 1024;
                skip = 0;
            }

            console.log('options page number', options.pageNumber);

            if (!!options.searchQuery) {
                searchQuery = options.searchQuery.toLowerCase().replace(/\s/, '-');
            }

            addb.drinks('eg').skip(skip).take(take).loadSet(function(query) {
                if(!query.result){
                    reject(new Error('Server Error'))
                }

                var results = query.result;
                
                var  filtered = [];

                if (!!searchQuery) {
                    results.forEach(function(r) {
                        r.ingredients.forEach(function(i) {
                            if (i.type === searchQuery || i.id === searchQuery || r.id === searchQuery) {
                                filtered.push(r);
                            }
                        });
                    });
                }
                        console.log(filtered)
                if (searchQuery !== '' && options.all) {
                    var page = generatePage(options.pageNumber);
                    console.log(page)
                    filtered = filtered.slice(page, page + 12);
                }
                
                if (filtered.length === 0 && !!searchQuery) {
                    reject(new Error('No drinks match your search'));
                } else if (filtered.length > 0) {
                    query.result = filtered;
                    resolve(query);
                } else {
                    resolve(query);
                }
            });                
        });
    };

    this.getPage = function(pageNumber, searchQuery) {    
        var options = {
            pageNumber: pageNumber
        };

        if (searchQuery) {
            options.searchQuery = searchQuery;
            options.all = true;
        } else {
            options.take = 12;
            options.skip = generatePage(pageNumber);
        }
        
        return this.getDrinks(options);
    };

   function generatePage(page){
        return page == 1 ? 0 : (Number(page) -1) * 12;
   }
  
    this.getDrink= function(id) {
        return new Promise( function(resolve, reject){
            addb.drinks().load(id, function(response) {        
                if (!response.result[0]) {
                    reject(new Error('No Drink with that id found'));
                }

                resolve(response.result[0]);
            });
        });
    }
    this.getRandom= function(){
        return this.getDrinks({all: true})
            .then(function(response) {
                console.log('getRandom', response)
                var number= Math.floor(Math.random() * 1024) + 1 
                return response.result [number];
            });
    }
});
