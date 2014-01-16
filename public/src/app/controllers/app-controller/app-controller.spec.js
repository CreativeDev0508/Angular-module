describe("App Controller", function () {
	var scope, controller;

	beforeEach(module("common"));
	beforeEach(module("app"));
	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		controller = $controller("AppController", {
			$scope: scope
		});
	}));

	it("should have properties on the controller scope", function () {
		expect(scope.someValue).toContain("a controller value");
	});
});