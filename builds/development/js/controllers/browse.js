myApp.controller('BrowseController', function($scope, 
  $rootScope, $firebase, $routeParams, 
  $location, Authentication, CountMeals, FIREBASE_URL) {

  $scope.whichrecipe = $routeParams.mId;
  $scope.order="date";
  $scope.direction= null;
  $scope.recordId='';
  $scope.query='';
  var ref = new Firebase(FIREBASE_URL + '/tags/' + $scope.whichrecipe);
  

  var tags = $firebase(ref);
  var tagsArray = tags.$asArray();
  
  tagsArray.$loaded().then(function(data) { //data is the array of tagged recipes
  	var recipeIDs = [];
    $scope.taggedRecipes = data;
	var tags = Object.keys(data);
	tags.forEach(function(tag) {
	  var items = Object.keys(data[tag]);
	  items.forEach(function(item) {
		var value = data[tag][item];
		if (item !== '$id' && item !== '$priority') { recipeIDs.push(item) };
		//if (data[tag] === '$id' ) { tags.push(value) };
		//tags.push(data['$id']);
		//console.log(tags);
		console.log(tag+': '+item+' = '+value);
	  });
	});
	console.log(JSON.stringify(data, null, 2));

  }); //make sure meals data is loaded

  $scope.pickRandom = function() {
    var whichRecord = Math.round(Math.random() * tagsArray.length);
    $scope.recordId = tagsArray.$keyAt(whichRecord);
  }; //pick random recipe

}); //BrowseController

// Old code
//   $scope.whichrecipe = $routeParams.mId;
//   var ref = new Firebase(FIREBASE_URL + '/tags/' + $scope.whichrecipe);
// 
//   var recipeInfo = $firebase(ref);
//   var recipeObj = recipeInfo.$asObject();
//   console.log(recipeObj);
//   
//   recipeObj.$loaded().then(function(data) {
//     $scope.recipe = data;
//   }); //make sure meals data is loaded