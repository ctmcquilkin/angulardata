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
  
  var tagsRef = new Firebase(FIREBASE_URL+ '/tags/');
  var recipeTags = $firebase(tagsRef);

  $scope.addRecipe = function() {
    var UserRecipesObj = $firebase(ref);
    var rRef = new Firebase(FIREBASE_URL);
    var recipeRef = rRef.child('recipes');
 
     var myData = {
      firstname: $scope.user.firstname,
      recipename: $scope.user.recipename,
      recipeTags: $scope.tags, 
      date: Firebase.ServerValue.TIMESTAMP
    };

    UserRecipesObj.$push(myData).then(function() {
      $location.path('/recipes/' + $scope.whichuser + '/' +
        $scope.whichrecipe + '/recipeList');
    });//UserRecipesObj
    
	var keys = [];
	ref.on('child_added', function(snap) {
		var key = snap.key();
		//console.log(key);
		keys.push(key);
	});
	var lastRecipeKey = keys[keys.length -1];
	//console.log(keys[keys.length -1]); // FIREBASE KEY OF Recipe Entry
    
    // save Recipe Key to tag directory under tag (user recipe id and tag id are identical)
    for (var i = 0; i < $scope.tags.length; i++) {
		var recipeID = tagsRef.child($scope.tags[i] + '');
		var recipeTags = $firebase(recipeID);
		$scope.recipeTagAttr = recipeTags.$asArray();
		recipeID.child(lastRecipeKey).set({
			recipeName: $scope.user.recipename,
			recipeAuthor: $scope.user.firstname,
			recipeCooktime: $scope.user.recipecooktime,
			date: Firebase.ServerValue.TIMESTAMP
		});
	};
	// save recipe to recipe directory
	recipeRef.child(lastRecipeKey).set({
		recipeName: $scope.user.recipename,
		recipeAuthor: $scope.user.firstname,
        recipeyield: $scope.user.recipeyield,
        recipeingredients: $scope.user.recipeingredients,
		recipeCooktime: $scope.user.recipecooktime,
        recipePrep: $scope.user.recipeprep,
        recipeTags: $scope.tags, 
		date: Firebase.ServerValue.TIMESTAMP
	});

//     recipeTags.$push({
// 	  foodDiaryID: lastRecipeKey, 
// //       recipeBrowseURL: "users/" + $scope.whichuser + "/food-diary/" + 
// //       $scope.whichrecipe + '/recipeList',
//       recipeName: $scope.user.recipename,
//       recipeCooktime: $scope.user.recipecooktime,
//       recipeAuthor: $scope.user.firstname,
//       date: Firebase.ServerValue.TIMESTAMP
//     });

// 	var keys = [];
// 	tagsRef.on('child_added', function(snap) {
// 		var key = snap.key();
// 		//console.log(key);
// 		keys.push(key);
// 	});
// 	console.log(keys[0]); // FIREBASE KEY OF TAG

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

//     tagsRef.on('value', function(tagSnapshot) {
//     	var key = tagSnapshot.key();
//     	var ref = tagSnapshot.ref();
//     	var name = tagSnapshot.name();
//     	var data = tagSnapshot.val();
//     	console.log(key); // tag
//     	//console.log(ref);
//     	//console.log(name); // tag
//     	// loop below prints the tags for the current tag as an object:
// 		for (var key in data) {
// 		  if (data.hasOwnProperty(key)) {
// 			alert(key + " -> " + data[key]);
// 		  }
// 		}
//     	//console.log(data.name);
//     });
// 	tagsRef.once("value", function(allTagsSnapshot) {
// 		var properties = [];
// 		var sorted = [];
// 		allTagsSnapshot.forEach(function(tagSnapshot) {
// 			var key = tagSnapshot.key();
// 			var uid = tagSnapshot.child('recipeName').val();
// 			var text = tagSnapshot.child('recipeAuthor').val();
// 			var date = tagSnapshot.child('date').val();
// 			properties.push(key, date);
// 			//console.log(properties);
// 			//console.log(uid);
// 			//console.log(text);
// 			//console.log(key);
// 		});
// 		properties.sort(function(a, b) {
// 			return parseFloat(a.date) - parseFloat(b.date);
// 		});
// // 		var lastIndex = properties.length - 1;
// 		//var last = properties.slice(-1).pop(); 
// 		//console.log(properties[last]);
// 	});