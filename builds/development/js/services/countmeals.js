myApp.factory('CountMeals', function($firebase,
  $rootScope, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/food-diary');

  var mealsInfo = $firebase(ref);

  var mealsArray = mealsInfo.$asArray();

  mealsArray.$loaded(function(data) {
    $rootScope.howManyMeals = mealsArray.length;
  });

  mealsArray.$watch(function(data) {
    $rootScope.howManyMeals = mealsArray.length;
  });

  return true;

}); //CountMeals