var myApp = angular.module('myApp', ['ngRoute',
'firebase', 'appControllers'])
.constant('FIREBASE_URL', 'https://eat-right.firebaseio.com/');

var appControllers = angular.module('appControllers',
  ['firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
  function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $rootScope.message='Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller:  'RegistrationController'
    }).
    when('/recipes/:uId/:mId', {
      templateUrl: 'views/recipes.html',
      controller:  'RecipeController'
    }).
    when('/checkins/:uId/:mId/recipeList', {
      templateUrl: 'views/recipelist.html',
      controller:  'RecipeController'
    }).
    when('/food-diary', {
      templateUrl: 'views/foodDiary.html',
      controller: 'FoodDiaryController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);