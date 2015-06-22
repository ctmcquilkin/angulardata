'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('dateFilter', [ function(meals, range) {
    return function(meals, range) {
      var sorted = [];
      var filtered_list = [];
      var today = new Date().getTime() - 90000000; // 1400000000000
      var yesterday = new Date().getTime() - 120000000;
      var lastWeek = new Date().getTime() - 1400000000000;
      if (range == 0) {
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
