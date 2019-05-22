import { expect } from "chai";
import { Prerendering, Route } from "../lib/main";

describe("prerendering", () => {
	it("should initialize the routes to an empty array", () => {
		const expected = [];
		const actual = new Prerendering()._routes;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should initialize the route to null", () => {
		const expected = null;
		const actual = new Prerendering()._route;

		expect(actual).to.be.equal(expected);
	});

	it("should initialize the folder path to an empty string", () => {
		const expected = "";
		const actual = new Prerendering()._folderPath;

		expect(actual).to.be.equal(expected);
	});

	it("should correctly add a route", () => {
		const route = new Route().setUrl("http://example.com");
		const expected = [route];
		const actual = new Prerendering().addRoute(route)._routes;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should set routes correctly", () => {
		const route1 = new Route().setUrl("http://example.com");
		const route2 = new Route().setUrl("http://example.com/about");
		const routes = [route1, route2];
		const expected = routes;
		const actual = new Prerendering().setRoutes(routes)._routes;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should erase previously added routes and set the routes correctly", () => {
		const route1 = new Route().setUrl("http://example.com");
		const route2 = new Route().setUrl("http://example.com/about");
		const route3 = new Route().setUrl("http://example.com/news");
		const routes = [route2, route3];
		const expected = routes;
		const actual = new Prerendering().addRoute(route1).setRoutes(routes)
			._routes;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should correctly set the folder path", () => {
		const folderPath = __dirname + "/../example";
		const expected = folderPath;
		const actual = new Prerendering().setFolderPath(folderPath)._folderPath;

		expect(actual).to.be.equal(expected);
	});

	it("should throw an error if adding a route with a non Route instance", () => {
		expect(function() {
			new Prerendering().addRoute(42);
		}).to.throw(Error);
	});

	it("should throw the correct message if adding a route with a non Route instance", () => {
		const route = {};
		const typeOfRoute = typeof route;

		expect(function() {
			new Prerendering().addRoute(route);
		}).to.throw(
			`the route should be an instance of Route (got: ${typeOfRoute})`
		);
	});

	it("should throw an exception if adding a route without an url", () => {
		expect(function() {
			new Prerendering().addRoute(new Route());
		}).to.throw(Error);
	});

	it("should throw the correct message if adding a route without an url", () => {
		expect(function() {
			new Prerendering().addRoute(new Route());
		}).to.throw(
			`the route should have an url (use "myRoute.setUrl('https://example.com')")`
		);
	});

	it("should throw an TypeError if setting routes with routes being non instance of Route", () => {
		expect(function() {
			new Prerendering().setRoutes([
				new Route().setUrl("http://example.com"),
				42,
				new Route()
			]);
		}).to.throw(Error);
	});

	it("should throw the correct message if setting routes with routes being non instance of Route", () => {
		const route = 42;
		const typeOfRoute = typeof route;

		expect(function() {
			new Prerendering().setRoutes([
				new Route().setUrl("http://example.com"),
				route,
				new Route()
			]);
		}).to.throw(
			`the route should be an instance of Route (got: ${typeOfRoute})`
		);
	});

	it("should throw an Error if settings routes that do not contains an url", () => {
		expect(function() {
			new Prerendering().setRoutes([
				new Route().setUrl("http://example.com"),
				new Route()
			]);
		}).to.throw(Error);
	});

	it("should throw the correct message if settings routes that do not contains an url", () => {
		expect(function() {
			new Prerendering().setRoutes([
				new Route().setUrl("http://example.com"),
				new Route()
			]);
		}).to.throw(
			`the route should have an url (use "myRoute.setUrl('https://example.com')")`
		);
	});

	it("should throw an Error if setting the folder path which is not a string", () => {
		expect(function() {
			new Prerendering().setFolderPath(42);
		}).to.throw(Error);
	});

	it("should throw the correct message if setting the folder path which is not a string", () => {
		const folderPath = 42;
		const typeOfFolderPath = typeof folderPath;

		expect(function() {
			new Prerendering().setFolderPath(folderPath);
		}).to.throw(
			`the folder path should be a string (got: ${typeOfFolderPath})`
		);
	});

	it("should throw an Error if setting the folder path with a file", () => {
		expect(function() {
			new Prerendering().setFolderPath(__dirname + "/../package.json");
		}).to.throw(Error);
	});

	it("should throw the correct message if setting the folder path with a file", () => {
		const filePath = __dirname + "/../package.json";

		expect(function() {
			new Prerendering().setFolderPath(filePath);
		}).to.throw(`the folder path should be a directory (got: ${filePath})`);
	});
});
