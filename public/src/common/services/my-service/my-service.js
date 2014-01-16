angular.module('common').factory('MyService', function() {
	var value = "hello world";

	return {
		getValue: function() {
			return value;
		}
	}
});