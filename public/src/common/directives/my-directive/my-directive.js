angular.module('common').directive('myDirective', function() {

	return {

		restrict: 'E',
		templateUrl : 'src/common/directives/my-directive/my-directive.html',

		scope: {
			label: '@'
		},

		link: function(scope, iElement) {
			console.log('running link');
		}
	}
});