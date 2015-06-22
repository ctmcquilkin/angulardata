myApp.controller('FoodDiaryController',
  function($scope, $rootScope, $firebase, FoodTotal,
    CountMeals, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/food-diary');

  var mealsInfo = $firebase(ref);
  var mealsObj = mealsInfo.$asObject();
  var todaysDate = new Date().getTime();

  $scope.dateFilter = [
  	{ name: 'today', value : 0 },
  	{ name: 'yesterday', value : 1 },
  	{ name: 'lastWeek', value : 2 },
  	{ name: 'lastMonth', value : 3 }
  ];
	
  $scope.dateFilter.date = $scope.dateFilter[0].value;

  mealsObj.$loaded().then(function(data) {
    $scope.meals = data;
    $scope.goal = 1830;
    $scope.today = todaysDate;
  }); //make sure meals data is loaded


  $scope.addMeal = function() {
    mealsInfo.$push({
      name: $scope.mealname,
      calories: $scope.mealcalories,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.mealname = '';
      $scope.mealcalories = '';
    });
  }; //addmeal

  $scope.deleteMeal = function(key) {
    mealsInfo.$remove(key);
  }; //deleteMeal


}); //FoodDiaryController