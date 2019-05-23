"use strict";
exports.__esModule = true;
var Route_1 = require("./Route");
var fs_1 = require("fs");
var Prerendering = /** @class */ (function () {
    function Prerendering() {
        this._route = null;
        this._routes = [];
        this._folderPath = "";
        this._debugMode = false;
    }
    /**
     * Add a route to prerender.
     *
     * @param {Route} route The Route instance containing the url you want to prerender.
     * @return {Prerendering}
     * @throws {TypeError}
     * @throws {Error}
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
     * @return {Prerender}
     * @throws {TypeError}
     * @throws {Error}
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
     * Return the routes to prerender.
     *
     * @return {Array<Route>}
     */
    Prerendering.prototype.getRoutes = function () {
        return this._routes;
    };
    /**
     * Prerenders the routes by creating a static version and saving them into the desired folder.
     */
    Prerendering.prototype.start = function () {
        this._checkHasFolderPath();
        return this;
    };
    /**
     *
     * @throws {Error}
     */
    Prerendering.prototype.setFolderPath = function (folderPath) {
        this._folderPath = folderPath;
        this._checkFolderPath();
        return this;
    };
    /**
     * Return the folder path.
     *
     * @return {String}
     */
    Prerendering.prototype.getFolderPath = function () {
        return this._folderPath;
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
            throw new Error("the route should have an url (use \"myRoute.setUrl('https://example.com')\")");
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
    return Prerendering;
}());
exports["default"] = Prerendering;
