myApp.controller('FoodDiaryController',
  function($scope, $rootScope, $firebase,
    CountMeals, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/food-diary');

  var mealsInfo = $firebase(ref);
  var mealsObj = mealsInfo.$asObject();

  mealsObj.$loaded().then(function(data) {
    $scope.meals = data;
  }); //make sure meals data is loaded


  $scope.addMeal = function() {
    mealsInfo.$push({
      name: $scope.mealname,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.mealname = '';
    });
  }; //addmeal

  $scope.deleteMeal = function(key) {
    mealsInfo.$remove(key);
  }; //deleteMeal


}); //FoodDiaryController