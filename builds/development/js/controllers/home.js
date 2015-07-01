myApp.controller('HomeController', function($scope, 
  $rootScope, $firebase, $routeParams, 
  $location, Authentication, CountMeals, FIREBASE_URL) {

//   var users = new Firebase(FIREBASE_URL + "/users/");
//   var userData = $firebase(users).$asArray();
//   $scope.recipes = [];
  var ref = new Firebase(FIREBASE_URL + '/recipes/');

  var recipeInfo = $firebase(ref);
  var recipeObj = recipeInfo.$asObject();
  
  recipeObj.$loaded().then(function(data) {
    $scope.recipes = data;
  }); //make sure meals data is loaded
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

}); //HomeController