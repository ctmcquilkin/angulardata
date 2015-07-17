myApp.controller('FoodDiaryController',
  function($scope, $rootScope, $firebase, FoodTotal,
    CountMeals, FIREBASE_URL) {

//   var todaysDate = FoodTotal.today();
  var today = new Date();
  var month = today.getUTCMonth() + 1; //months from 1-12
  var day = today.getUTCDate();
  var year = today.getUTCFullYear();
  var todaysDate = month + '-' + day + '-' + year;
  var nxtDate = todaysDate;
  $rootScope.nxtDate = nxtDate;

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/food-diary/' + todaysDate);

  var meals = $firebase(ref);
  $scope.meals = meals.$asObject();
  
  //var todaysDate = new Date().getTime();

  $scope.dateFilter = [
  	{ name: 'today', value : 0 },
  	{ name: 'yesterday', value : 1 },
  	{ name: 'lastWeek', value : 2 },
  	{ name: 'lastMonth', value : 3 }
  ];
	
  $scope.dateFilter.date = $scope.dateFilter[0].value;

  $scope.meals.$loaded().then(function(data) {
    $scope.meals = data;
    $scope.goal = 1830;
    $scope.today = todaysDate;
  }); //make sure meals data is loaded

//   console.log('today: ' + todaysDate);
//   console.log('nxtDate: ' + nxtDate);

  $scope.prev = function() { // this is janky, need to account for falling through to previous month
    nxtDate = month + '-' + (day--) + '-' + year;
    $rootScope.nxtDate = nxtDate;
  	var nxtRef = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/food-diary/' + nxtDate);
    var meals = $firebase(nxtRef);
  	$scope.meals = meals.$asObject();
  };
  $scope.nxt = function() {// this is janky, need to account for falling into next month
    nxtDate = month + '-' + (day++) + '-' + year;
    $rootScope.nxtDate = nxtDate;
  	var nxtRef = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/food-diary/' + nxtDate);
    var meals = $firebase(nxtRef);
  	$scope.meals = meals.$asObject();
  };

  $scope.addMeal = function() {
    meals.$push({
      name: $scope.mealname,
      calories: $scope.mealcalories,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.mealname = '';
      $scope.mealcalories = '';
    });
  }; //addmeal

  $scope.deleteMeal = function(key) {
    meals.$remove(key);
    console.log(key);
  }; //deleteMeal


}); //FoodDiaryController