describe("My Directive", function() {

	var el, scope;

	beforeEach(module('common'));
	beforeEach(module('templates-common'));

	beforeEach(inject(function($rootScope, $compile) {

		el = angular.element(
			'<div>' +
				'<my-directive label="Hello World"></sf-combo-button>' +
			'</div>'
		);

		scope = $rootScope.$new();
		$compile(el)(scope);
		scope.$digest();
	}));

	it("should render the label", function() {
		expect(el.find('.my-directive').text().trim()).toBe('Hello World');
	});
});