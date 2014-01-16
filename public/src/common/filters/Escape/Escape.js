angular.module('common').filter('escape', function() {
	return function(input) {
		return _.escape(input);
	}
});