// Karma configuration
// Generated on Fri Jun 21 2013 15:10:19 GMT-0600 (MDT)

module.exports = function(config) {
	config.set({
		basePath: '../',
		frameworks: ['jasmine'],
		files: [			
			'public/lib/jquery/jquery.min.js',
			'public/lib/angular/angular.js',
			'public/lib/angular-route/angular-route.js',
			'public/lib/angular-ui-router/angular-ui-router.js',
			'public/lib/angular-mocks/angular-mocks.js',
			'public/lib/angular-sanitize/angular-sanitize.js',
			'public/lib/lodash/lodash.min.js',

// Load the templates
			'public/build/*/templates.js',

// Load the setup
			'test/setup.js',

//	Load the source files
			'public/src/*/**/*.js',

//	Load the specs
			'public/src/**/*.spec.js'
		],
		exclude: [],
		reporters: ['progress', 'junit'],
		port: 9876,
		colors: true,
//		LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,
		autoWatch: true,
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browser: ['PhantomJS'],
		captureTimeout: 60000,
//		singleRun: true,
		junitReporter: {
			outputFile: 'test-results/test-results.xml'
		},
		coverageReporter: {
			type : 'html',
			dir : 'test-results/'
		}
	});
};