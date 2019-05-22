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

	it("should set the url correctly", () => {
		const url = "http://example.com";
		const expected = url;
		const actual = new Route().setUrl(url)._url;

		expect(actual).to.be.equal(expected);
	});

	it("should set one selector correctly", () => {
		const selector = "p.flow-text";
		const expected = [selector];
		const actual = new Route().addSelectorToWaitFor(selector)
			._selectorsToWaitFor;

		expect(actual).to.be.deep.equal(expected);
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
		const url = "http://example.com";
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

	it("should throw an Error if the url does not starts with http://", () => {
		expect(function() {
			new Route().setUrl("example.com");
		}).to.throw(Error);
	});

	it("should throw the correct error message if the url does not starts with http:// or https://", () => {
		const url = "example.com";

		expect(function() {
			new Route().setUrl(url);
		}).to.throw(`the url should starts with http:// or https:// (got: ${url})`);
	});

	it("should throw an error if setting an invalid url", () => {
		expect(function() {
			new Route().setUrl("https://example");
		}).to.throw(Error);
	});

	it("should throw the correct error if setting an invalid url", () => {
		const url = "https://example";

		expect(function() {
			new Route().setUrl(url);
		}).to.throw(`invalid url (got: ${url})`);
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
});
