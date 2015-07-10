myApp.controller('RecipeController', function($scope, 
  $rootScope, $firebase, $routeParams, 
  $location, Authentication, CountMeals, FIREBASE_URL) {

  $scope.whichrecipe = $routeParams.mId;
  $scope.whichuser = $routeParams.uId;
  $scope.order="firstname";
  $scope.direction= null;
  $scope.recordId='';
  $scope.query='';
  $scope.tags = [];
  
  var hour = new Date().getHours();
  if ( hour < 12 ) {
  	$scope.tags = [ 'breakfast' ];
  } else if ( hour >= 12 && hour <= 24 ) {
	$scope.tags = [ 'lunch' ];
  } else {
	$scope.tags = [ 'snack' ];
  };

  var ref = new Firebase(FIREBASE_URL + "/users/" +
    $scope.whichuser + "/food-diary/" + 
    $scope.whichrecipe + '/recipes');
    
  var recipeList = $firebase(ref);
  var recipeArray = recipeList.$asArray();
  $scope.recipes = recipeList.$asArray();
  
  var tagsRef = new Firebase(FIREBASE_URL+ '/tags/' + $scope.tags);
  var recipeTags = $firebase(tagsRef);

  $scope.addRecipe = function() {
    var recipesObj = $firebase(ref);

    var myData = {
      firstname: $scope.user.firstname,
      recipename: $scope.user.recipename,
      recipeyield: $scope.user.recipeyield,
      recipeingredients: $scope.user.recipeingredients,
      recipeCooktime: $scope.user.recipecooktime,
      recipeTags: $scope.tags, 
      date: Firebase.ServerValue.TIMESTAMP
    };

    recipesObj.$push(myData).then(function() {
      $location.path('/recipes/' + $scope.whichuser + '/' +
        $scope.whichrecipe + '/recipeList');
    });//recipesObj
    
    // save recipe name and URL to recipe directory
    recipeTags.$push({
	  foodDiaryID: $scope.whichrecipe, // need to add KEY
      recipeURL: FIREBASE_URL + "users/" +
      $scope.whichuser + "/food-diary/" + 
      $scope.whichrecipe + '/recipes',
      recipeBrowseURL: "users/" + $scope.whichuser + "/food-diary/" + 
      $scope.whichrecipe + '/recipeList',
      recipeName: $scope.user.recipename,
      recipeCooktime: $scope.user.recipecooktime,
      recipeAuthor: $scope.user.firstname,
      date: Firebase.ServerValue.TIMESTAMP
    });


  }; //addRecipe

  $scope.pickRandom = function() {
    var whichRecord = Math.round(Math.random() * recipeArray.length);
    $scope.recordId = recipeArray.$keyAt(whichRecord);
  }; //pick random recipe

  $scope.deleteRecipe = function(id) {
    var record = $firebase(ref);
    record.$remove(id);
  }; //deleteMeal

  $scope.showLove = function(myItem) {
    myItem.show = !myItem.show;

    if(myItem.userState == 'expanded') {
      myItem.userState = '';
    } else {
      myItem.userState = 'expanded';
    }
  }; //showLove

  $scope.giveLove = function(myItem, myComment) {
    var refLove = new Firebase(FIREBASE_URL + '/users/'+
      $scope.whichuser + '/food-diary/' +
      $scope.whichrecipe + '/recipes/' + myItem.$id +
      '/comments');
    var recipesObj = $firebase(refLove);

    var myData = {
      name: myComment,
      date: Firebase.ServerValue.TIMESTAMP
    };

    recipesObj.$push(myData);
  }; //giveLove

  $scope.deleteLove = function(recipeId, comment) {
    var refLove = new Firebase(FIREBASE_URL + '/users/'+
      $scope.whichuser + '/food-diary/' +
      $scope.whichrecipe + '/recipes/' + recipeId +
      '/comments');
    var record = $firebase(refLove);
    record.$remove(comment);
  }; //deleteLove

}); //RecipeController