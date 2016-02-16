/*
 ngRating System ranking 
 ================================

 size .....: Number of symbols to show. Default - 5
 value ....: ranking value. Determines how many symbols appear connected. Default - 0
 field ....: variable name in the parent scope that will receive the value of the field 'value'.
 readonly .: If the user can interact with this directive. Default - false (ie, the user interacts)
 */

myApp.directive('ratings', function() {

	var directive = {};
	directive.restrict = 'E';
	directive.template = '<ul class="rating"><li class="zerostar" ng-click="rateClick(-1)" ng-show="change2zero" ng-style="visimap"></li><li ng-repeat="s in stars track by $index" class="normalstar" ng-class="{ ratingSel: s }" ng-click="rateClick($index)" ' + 'ng-mouseenter="rateIn($index)" ng-mouseleave="rateOut()"></li></ul>';
	
	directive.scope = {
		value: '=rating',
		readonly: '=readonly'
	};

	directive.compile = function() {

		return function($scope, element, attrs) {

			$scope.stars = [];
			$scope.size = attrs.size || 5;
			$scope.change2zero = attrs.change2zero || true;
			$scope.$watch('readonly', function() { $scope.visimap = { "visibility": !$scope.readonly ? "visible" : "hidden"}; });
			$scope.$watch('value', function() { update($scope.value - 1); });

			for (var i = 0; i < $scope.size; i++) {
				$scope.stars.push(i <= $scope.value - 1);
			};

			var update = function(ind) {
				for (var i = 0; i < $scope.size; i++) {
					$scope.stars[i] = (i <= ind);
				};                            
			};  

			$scope.rateClick = function(ind) {
				if (!$scope.readonly) { $scope.value = ind + 1; }
			};

			$scope.rateIn = function(ind) {
				if (!$scope.readonly) { update(ind); }
			};

			$scope.rateOut = function() {
				if (!$scope.readonly) { update($scope.value - 1); }
			};  
		};
	}
	return directive;
});