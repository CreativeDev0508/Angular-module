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

(function() {

	var permissions = ["common", "app"],
		stateProvider;

	function createStyleSheet(href) {
		if(typeof href !== 'undefined') {
			var element = document.createElement('link');
			element.type = 'text/css';
			element.rel = 'stylesheet';
			element.href = href;
		}
		else {
			var element = document.createElement('style');
			element.type = 'text/css';
		}

		document.getElementsByTagName('head')[0].appendChild(element);
		var sheet = document.styleSheets[document.styleSheets.length - 1];
	}

	app.wrapper = angular.module('wrapper', ['ui.router', 'ngSanitize', 'ngAnimate'], function($stateProvider) {
		stateProvider = $stateProvider;
	});

	_.each(permissions, function(permission) {
		angular.module('templates-' + permission, []);

		angular.module(permission,
			['common', 'templates-common', 'templates-' + permission]
		);

		createStyleSheet("build/" + permission + "/" + permission + ".css");
	});

	function executeState(state) {
		stateProvider.state(state.name, state.options);
		_.each(state.states, executeState);
	}

	head.js.apply(null, _.union(_.map(permissions,function(p) {return "build/" + p + "/" + p + '.js'}), [
		function() {
			app.wrapper.run(function() {
				_.each(app.states, function(state) {
					executeState(state);
				});
			});

			angular.bootstrap(document.body, ['ngRoute', 'wrapper'].concat(permissions));

			// Have to add an ng-app directive for the e2e tests to obtain the correct
			// injector for the application. This will throw an error in angular because
			// the app was already manually bootstrapped prior. Swallow up the error. Ugly :p
			try {
				$(document.body).addClass('ng-app');
			} catch(e) {}
		}
	]));

})();