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

	it("should initialize the debug mode to false", () => {
		const expected = false;
		const actual = new Prerendering()._debugMode;

		expect(actual).to.be.equal(expected);
	});

	it("should correctly add a route", () => {
		const route = new Route().setUrl("/");
		const expected = [route];
		const actual = new Prerendering().addRoute(route)._routes;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should return a Prerendering instance after adding a route", () => {
		const expected = Prerendering;
		const actual = new Prerendering().addRoute(new Route().setUrl("/"));

		expect(actual).to.be.instanceOf(expected);
	});

	it("should set routes correctly", () => {
		const route1 = new Route().setUrl("/");
		const route2 = new Route().setUrl("/about");
		const routes = [route1, route2];
		const expected = routes;
		const actual = new Prerendering().setRoutes(routes)._routes;

		expect(actual).to.be.deep.equal(expected);
	});

	it("should correctly return the routes", () => {
		const routes = [new Route().setUrl("/"), new Route().setUrl("/about")];
		const expected = routes;
		const actual = new Prerendering().setRoutes(routes).getRoutes();

		expect(actual).to.be.deep.equal(expected);
	});

	it("should erase previously added routes and set the routes correctly", () => {
		const route1 = new Route().setUrl("/");
		const route2 = new Route().setUrl("/about");
		const route3 = new Route().setUrl("/news");
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

	it("should return the correct folder path", () => {
		const folderPath = __dirname + "/../example";
		const expected = folderPath;
		const actual = new Prerendering().setFolderPath(folderPath).getFolderPath();

		expect(actual).to.be.equal(expected);
	});

	it("should correctly set the debug mode", () => {
		const debugMode = true;
		const expected = debugMode;
		const actual = new Prerendering().setDebugMode(debugMode)._debugMode;

		expect(actual).to.be.equal(expected);
	});

	it("should correctly return the debugMode", () => {
		const debugMode = true;
		const expected = true;
		const actual = new Prerendering().setDebugMode(debugMode).getDebugMode();

		expect(actual).to.be.equal(expected);
	});

	it("should return false if the prerendering is not in debug mode", () => {
		const actual = new Prerendering().inDebugMode();

		expect(actual).to.be.false;
	});

	it("should return true if the prerendering is in debug mode", () => {
		const prerendering = new Prerendering();

		prerendering._debugMode = true;

		const actual = prerendering.inDebugMode();

		expect(actual).to.be.true;
	});

	it("should return a promise when starting the prerendering", () => {
		const prerendering = new Prerendering()
			.setBaseUrl("http://example.com")
			.setFolderPath("../example")
			.addRoute(new Route().setUrl("/"));
		const expected = Promise;
		const actual = prerendering.start();

		expect(actual).to.be.instanceOf(expected);
	});

	it("should correctly store the timeout", () => {
		const timeout = 42;
		const expected = timeout;
		const actual = new Prerendering().setTimeout(timeout)._timeout;

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
		}).to.throw(`the route should have an url (use "myRoute.setUrl('/')")`);
	});

	it("should throw an TypeError if setting routes with routes being non instance of Route", () => {
		expect(function() {
			new Prerendering().setRoutes([new Route().setUrl("/"), 42, new Route()]);
		}).to.throw(Error);
	});

	it("should throw the correct message if setting routes with routes being non instance of Route", () => {
		const route = 42;
		const typeOfRoute = typeof route;

		expect(function() {
			new Prerendering().setRoutes([
				new Route().setUrl("/"),
				route,
				new Route()
			]);
		}).to.throw(
			`the route should be an instance of Route (got: ${typeOfRoute})`
		);
	});

	it("should throw an Error if settings routes that do not contains an url", () => {
		expect(() => {
			new Prerendering().setRoutes([new Route().setUrl("/"), new Route()]);
		}).to.throw(Error);
	});

	it("should throw the correct message if settings routes that do not contains an url", () => {
		expect(() => {
			new Prerendering().setRoutes([new Route().setUrl("/"), new Route()]);
		}).to.throw(`the route should have an url (use "myRoute.setUrl('/')")`);
	});

	it("should throw an Error if setting the folder path which is not a string", () => {
		expect(() => {
			new Prerendering().setFolderPath(42);
		}).to.throw(Error);
	});

	it("should throw the correct message if setting the folder path which is not a string", () => {
		const folderPath = 42;
		const typeOfFolderPath = typeof folderPath;

		expect(() => {
			new Prerendering().setFolderPath(folderPath);
		}).to.throw(
			`the folder path should be a string (got: ${typeOfFolderPath})`
		);
	});

	it("should throw an Error if setting the folder path with a file", () => {
		expect(() => {
			new Prerendering().setFolderPath(__dirname + "/../package.json");
		}).to.throw(Error);
	});

	it("should throw the correct message if setting the folder path with a file", () => {
		const filePath = __dirname + "/../package.json";

		expect(() => new Prerendering().setFolderPath(filePath)).to.throw(
			`the folder path should be a directory (got: ${filePath})`
		);
	});

	it("should throw an Error if setting the debug mode with a non boolean", () => {
		expect(() => new Prerendering().setDebugMode(42)).to.throw(Error);
	});

	it("should return the correct message if setting the debug mode with a non boolean", () => {
		const debugMode = 42;
		const typeOfDebugMode = typeof debugMode;

		expect(() => new Prerendering().setDebugMode(debugMode)).to.throw(
			`the debug mode should be a boolean (got: ${typeOfDebugMode})`
		);
	});

	it("should throw an Error if setting a timeout using a non number", () => {
		expect(function() {
			new Prerendering().setTimeout("42");
		}).to.throw(Error);
	});

	it("should throw the correct error if setting a timeout using a non number", () => {
		const timeout = "42";
		const typeOfTimeout = typeof timeout;

		expect(function() {
			new Prerendering().setTimeout(timeout);
		}).to.throw(`the timeout should be a number (got: ${typeOfTimeout})`);
	});

	it("should throw an Error if the timeout is lower than zero", () => {
		expect(function() {
			new Prerendering().setTimeout();
		}).to.throw(Error);
	});

	it("should throw the correct message if the timeout is lower than zero", () => {
		const timeout = -42;

		expect(function() {
			new Prerendering().setTimeout(timeout);
		}).to.throw(`the timeout cannot be lower than 0 (got: ${timeout})`);
	});

	it("should throw an Error if setting a base url with a non string", () => {
		expect(function() {
			new Prerendering().setBaseUrl(42);
		}).to.throw(Error);
	});

	it("should throw the correct message if setting a base url with a non string", () => {
		const baseUrl = 42;
		const typeOfBaseUrl = typeof baseUrl;

		expect(function() {
			new Prerendering().setBaseUrl(baseUrl);
		}).to.throw(`the base url should be a string (got: ${typeOfBaseUrl})`);
	});

	it("should throw an Error if setting the base url with an empty string", () => {
		expect(function() {
			new Prerendering().setBaseUrl("");
		}).to.throw(Error);
	});

	it("should throw the correct message if setting the base url with an empty string", () => {
		expect(function() {
			new Prerendering().setBaseUrl("");
		}).to.throw("the base url should be filled");
	});
});
