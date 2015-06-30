myApp.controller('RecipeController', function($scope, 
  $rootScope, $firebase, $routeParams, 
  $location, Authentication, CountMeals, FIREBASE_URL) {

  $scope.whichrecipe = $routeParams.mId;
  $scope.whichuser = $routeParams.uId;
  $scope.order="firstname";
  $scope.direction= null;
  $scope.recordId='';
  $scope.query='';

  var recipeRef = new Firebase(FIREBASE_URL+ '/recipes');

  var recipeInfo = $firebase(recipeRef);

  var ref = new Firebase(FIREBASE_URL + "/users/" +
    $scope.whichuser + "/food-diary/" + 
    $scope.whichrecipe + '/recipes');
    
  // create reference for saving recipe name and URL
  var recipeList = $firebase(ref).$asArray();
  $scope.recipes = recipeList;

  $scope.addRecipe = function() {
    var recipesObj = $firebase(ref);

    var myData = {
      firstname: $scope.user.firstname,
      recipename: $scope.user.recipename,
      recipeyield: $scope.user.recipeyield,
      recipeingredients: $scope.user.recipeingredients,
      date: Firebase.ServerValue.TIMESTAMP
    };
    
    // save recipe name and URL to recipe directory
    recipeInfo.$push({
      recipename: $scope.user.recipename,
      recipeURL: FIREBASE_URL + "/users/" +
      $scope.whichuser + "/food-diary/" + 
      $scope.whichrecipe + '/recipes',
      date: Firebase.ServerValue.TIMESTAMP
    })

    recipesObj.$push(myData).then(function() {
      $location.path('/recipes' + $scope.whichuser + '/' +
        $scope.whichrecipe + '/recipeList');
    });//recipesObj
  }; //addRecipe


  $scope.pickRandom = function() {
    var whichRecord = Math.round(Math.random() * recipeList.length);
    $scope.recordId = recipeList.$keyAt(whichRecord);
  }; //pick winner

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

  $scope.giveLove = function(myItem, myGift) {
    var refLove = new Firebase(FIREBASE_URL + '/users/'+
      $scope.whichuser + '/food-diary/' +
      $scope.whichrecipe + '/recipes/' + myItem.$id +
      '/awards');
    var recipesObj = $firebase(refLove);

    var myData = {
      name: myGift,
      date: Firebase.ServerValue.TIMESTAMP
    };

    recipesObj.$push(myData);
  }; //giveLove

  $scope.deleteLove = function(recipeId, award) {
    var refLove = new Firebase(FIREBASE_URL + '/users/'+
      $scope.whichuser + '/food-diary/' +
      $scope.whichrecipe + '/recipes/' + recipeId +
      '/awards');
    var record = $firebase(refLove);
    record.$remove(award);
  }; //deleteLove

}); //RecipeController