angular-module-setup
====================

An example repository for a modular way of building a large angular app. The primary purpose of this project is to demo an automated way in which modules can be separated and loaded on demand. This can primarily be useful for loading separate extensions based upon permissions in a large scale app.

# Setup
Run `npm install` to initially set the project up. The following grunt tasks are available:

 - `setup` - Running the setup task will clean the project, load libraries from bower, and build the app.
 - `install` - Install external dependencies from bower.
 - `build` - Build the app for development
 - `build-prod` - Build the app for production
 - `test` - Run karma unit tests
 - `test-phantom` - Run the karma unit tests headlessly
 - `watch` [default] - Rebuild the project as files change

# Directory Structure

Start a static webserver (node-static) within the public directory to see the sample app run. The source is stored within `public/src`. Each directory within this folder represents
 a separate angular module which be built and compiled down to separate files. The `public/build` directory is mirrored with the `public/src` directory except that it contains a primary built JavaScript and CSS file for the entire module which can be loaded into the browser. Every JavaScript file in each module, excluding files that end in `.spec.js` will get compiled into the built files. Likewise, every LESS file will get compiled into a single CSS file for each module.

The project includes multiple Grunt plugins for making Angular develoment easier including:

 - grunt-html2js - All html templateUrl references will automatically become a part of the built js files
 - grunt-ng-annotate - Running `grunt build-prod` will build minified and mangled built files that automatically are annotated correctly so that dependency injection isn't broken.
 - grunt-notify - Desktop notifications when builds fail.
 - grunt-karma - Unit tests with code coverage enabled.