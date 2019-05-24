import { expect } from "chai";
import { Route } from "../lib/main";

describe("Route", () => {
	it("should initialize the protected url property correctly", () => {
		const expected = "";
		const actual = new Route()._url;

		expect(actual).to.be.equal(expected);
	});

	it("should initialize the protected selectorToWaitFor correctly", () => {
		const expected = "";
		const actual = new Route()._selectorToWaitFor;

		expect(actual).to.be.equal(expected);
	});

	it("should initialize the protected selectorsToWaitFor correctly", () => {
		const expected = [];
		const actual = new Route()._selectorsToWaitFor;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should initialize the active state of the route to true", () => {
		const actual = new Route()._active;

		expect(actual).to.be.true;
	});

	it("should set the url correctly", () => {
		const url = "/";
		const expected = url;
		const actual = new Route().setUrl(url)._url;

		expect(actual).to.be.equal(expected);
	});

	it("should return an instance of Route after setting an url", () => {
		const expected = Route;
		const actual = new Route().setUrl("/");

		expect(actual).to.be.instanceOf(expected);
	});

	it("should set one selector correctly", () => {
		const selector = "p.flow-text";
		const expected = [selector];
		const actual = new Route().addSelectorToWaitFor(selector)
			._selectorsToWaitFor;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should return an instance of Route when adding a selector to wait for", () => {
		const expected = Route;
		const actual = new Route().addSelectorToWaitFor("p.flow-text");

		expect(actual).to.be.instanceOf(expected);
	});

	it("should add multiple selectors correctly", () => {
		const selector1 = "p.flow-text";
		const selector2 = "img.materialboxed";
		const expected = [selector1, selector2];
		const actual = new Route()
			.addSelectorToWaitFor(selector1)
			.addSelectorToWaitFor(selector2)._selectorsToWaitFor;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should return an instance of Route after setting routes", () => {
		const expected = Route;
		const actual = new Route().setSelectorsToWaitFor([
			"p.flow-text",
			"img.materialboxed"
		]);

		expect(actual).to.be.instanceOf(expected);
	});

	it("should set multiples selectors correctly", () => {
		const selectors = ["p.flow-text", "img.materialboxed"];
		const expected = selectors;
		const actual = new Route().setSelectorsToWaitFor(selectors)
			._selectorsToWaitFor;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should set multiples selectors and add a selector correctly", () => {
		const selector = "p.flow-text";
		const selectors = ["img.materialboxed", "button.btn-flat"];
		const expected = [...selectors, selector];
		const actual = new Route()
			.setSelectorsToWaitFor(selectors)
			.addSelectorToWaitFor(selector)._selectorsToWaitFor;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should erase all selectors when setting them in batch", () => {
		const selector = "p.flow-text";
		const selectors = ["img.materialboxed", "button.btn-flat"];
		const expected = selectors;
		const route = new Route();

		route.addSelectorToWaitFor(selector);

		const actual = route.setSelectorsToWaitFor(selectors)._selectorsToWaitFor;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should return the correct url", () => {
		const url = "/";
		const expected = url;
		const actual = new Route().setUrl(url).getUrl();

		expect(actual).to.be.equal(expected);
	});

	it("should return the correct selectors as an array", () => {
		const selectors = ["p.flow-text", "img.materialboxed"];
		const expected = selectors;
		const actual = new Route()
			.setSelectorsToWaitFor(selectors)
			.getSelectorsToWaitFor();

		expect(actual).to.be.deep.equal(expected);
	});

	it("should return true if the route has some selectors", () => {
		const actual = new Route()
			.addSelectorToWaitFor("p.flow-text")
			.hasSelectorsToWaitFor();

		expect(actual).to.be.true;
	});

	it("should return false if the route does not have any selectors", () => {
		const actual = new Route().hasSelectorsToWaitFor();

		expect(actual).to.be.false;
	});

	it("should return the same url if it has no query string", () => {
		const url = "/shoes";
		const expected = url;
		const actual = new Route().setUrl(url).getCleanUrl();

		expect(actual).to.be.equal(expected);
	});

	it("should return the url without query string if it has query string", () => {
		const expected = "/shoes";
		const actual = new Route()
			.setUrl("/shoes?page=42&sort=price")
			.getCleanUrl();

		expect(actual).to.be.equal(expected);
	});

	it("should return the url without hash queries if it has has queries", () => {
		const expected = "/shoes";
		const actual = new Route()
			.setUrl("/shoes#page=42&sort=price")
			.getCleanUrl();

		expect(actual).to.be.equal(expected);
	});

	it("should return the url without hash queries and without query strings if it has both", () => {
		const expected = "/shoes";
		const actual = new Route()
			.setUrl("/shoes?page=42&sort=price#view=tree&model=shoes.shoes")
			.getCleanUrl();

		expect(actual).to.be.equal(expected);
	});

	it("should throw a TypeError if setting an url which is not a string", () => {
		expect(function() {
			new Route().setUrl(42);
		}).to.throw(TypeError);
	});

	it("should throw the correct message if setting an url which is not a string", () => {
		const url = 42;
		const typeOfUrl = typeof url;

		expect(function() {
			new Route().setUrl(url);
		}).to.throw(`the url should be a string (got: ${typeOfUrl})`);
	});

	it("should throw an Error if setting an empty url", () => {
		expect(function() {
			new Route().setUrl("");
		}).to.throw(Error);
	});

	it("should throw the correct error message if setting an empty url", () => {
		expect(function() {
			new Route().setUrl("");
		}).to.throw("the url should be filled");
	});

	it("should throw an error if adding a selector which is not string", () => {
		expect(function() {
			new Route().addSelectorToWaitFor(42);
		}).to.throw(TypeError);
	});

	it("should throw the correct message if adding a selector which is not a string", () => {
		const selector = 42;
		const typeOfSelector = typeof selector;

		expect(function() {
			new Route().addSelectorToWaitFor(selector);
		}).to.throw(
			`the selector to wait for should be a string (got: ${typeOfSelector})`
		);
	});

	it("should throw an error if adding an empty selector", () => {
		expect(function() {
			new Route().addSelectorToWaitFor("");
		}).to.throw(Error);
	});

	it("should throw the correct message if adding an empty selector", () => {
		expect(function() {
			new Route().addSelectorToWaitFor("");
		}).to.throw("the selector to wait for should be filled");
	});

	it("should throw an error if setting selectors which are not all string", () => {
		expect(function() {
			new Route().setSelectorsToWaitFor(["p.flow-text", 42, "button.btn-flat"]);
		}).to.throw(Error);
	});

	it("should throw the correct error message if settings selectors which are not all strings", () => {
		const selector = 42;
		const typeOfSelector = typeof selector;

		expect(function() {
			new Route().setSelectorsToWaitFor([
				"p.flow-text",
				selector,
				"button.btn-flat"
			]);
		}).to.throw(
			`the selector to wait for should be a string (got: ${typeOfSelector})`
		);
	});

	it("should correctly set the route as active", () => {
		const actual = new Route().setActive()._active;

		expect(actual).to.be.true;
	});

	it("should correctly set the route as inactive", () => {
		const actual = new Route().setInactive()._active;

		expect(actual).to.be.false;
	});

	it("should correctly get the route active state", () => {
		const actual = new Route().getActiveState();

		expect(actual).to.be.true;
	});

	it("should throw an error if setting some empty selectors", () => {
		expect(function() {
			new Route().setSelectorsToWaitFor(["p.flow-text", "", "button.btn-flat"]);
		}).to.throw(Error);
	});

	it("should throw the correct error message if settings some empty selectors", () => {
		expect(function() {
			new Route().setSelectorsToWaitFor(["p.flow-text", "", "button.btn-flat"]);
		}).to.throw("the selector to wait for should be filled");
	});

	it("should throw an Error if the url is... a proper url", () => {
		expect(function() {
			new Route().setUrl("http://example.com");
		}).to.throw(Error);
	});

	it("should throw the correct message if the url is... a proper url", () => {
		expect(function() {
			new Route().setUrl("http://example.com");
		}).to.throw(
			"do not use an url but only specify the route (and use Prerendering.setBaseUrl() to pass your base url instead)"
		);
	});
});
