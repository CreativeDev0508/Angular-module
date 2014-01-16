/**
 *
 * UNIT TEST SETUP FILE
 * Used exclusively by the Karma Unit Tests
 *
 */
var app = {
	states: {},
	modules: {},
	addState: function(name, options) {
		var path = name.split('.'),
			state = app;

		for(var i= 0, iLength=path.length; i < iLength; i++) {
			if(!state.states[path[i]]) {
				state.states[path[i]] = {
					states: {}
				}
			}
			state = state.states[path[i]];
		}

		state.name = name;
		state.options = options;
	}
};

var permissions = ["common", "app"];

_.each(permissions, function(permission) {
	angular.module(permission,
		_.union(
			_.without(permissions, permission),
			['templates-common', 'ui.router', 'ngSanitize']
		)
	);
});

angular.bootstrap(document, permissions);