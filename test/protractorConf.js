require('jasmine-reporters');
var mkdirp = require('mkdirp');
var TEST_DIR = 'test-results/protractor/';

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['protractor-tests/cdn.js'],
	allScriptsTimeout: 20000,
	isVerbose: true,

	capabilities: {
		'browserName': 'chrome'
	},

	onPrepare: function() {
		mkdirp.sync(TEST_DIR);

		jasmine.getEnv().addReporter(
			new jasmine.JUnitXmlReporter(TEST_DIR, true, true));
	}
}