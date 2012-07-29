# Backbone AppRouter

Extends Backbone.Router to find back a route pattern and construct an URL with arguments.

## Methods

Based on the following router.

	var myrouter = Backbone.Router.extend({
				routes: {
					'home'                         : 'home',
					'catalogue'                    : 'catalogue',
					'catalogue/:tags'              : 'catalogue',
					'catalogue/:productId/:rewrite': 'productSheet',
					'search/*'                     : 'search'
				},
				home: function(){
					console.log('ROUTER -> home'); 
				},
				catalogue: function(tag){
					if(!_.isUndefined(tag))
					{
						console.log('ROUTER -> catalogue -> tags -> '+ tag);
					}
					else
					{
						console.log('ROUTER -> catalogue');
					}
				},
				productSheet: function(productId)
				{
					console.log('ROUTER -> catalogue -> productId -> '+ productId);
				},
				search: function(query)
				{
					console.log('ROUTER -> search -> query -> '+ query);
				}
			});

	app.router = new router(); 

### setRoute

Wrap __reverse__ and __createUri__ methods in a single call. If multiple possibilities, try to find the good route by comparing the count of arguments with given hash 

	var catalogueRoute = myrouter.setRoute('catalogue', ['awsome-tag']);
	console.log("create URI: %s", catalogueRoute);
	--> create URI: /catalogue/awsome-tag

	var searchUrl = app.router.setRoute('search', ['a fulltext search exemple ?']);
	console.log("create URI: %s", searchUrl);
	--> create URI: /search/a%20fulltext%20search%20exemple%20%3F

### reverse

return an array of matching routes based on method name

	var productRoute = myrouter.reverse('productSheet');
	console.log("get reverse route: %s", productRoute[0]);
	--> get reverse route: catalogue/:productId/:rewrite

### createUri

return an URL based on the route pattern and an array of arguments

	var newProductUrl = app.router.createUri(productRoute[0], [321, 'anoter-product-name'])
	console.log("create route: %s", newProductUrl);
	--> create route: /catalogue/321/anoter-product-name

### productRoute

return a list of arguments for a route pattern

	myrouter.getArgs(productRoute);
	--> ["productId", "rewrite"]

## TO DO

~~enhance the RegExp to match the "file/*path" argument~~ done...

