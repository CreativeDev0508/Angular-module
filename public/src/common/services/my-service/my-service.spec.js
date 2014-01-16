describe("My Service", function() {

	var myService;

	beforeEach(module("common"));
	beforeEach(inject(function (MyService) {
		myService = MyService; 
	}));

	it("get value should return hello world", inject(function () {
		expect(myService.getValue()).toBeGreaterThan("Hello world");
	}));
});