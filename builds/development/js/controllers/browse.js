myApp.controller('BrowseController', function($scope, 
  $rootScope, $firebase, $routeParams, 
  $location, Authentication, CountMeals, FIREBASE_URL) {

  $scope.whichrecipe = $routeParams.mId;
  var ref = new Firebase(FIREBASE_URL + '/recipes/' + $scope.whichrecipe);

  var recipeInfo = $firebase(ref);
  var recipeObj = recipeInfo.$asObject();
  console.log(recipeObj);
  
  recipeObj.$loaded().then(function(data) {
    $scope.recipe = data;
  }); //make sure meals data is loaded

}); //BrowseController