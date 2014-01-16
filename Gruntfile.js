var fs = require('fs'),
	_  = require('lodash'),
	colors = require('colors');

var modules = fs.readdirSync('public/src/');

console.log(('Generating tasks for the following modules: ').green, (modules.join(', ')).grey);

var uglifyTask = {
	options: {
		mangle: false,
		beautify: true,
		sourceMapPrefix: 2,
		sourceMapRoot: "../../src",
		compress: {
			global_defs: {
				"DEBUG": true
			},
			sequences     : false,  // join consecutive statemets with the “comma operator”
			properties    : false,  // optimize property access: a["foo"] → a.foo
			dead_code     : false,  // discard unreachable code
			drop_debugger : false,  // discard “debugger” statements
			conditionals  : false,  // optimize if-s and conditional expressions
			comparisons   : false,  // optimize comparisons
			evaluate      : false,  // evaluate constant expressions
			booleans      : false,  // optimize boolean expressions
			loops         : false,  // optimize loops
			unused        : false,  // drop unused variables/functions
			hoist_funs    : false,  // hoist function declarations
			if_return     : false,  // optimize if-s followed by return/continue
			join_vars     : false,  // join var declarations
			cascade       : false,  // try to cascade `right` into `left` in sequences
			side_effects  : false,  // drop side-effect-free statements
			warnings      : true
		}
	}
};

var ngAnnotateTask = {
	options: {
		add: true
	}
}

var watchTask = {};
var lessTask = {
	options: {
//		compress: true,
//		report: 'gzip',
		sourceMap: true,
		paths: ["public/src"]
	}
};

var karmaTask = {
	unit: {
		configFile: 'test/karma.unit.conf.js',
		singleRun: true,
		browsers: ['Chrome'],
		reporters: 'dots',
		runnerPort: 9101
	},
	headless: {
		configFile: 'test/karma.unit.conf.js',
		singleRun: true,
		browsers: ['PhantomJS'],
		reporters: ['coverage', 'dots', 'junit'],
		preprocessors: { }
	}
};

var html2jsTask = {
	options: {
		// custom options, see below
		base: "public"
	}
};

var buildTask = ['html2js', 'less'];
var buildProdTask = ['html2js', 'less'];

_.each(modules, function(m) {
	var files = {},
		prodFiles = {};

	// Populate Uglify Task
	files['public/build/' + m + '/' + m + '.js'] = ['public/src/' + m + '/**/*.js', '!public/src/' + m + '/**/*spec.js', 'public/build/' + m + '/templates.js']
	prodFiles['public/build/' + m + '/' + m + '.min.js'] = ['public/build/' + m + '/' + m + '.min.js'];

	uglifyTask[m] = {
		files: files,
		options: {
			sourceMap: 'public/build/' + m + '/' + m + '.js.map',
			sourceMappingURL: m + '.js.map'
//			banner: 'angular.module("' + m + '", ["common", "templates-common", "templates-' + m + '"]);'
		}
	};

	uglifyTask[m+'_prod'] = {
		files: prodFiles,
		options: {
			sourceMap: 'public/build/' + m + '/' + m + '.min.js.map',
			sourceMappingURL: m + '.min.js.map',
			sourceMapIn: 'public/build/' + m + '/' + m + '.js.map',
			mangle: true,
			beautify: false,
			compress: {
				global_defs: {
					"DEBUG": true
				},
				sequences     : true,  // join consecutive statemets with the “comma operator”
				properties    : true,  // optimize property access: a["foo"] → a.foo
				dead_code     : true,  // discard unreachable code
				drop_debugger : true,  // discard “debugger” statements
				conditionals  : true,  // optimize if-s and conditional expressions
				comparisons   : true,  // optimize comparisons
				evaluate      : true,  // evaluate constant expressions
				booleans      : true,  // optimize boolean expressions
				loops         : true,  // optimize loops
				unused        : true,  // drop unused variables/functions
				hoist_funs    : true,  // hoist function declarations
				if_return     : true,  // optimize if-s followed by return/continue
				join_vars     : true,  // join var declarations
				cascade       : true,  // try to cascade `right` into `left` in sequences
				side_effects  : true,  // drop side-effect-free statements
				warnings      : true
			}
		}
	};

	// Populate Watch Task
	watchTask[m+'_js'] = {
		files: ['public/src/' + m + '/**/*.js', 'public/src/' + m + '/**/*.html'],
		tasks: ['html2js:'+m, 'uglify:'+m]
	};

	watchTask[m+'_less'] = {
		files: ['public/src/' + m + '/**/*.less'],
		tasks: ['less:'+m]
	};

	// Populate LESS Task
	files = {};
	files['public/build/' + m + '/' + m + '.css'] = ['public/src/' + m + '/**/*.less'];
	lessTask[m] = {
		files: files
	}

	// Populate Karma Task
	if(m !== 'documentation') {
		karmaTask.headless.preprocessors['public/src/' + m + '/**/!(*spec).js'] = 'coverage';
	}

	// Populate html2js Task
	html2jsTask[m] = {
		src: ['public/src/' + m + '/**/*.html'],
		dest: 'public/build/' + m + '/templates.js'
	};

	// Populate ngAnnotate task
	ngAnnotateTask[m] = {
		files: {}
	};
	ngAnnotateTask[m].files['public/build/' + m + '/' + m + '.min.js'] = 'public/build/' + m + '/' + m + '.js';

	// Populate build Task
	buildTask.push('uglify:'+m);

	// Populate build production Task
	buildProdTask.push('uglify:'+m);
	buildProdTask.push('ngAnnotate:'+m);
	buildProdTask.push('uglify:' + m + '_prod');
});

buildTask.push('concat');
buildProdTask.push('concat');

module.exports = function(grunt) {
//	require('time-grunt')(grunt);

	grunt.initConfig({
		bower: {
			install: {
				options: {
					targetDir: './public/lib',
					layout: 'byType',
					install: true,
					verbose: true,
					cleanTargetDir: false,
					cleanBowerDir: false
				}
			}
		},
		uglify: uglifyTask,
		watch: watchTask,
		less: lessTask,
		karma: karmaTask,
		html2js: html2jsTask,
		ngAnnotate: ngAnnotateTask,

		clean: ["bower_components", "public/lib", "public/build"],

		copy: {
			"font-awesome": {
				files: [
					{cwd: 'public/lib/font-awesome/', src: ['*.css'], dest: 'public/lib/font-awesome/css/', filter: 'isFile', expand: true, flatten: true},
					{cwd: 'public/lib/font-awesome/', src: ['*.otf', '*.eot', '*.svg', '*.ttf', '*.woff'], dest: 'public/lib/font-awesome/fonts/', filter: 'isFile', expand: true, flatten: true}
				]
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [
					'public/src/common/base-styles/colors.less',
					'public/src/common/base-styles/mixins.less'
				],
				dest: 'public/build/common/sf.less'
			}
		},

		githooks: {
			all: {
				'post-merge': {
					taskNames: 'setup',
					template: './hook-template.js.hb',
					dest: '../.git/hooks'
				}
			}
		}
	});
//	post-merge
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-ng-annotate');

	grunt.registerTask('install', ['bower', 'copy:font-awesome']);
	grunt.registerTask('test', ['build', 'karma:unit']);
	grunt.registerTask('test-phantom', ['build', 'karma:headless']);
	grunt.registerTask('setup', ['clean', 'install', 'build']);

	grunt.registerTask('build', buildTask);

	grunt.registerTask('build-prod', buildProdTask);

	// Default task(s).
	grunt.registerTask('default', ['build', 'watch']);
};