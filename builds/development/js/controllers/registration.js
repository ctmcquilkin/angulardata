myApp.controller('RegistrationController', 
  function($scope, $firebaseAuth, $location, Authentication) {

  var ref = new Firebase('https://eat-right.firebaseio.com/');
  var auth = $firebaseAuth(ref);
  
  $scope.login = function() {
    Authentication.login($scope.user)
    .then(function(user) {
      $location.path('/food-diary');
    }).catch(function(error) {
      $scope.message = error.message;
    });
  }; //login

  $scope.register = function() {
    Authentication.register($scope.user)
      .then(function(user) {
        Authentication.login($scope.user);
        $location.path('/food-diary');
      }).catch(function(error) {
        $scope.message = error.message;
      });
  }; //register

}); //RegistrationController