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
  };
});