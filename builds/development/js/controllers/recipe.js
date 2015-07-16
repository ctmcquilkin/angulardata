myApp.controller('RecipeListingController', function($scope, 
  $rootScope, $firebase, $routeParams,
  $location, Authentication, CountMeals, FIREBASE_URL) {

  $scope.whichrecipe = $routeParams.mId;
  var ref = new Firebase(FIREBASE_URL + '/recipes/' + $scope.whichrecipe);
  var recipeInfo = $firebase(ref);
  var recipeObj = recipeInfo.$asObject();
  
  recipeObj.$loaded().then(function(data) {
    $scope.recipe = data;
  }); //make sure recipe data is loaded

}); //RecipeListingController