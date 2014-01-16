angular.module("app").controller("AppController", function ($scope, MyService) {
	$scope.someValue = "a controller value";
	console.log('common service value', MyService.getValue());
});

app.addState("app", {
	url: "",
	templateUrl: "src/app/controllers/app-controller/app-controller.html",
	controller: "AppController"
});