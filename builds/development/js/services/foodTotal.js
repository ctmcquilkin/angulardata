myApp.factory('FoodTotal', function($firebase,
  $rootScope, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/food-diary');

  var mealsInfo = $firebase(ref);

  var mealsArray = mealsInfo.$asArray();

  mealsArray.$loaded(function(data) {
	var foodTotal = 0;
    for (i=0; i<mealsArray.length; i++) {
    	$rootScope.foodTotal += parseInt(mealsArray[i].calories);
    }
  });

  mealsArray.$watch(function(data) {
    $rootScope.foodTotal = mealsArray.length;
  });

  return true;

}); //FoodTotal
