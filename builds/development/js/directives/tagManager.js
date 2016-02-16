myApp.directive('tagManager', function() {
    return {
        restrict: 'E',
        scope: { tags: '=' },
        template:
            '<input class="tagInput" type="text" name="tags" placeholder="Add a tag..." ng-model="new_value"></input> ' +
            '<a class="btn" ng-click="addTag()">Add Tag</a>' +
            '<h3>Recipe Tags:</h3><div class="tags">' +
                '<a ng-repeat="(idx, tag) in tags" class="tag btn btn-cat btn-recipe tooltip" ng-click="remove(idx)">{{tag}}<span>Remove</span></a>' +
            '</div>',
        link: function ( $scope, $element ) {
            // FIXME: this is lazy and error-prone
            var input = angular.element( $element.children()[1] );
            
            // This adds the new tag to the tags array
            $scope.addTag = function() {
                $scope.tags.push( $scope.new_value );
                $scope.new_value = "";
            };
            
            // This is the ng-click handler to remove an item
            $scope.remove = function ( idx ) {
                $scope.tags.splice( idx, 1 );
            };
            
            // Capture all keypresses
            input.bind( 'keypress', function ( event ) {
                // But we only care when Enter was pressed
                if ( event.keyCode == 13 ) {
                    // There's probably a better way to handle this...
                    $scope.$apply( $scope.addTag );
                }
            });
        }
    };
});