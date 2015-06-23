myApp.directive('welcomeMsg', function() {
  return {
    restrict: 'A',
    template: '{{dir.message}}',
    controller:function() {
    	var hour = new Date().getHours();
    	if ( hour < 12 ) {
    		this.message = "Good Morning ";
    	} else if ( hour >= 12 && hour <= 24 ) {
    		this.message = "Good Evening ";
    	} else {
    		this.message = "Hi";
    	}
    },
    controllerAs: 'dir'
//     link: function(scope, element, attr) {
//       var msg = attr.confirmationNeeded || "Are you sure you want to delete this item?";
//       var clickAction = attr.ngClick;
//       element.bind('click', function() {
//         if(window.confirm(msg)) {
//           scope.$eval(clickAction);
//         }
//       });
//     }
  };
});