myApp.controller('RecipeController', function($scope, 
  $rootScope, $firebase, $routeParams, 
  $location, Authentication, CountMeals, FIREBASE_URL) {

  $scope.whichrecipe = $routeParams.mId;
  $scope.whichuser = $routeParams.uId;
  $scope.order="firstname";
  $scope.direction= null;
  $scope.recordId='';
  $scope.query='';

  var ref = new Firebase(FIREBASE_URL + "/users/" +
    $scope.whichuser + "/food-diary/" + 
    $scope.whichrecipe + '/recipes');
    
  var recipeList = $firebase(ref).$asArray();
  $scope.recipes = recipeList;

  $scope.addRecipe = function() {
    var recipesObj = $firebase(ref);
    var tagsRef = new Firebase(FIREBASE_URL+ '/tags/' + $scope.user.recipename); // recipe name needs to be replaced with tag name
  	var recipeTags = $firebase(tagsRef);

    var myData = {
      firstname: $scope.user.firstname,
      recipename: $scope.user.recipename,
      recipeyield: $scope.user.recipeyield,
      recipeingredients: $scope.user.recipeingredients,
      date: Firebase.ServerValue.TIMESTAMP
    };
    
    // save recipe name and URL to recipe directory
    recipeTags.$push({
      recipename: $scope.user.recipename, // replace with tag name!
      recipeURL: FIREBASE_URL + "users/" +
      $scope.whichuser + "/food-diary/" + 
      $scope.whichrecipe + '/recipes',
      date: Firebase.ServerValue.TIMESTAMP
    })

    recipesObj.$push(myData).then(function() {
      $location.path('/recipes/' + $scope.whichuser + '/' +
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