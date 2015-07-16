myApp.factory('FoodTotal', function($firebase,
  $rootScope, FIREBASE_URL) {

//   function today() {
//   	var today = new Date();
//   	var month = today.getUTCMonth() + 1; //months from 1-12
//   	var day = today.getUTCDate();
//   	var year = today.getUTCFullYear();
//   	return month + '-' + day + '-' + year;
//   }
//   
//   return {
//   	today: today
//   	};
  var today = new Date();
  var month = today.getUTCMonth() + 1; //months from 1-12
  var day = today.getUTCDate();
  var year = today.getUTCFullYear();
  var todaysDate = month + '-' + day + '-' + year;

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/food-diary/' + todaysDate);

  var mealsInfo = $firebase(ref);

  var mealsArray = mealsInfo.$asArray();

  mealsArray.$loaded(function(data) {
	var foodTotal = 0;
    var sinceMidnight = new Date().getHours() * 60 * 60 * 1000; // plus or minus 60 min
    var today = new Date().getTime() - sinceMidnight;
    angular.forEach(mealsArray, function(meal, date) {
    	if (meal.date >= today) {
    		foodTotal += parseInt(meal.calories);
//     		console.log('foodTotal: ' + foodTotal);
//     		console.log('calories is a number? ' + Number(meal.calories));
//     		console.log('calories: ' + meal.calories);
//     		console.log('calories: ' + meal.calories.valueOf());
    	} else {
    		foodTotal = 0;
    	}
    	//console.log(foodTotal);
    	$rootScope.foodTotal = foodTotal;
//    	$rootScope.foodTotal += parseInt(mealsArray[i].calories);
    });
  });

  mealsArray.$watch(function(data) {
    $rootScope.foodTotal = mealsArray.length;
  });

  return true;

}); //FoodTotal
