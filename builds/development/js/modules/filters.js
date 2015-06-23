'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('dateFilter', [ function(meals, range) {
    return function(meals, range) {
      var sorted = [];
      var filtered_list = [];
      var sinceMidnight = new Date().getHours() * 60 * 60 * 1000; // plus or minus 60 min
      var today = new Date().getTime() - sinceMidnight;
      
      //console.log('since midnight in seconds: ' + sinceMidnight);
      //console.log('today: ' + today);
      //var today = new Date().getTime() - 90000000; // 1400000000000
      //var now = new Date() / 1000 / 86; // 1435063769926
      //console.log(now); 
      //var yesterday = new Date().getTime() - 120000000;
      var yesterday = new Date().getTime() - 172800000;
      var lastWeek = new Date().getTime() - 604800000;
      //console.log('yesterday: ' + yesterday); // 14350643532317200
      //console.log('today: ' + today);
      if (range == 0) {                         // 1435010676316
      	 angular.forEach(meals, function(prop) {
      	 	sorted.push(prop);
      	 	if (prop.date >= today) {
				filtered_list.push(prop);
			}
			//console.log(prop.date);
			console.log(range);
      	 });
      	 return filtered_list;
      } else if (range == 1) {
      	 angular.forEach(meals, function(prop) {
      	 	sorted.push(prop);
      	 	if (prop.date >= yesterday) {
				filtered_list.push(prop);
			}
			//console.log(prop.date);
			console.log(range);
      	 });
      	 return filtered_list;
      } else if (range == 2) {
      	 angular.forEach(meals, function(prop) {
      	 	sorted.push(prop);
      	 	if (prop.date >= lastWeek) {
				filtered_list.push(prop);
			}
			//console.log(prop.date);
			console.log(range);
      	 });
      	 return filtered_list;
      } else {
      	 return meals;
      }
		 //console.log(today);
      	 //console.log(sorted);
      
    };
  }]);
