myApp.controller('RecipeListingController', function($scope, $filter,
  $rootScope, $firebase, $routeParams,
  $location, Authentication, CountMeals, FIREBASE_URL) {

  $scope.whichrecipe = $routeParams.mId;
  var ref = new Firebase(FIREBASE_URL + '/recipes/' + $scope.whichrecipe);
  var recipeInfo = $firebase(ref);
  var recipeObj = recipeInfo.$asObject();
  
  recipeObj.$loaded().then(function(data) {
    $scope.recipe = data;
	var recipeDate = $filter('date')($scope.recipe.date, "MM-dd-yyyy");
	console.log(recipeDate); 

  if (!$scope.currentUser) {
  	$scope.rated = 0;
  } else {
  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/food-diary/' + recipeDate + $scope.whichrecipe);

  var meals = $firebase(ref);
  $scope.meals = meals.$asArray();
  console.log(ref);
  	//$scope.rated = userRating;
  }

  $scope.rated2 = 6;

  $scope.readonly = false;
  $scope.readonly2 = true;
	
  }); //make sure recipe data is loaded

}); //RecipeListingController