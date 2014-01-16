describe('cdn', function() {
	browser.get('http://localhost:8080/#/docs/cdn');

	var ptor = protractor.getInstance();
	var extensions = element.all(by.repeater('ext in extensions'));;

	it('Should load the main cdn page', function() {
		var heading = element(by.css('h1'));
		expect(heading.getText()).toEqual('Using the CDN');
		expect(extensions.count()).toBe(4);
	});

	it('Should filter the cdn resources', function() {
		var query = element(by.model('filter'));
		query.sendKeys('css');

		var internal = element.all(by.repeater('link in internal'));
		var nonSrc = element.all(by.repeater('link in nonSrc'));
		var external = element.all(by.repeater('link in external'));

		expect(internal.count()).toEqual(2);
		expect(internal.get(0).getText()).toEqual('http://cdn.simplifile.com/latest/build/common/common.css');
		expect(internal.get(1).getText()).toEqual('http://cdn.simplifile.com/latest/build/dynamic/dynamic.css');

		expect(nonSrc.count()).toEqual(0);

		expect(external.count()).toEqual(4);
		expect(external.get(0).getText()).toEqual('http://cdn.simplifile.com/latest/lib/font-awesome/css/font-awesome.css');
		expect(external.get(3).getText()).toEqual('http://cdn.simplifile.com/latest/lib/pure-built/pure-min.css');
	});

	it('Should navigate to project setup', function() {
		extensions.get(1).findElement(by.css('li')).click();
		ptor.waitForAngular();
		var heading = element(by.css('h1'));
		expect(heading.getText()).toEqual('Project Setup');
	});

	it('Should navigate to dynamic data', function() {
		extensions.get(2).findElement(by.css('li')).click();
		ptor.waitForAngular();
		var heading = element(by.css('h1'));
		expect(heading.getText()).toEqual('Dynamic Data');
	});

	it('Should navigate to common', function() {
		extensions.get(3).findElement(by.css('li')).click();
		ptor.waitForAngular();
		var heading = element(by.css('h1'));
		expect(heading.getText()).toEqual('Common');
	});
});