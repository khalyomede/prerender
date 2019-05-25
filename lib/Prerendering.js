"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Route_1 = require("./Route");
var fs_1 = require("fs");
var puppeteer_1 = require("puppeteer");
var prettyMs = require("pretty-ms");
var fancyFormatLog = require("fancy-format-log");
var cliColor = require("cli-color");
var prettyBytes = require("pretty-bytes");
var fs_2 = require("fs");
var path_1 = require("path");
var mkdirp = require("mkdirp");
var Prerendering = /** @class */ (function () {
    function Prerendering() {
        this._route = null;
        this._routes = [];
        this._folderPath = "";
        this._debugMode = false;
        this._baseUrl = "";
        this._logger = fancyFormatLog({
            format: "YYYY-MM-DD HH:mm:ss:ms"
        });
        this._addColorsToCliColor();
    }
    /**
     * Add a route to prerender.
     *
     * @param {Route} route The Route instance containing the url you want to prerender.
     * @return {Prerendering}
     * @throws {TypeError}
     * @throws {Error}
     * @example
     * import { Prerendering, Route } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     *
     * prerendering.addRoute(new Route().setUrl("/"));
     * @since 0.1.0
     */
    Prerendering.prototype.addRoute = function (route) {
        this._route = route;
        this._checkRoute();
        this._routes.push(route);
        return this;
    };
    /**
     * Set multiple routes to prerender.
     *
     * @param {Array<Route>} routes The routes containings the urls your want to prerender.
     * @return {Prerendering}
     * @throws {TypeError}
     * @throws {Error}
     * @example
     * import { Prerendering, Route } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     *
     * prerendering.setRoutes([
     * 	new Route().setUrl("/"),
     * 	new Route().setUrl("/about")
     * ]);
     * @since 0.1.0
     */
    Prerendering.prototype.setRoutes = function (routes) {
        this._routes = [];
        for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
            var route = routes_1[_i];
            this._route = route;
            this.addRoute(route);
        }
        return this;
    };
    /**
     * Set the base url that will be use for each route to prerender.
     *
     * @param {String} baseUrl The base url for each routes.
     * @return {Prerendering}
     * @throws {TypeError}
     * @throws {Error}
     * @example
     * import { Prerendering } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     *
     * prerendering.setBaseUrl("http://example.com");
     * @since 0.1.0
     */
    Prerendering.prototype.setBaseUrl = function (baseUrl) {
        this._baseUrl = baseUrl;
        this._checkBaseUrl();
        return this;
    };
    /**
     * Set the maximum of milliseconds to wait before aborting any navigation or selector waiting when prerendering the routes.
     *
     * @param {Number} timeout The number of milliseconds to wait at each prerendering steps.
     * @return {Prerendering}
     * @throws {TypeError}
     * @throws {Error}
     * @example
     * import { Prerendering } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     *
     * prerendering.setTimeout(10000);
     * @since 0.1.0
     */
    Prerendering.prototype.setTimeout = function (timeout) {
        this._timeout = timeout;
        this._checkTimeout();
        return this;
    };
    /**
     * Return the routes to prerender.
     *
     * @return {Array<Route>}
     * @example
     * import { Prerendering } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     * const routes = prerendering.getRoutes();
     * @since 0.1.0
     */
    Prerendering.prototype.getRoutes = function () {
        return this._routes;
    };
    /**
     * Return the debug mode.
     *
     * @return {Boolean}
     * @example
     * import { Prerendering } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     * const debugMode = prerendering.getDebugMode();
     * @since 0.1.0
     */
    Prerendering.prototype.getDebugMode = function () {
        return this._debugMode;
    };
    /**
     * Returns the base url to use for each routes.
     *
     * @return {String}
     * @example
     * import { Prerendering } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     * const baseUrl = prerendering.getBaseUrl();
     * @since 0.1.0
     */
    Prerendering.prototype.getBaseUrl = function () {
        return this._baseUrl;
    };
    Prerendering.prototype.gettimeout = function () {
        return this._timeout;
    };
    /**
     * Prerenders the routes by creating a static version and saving them into the desired folder.
     *
     * @return {Promise<Prerendering>}
     * @throws {Error}
     * @example
     * import { Prerendering, Route } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     *
     * prerendering.setBaseUrl("http://example.com");
     * prerendering.setFolderPath("./prerendered");
     * prerendering.addRoute(new Route().setUrl("/"));
     * prerendering.start();
     * @since 0.1.0
     */
    Prerendering.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var routes, start, browser, duration, _loop_1, this_1, _i, routes_2, route;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkHasFolderPath();
                        this._checkHasBaseUrl();
                        routes = this._routes.filter(function (route) { return route.getActiveState() === true; });
                        if (this.inDebugMode()) {
                            this._logger.info("opening Chrome...");
                        }
                        start = new Date().getTime();
                        return [4 /*yield*/, puppeteer_1.launch({
                                defaultViewport: {
                                    width: 1920,
                                    height: 1080
                                },
                                args: ["--no-sandbox", "--start-fullscreen"]
                            })];
                    case 1:
                        browser = _a.sent();
                        duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));
                        if (this.inDebugMode()) {
                            this._logger.info("opened Chrome (" + duration + ")");
                        }
                        _loop_1 = function (route) {
                            var routeUrl, coloredRouteUrl, contentPath, coloredContentPath, contentFolderPath, timeout, page, exception_1, selectors, coloredSelectorsCount, selectorsToWaitFor, exception_2, html, coloredBytes;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        routeUrl = this_1.getBaseUrl() + route.getUrl();
                                        coloredRouteUrl = cliColor.green(routeUrl);
                                        contentPath = this_1.getFolderPath() +
                                            route.getCleanUrl().replace(/^\/$/, "") +
                                            "/index.html";
                                        coloredContentPath = cliColor.green(contentPath);
                                        contentFolderPath = path_1.dirname(contentPath);
                                        timeout = this_1.gettimeout();
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.info("opening a tab...");
                                        }
                                        start = new Date().getTime();
                                        return [4 /*yield*/, browser.newPage()];
                                    case 1:
                                        page = _a.sent();
                                        duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.info("opened a tab (" + duration + ")");
                                            this_1._logger.info("navigating to " + coloredRouteUrl + "...");
                                        }
                                        start = new Date().getTime();
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, page.goto(routeUrl, {
                                                timeout: timeout
                                            })];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        exception_1 = _a.sent();
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.error(exception_1);
                                        }
                                        return [2 /*return*/, "continue"];
                                    case 5:
                                        duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.info("successfully navigated (" + duration + ")");
                                        }
                                        if (!route.hasSelectorsToWaitFor()) return [3 /*break*/, 10];
                                        selectors = route.getSelectorsToWaitFor();
                                        coloredSelectorsCount = cliColor.orange(selectors.length);
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.info("waiting for " + coloredSelectorsCount + " selectors...");
                                        }
                                        start = new Date().getTime();
                                        selectorsToWaitFor = selectors.map(function (selector) {
                                            return page.waitFor(selector, {
                                                timeout: timeout
                                            });
                                        });
                                        _a.label = 6;
                                    case 6:
                                        _a.trys.push([6, 8, , 9]);
                                        return [4 /*yield*/, Promise.all(selectorsToWaitFor)];
                                    case 7:
                                        _a.sent();
                                        return [3 /*break*/, 9];
                                    case 8:
                                        exception_2 = _a.sent();
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.error(exception_2);
                                        }
                                        return [2 /*return*/, "continue"];
                                    case 9:
                                        duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.info("found the selectors (" + duration + ")");
                                        }
                                        _a.label = 10;
                                    case 10:
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.info("copying the HTML...");
                                        }
                                        start = new Date().getTime();
                                        return [4 /*yield*/, page.content()];
                                    case 11:
                                        html = _a.sent();
                                        coloredBytes = cliColor.orange(prettyBytes(html.length));
                                        duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.info("copied " + coloredBytes + " of HTML (" + duration + ")");
                                            this_1._logger.info("saving into " + coloredContentPath + "...");
                                        }
                                        start = new Date().getTime();
                                        mkdirp.sync(contentFolderPath);
                                        fs_2.writeFileSync(contentPath, html);
                                        duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));
                                        if (this_1.inDebugMode()) {
                                            this_1._logger.info("saved the file (" + duration + ")");
                                            this_1._logger.info("closing the tab...");
                                            start = new Date().getTime();
                                        }
                                        return [4 /*yield*/, page.close()];
                                    case 12:
                                        _a.sent();
                                        if (this_1.inDebugMode()) {
                                            duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));
                                            this_1._logger.info("closed the tab (" + duration + ")");
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, routes_2 = routes;
                        _a.label = 2;
                    case 2:
                        if (!(_i < routes_2.length)) return [3 /*break*/, 5];
                        route = routes_2[_i];
                        return [5 /*yield**/, _loop_1(route)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (this.inDebugMode()) {
                            this._logger.info("closing Chrome...");
                        }
                        start = new Date().getTime();
                        return [4 /*yield*/, browser.close()];
                    case 6:
                        _a.sent();
                        duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));
                        if (this.inDebugMode()) {
                            this._logger.info("closed Chrome (" + duration + ")");
                        }
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Set the folder path destination where all the prerendered routes will be saved.
     *
     * @param {String} folderPath The folder path where all the prerendered routes will be saved.
     * @throws {TypeError}
     * @throws {Error}
     * @example
     * import { Prerendering } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     *
     * prerendering.setFolderPath("./prerendered");
     * @since 0.1.0
     */
    Prerendering.prototype.setFolderPath = function (folderPath) {
        this._folderPath = folderPath;
        this._checkFolderPath();
        return this;
    };
    /**
     * Set the debug mode (if true, will display information on console).
     *
     * @param {Boolean} debugMode The debug mode.
     * @return {Prerendering}
     * @throws {TypeError}
     * @throws {Error}
     * @example
     * import { Prerendering } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     *
     * prerendering.setDebugMode(true);
     * @since 0.1.0
     */
    Prerendering.prototype.setDebugMode = function (debugMode) {
        this._debugMode = debugMode;
        this._checkDebugMode();
        return this;
    };
    /**
     * Return the folder path.
     *
     * @return {String}
     * @example
     * import { Prerendering } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     * const folderPath = prerendering.getFolderPath();
     * @since 0.1.0
     */
    Prerendering.prototype.getFolderPath = function () {
        return this._folderPath;
    };
    /**
     * Returns true if the prerendering has been set in debug mode, else returns false.
     *
     * @return {Boolean}
     * @example
     * import { Prerendering } from "@khalyomede/prerender";
     *
     * const prerendering = new Prerendering();
     *
     * if (prerendering.inDebugMode()) {
     * 	console.log("prerendering not in debug mode");
     * } else {
     * 	console.log("prerendering in debug mode");
     * }
     * @since 0.1.0
     */
    Prerendering.prototype.inDebugMode = function () {
        return this._debugMode === true;
    };
    /**
     * @throws {TypError}
     * @throws {Error}
     */
    Prerendering.prototype._checkRoute = function () {
        var typeOfRoute = typeof this._route;
        if (!(this._route instanceof Route_1["default"])) {
            throw new TypeError("the route should be an instance of Route (got: " + typeOfRoute + ")");
        }
        if (this._route.getUrl().trim().length === 0) {
            throw new Error("the route should have an url (use \"myRoute.setUrl('/')\")");
        }
    };
    /**
     * @throws {Error}
     */
    Prerendering.prototype._checkFolderPath = function () {
        var typeOfFolderPath = typeof this._folderPath;
        if (typeOfFolderPath !== "string") {
            throw new TypeError("the folder path should be a string (got: " + typeOfFolderPath + ")");
        }
        if (fs_1.existsSync(this._folderPath) &&
            !fs_1.statSync(this._folderPath).isDirectory()) {
            throw new Error("the folder path should be a directory (got: " + this._folderPath + ")");
        }
    };
    Prerendering.prototype._checkHasFolderPath = function () {
        if (this._folderPath.trim().length === 0) {
            throw new Error("no folder path found (did you forget to use Prerendering.setFolderPath() ?)");
        }
    };
    Prerendering.prototype._checkHasBaseUrl = function () {
        if (this._baseUrl.trim().length === 0) {
            throw new Error("not base url found (did you forget to use Prerendering.setBaseUrl() ?)");
        }
    };
    /**
     * @throws {TypeError}
     */
    Prerendering.prototype._checkDebugMode = function () {
        var typeOfDebugMode = typeof this._debugMode;
        if (typeOfDebugMode !== "boolean") {
            throw new TypeError("the debug mode should be a boolean (got: " + typeOfDebugMode + ")");
        }
    };
    Prerendering.prototype._checkBaseUrl = function () {
        var typeOfBaseUrl = typeof this._baseUrl;
        if (typeOfBaseUrl !== "string") {
            throw new TypeError("the base url should be a string (got: " + typeOfBaseUrl + ")");
        }
        if (this._baseUrl.trim().length === 0) {
            throw new Error("the base url should be filled");
        }
    };
    Prerendering.prototype._checkTimeout = function () {
        var typeOfTimeout = typeof this._timeout;
        if (typeOfTimeout !== "number") {
            throw new TypeError("the timeout should be a number (got: " + typeOfTimeout + ")");
        }
        if (this._timeout < 0) {
            throw new Error("the timeout cannot be lower than 0 (got: " + this._timeout + ")");
        }
    };
    Prerendering.prototype._addColorsToCliColor = function () {
        cliColor.orange = cliColor.xterm(203);
    };
    return Prerendering;
}());
exports["default"] = Prerendering;
