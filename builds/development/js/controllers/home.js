myApp.controller('HomeController', function($scope, 
  $rootScope, $firebase, $routeParams, 
  $location, Authentication, CountMeals, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/tags/');

  var tags = $firebase(ref);
  var tagsArray = tags.$asArray();
  
  tagsArray.$loaded().then(function(data) {
  	var recipeIDs = [];
    $scope.recipeTags = data;
	var tags = Object.keys(data);
	tags.forEach(function(tag) {
	  var items = Object.keys(data[tag]);
	  items.forEach(function(item) {
		var value = data[tag][item];
		if (item !== '$id' && item !== '$priority') { recipeIDs.push(item) };
		//if (data[tag] === '$id' ) { tags.push(value) };
		//tags.push(data['$id']);
		//console.log(tags);
		//console.log(tag+': '+item+' = '+value);
	  });
	});
	//console.log(JSON.stringify(data, null, 2));

  }); //make sure meals data is loaded

}); //HomeController

//   var users = new Firebase(FIREBASE_URL + "/users/");
//   var userData = $firebase(users).$asArray();
//   $scope.recipes = [];
    //console.log(JSON.stringify($scope.recipeTags, null, 2));
//     	var index, len;
// 		var properties = [];
// 		var tagCats = Object.keys(data);
// 		tagCats.forEach(function(item) {
// 			//console.log(data[index]);
// 			var items = Object.keys(tagCats[tag]);
// 			items.forEach(function(item) {
// 				var value = data[tag][item];
// 				console.log(tag+': '+item+' = '+value);
// 			});
//  			if(index.hasOwnProperty(key) && typeof index[key] !== 'function') {
//  				properties.push(key);
//  			};
// 		});
// 		console.log(properties);
// 		for (i in data) {
// 			if (typeof(data[i])=="object") {
// 				//console.log(i, data[i])
// 				tags.push(data[i]);
// 				//console.log(data);
//  				//if (i == "tags") { tags.push(data[i]) };
// 				traverse(data[i] );
// 				i++;
// 			};
// 		};
// userData.$loaded().then(function(recipeInfo) {
//   	angular.forEach(recipeInfo, function traverse(recipeInfo) {
//   		for 
//   	});
//   	var recipes = [];
// 
// 	// traverse all user data
// 	angular.forEach(userData, function traverse(userData) {
// 		for (i in userData) {
// 			if (typeof(userData[i])=="object") {
// 				//console.log(i, userData[i])
// 				if (i == "recipes") { recipes.push(userData[i]) };
// 				traverse(userData[i] );
// 				i++;
// 			};
// 		};
// 	});
// 	angular.forEach(recipes, function(obj) {
// 		for (var prop in obj) {
// 			if (obj.hasOwnProperty(prop)) {
// 				// prints firebase recipe keys
// 				console.log(prop);
// 			}
// 		}
// 	});
// 	$scope.recipes = recipes;

	//console.log(JSON.stringify(recipes, null, 2));
  //}); //make sure meals data is loaded
// 	function match(item, filter) {
// 	  var keys = Object.keys(filter);
// 	  // true if any true
// 	  return keys.some(function (key) {
// 		return item[key] == filter[key];
// 	  });
// 	}
// 	var objects = [ { a: 'a', b: 'b', c: 'c'},
// 	  { b: '2', c: '1'},
// 	  { d: '3', e: '4'},
// 	  { e: 'f', c: 'c'} ];
// 
// 	objects.forEach(function(obj) {
// 	  console.log('Result: ', obj, { c: 'c', d: '3'});
// 	});