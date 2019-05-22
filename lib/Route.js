"use strict";
exports.__esModule = true;
var isUrl = require("is-url");
var Route = /** @class */ (function () {
    function Route() {
        this._url = "";
        this._selectorToWaitFor = "";
        this._selectorsToWaitFor = [];
    }
    /**
     * Set the desired url to prerender.
     *
     * @param {String} url The url to prerender.
     * @return {Route}
     * @throws {TypeError}
     * @throws {Error}
     */
    Route.prototype.setUrl = function (url) {
        this._url = url;
        this._checkUrl();
        return this;
    };
    /**
     * Erase all previous selectors and add them all.
     *
     * @param {Array<String>} selectors The different selectors to use to wait before prerendering the url.
     * @return {Route}
     * @throws {TypeError}
     * @throws {Error}
     */
    Route.prototype.setSelectorsToWaitFor = function (selectors) {
        this._selectorsToWaitFor = [];
        for (var _i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
            var selector = selectors_1[_i];
            this.addSelectorToWaitFor(selector);
        }
        return this;
    };
    /**
     * Add a selector to the list of selectors to wait before prerendering the url.
     *
     * @param {String} selecto The selector to wait before prerendering the url.
     * @return {Route}
     * @throws {TypeError}
     * @throws {Error}
     */
    Route.prototype.addSelectorToWaitFor = function (selector) {
        this._selectorToWaitFor = selector;
        this._checkSelectorToWaitFor();
        this._selectorsToWaitFor.push(this._selectorToWaitFor);
        return this;
    };
    /**
     * Returns the url to prerender.
     *
     * @return {String}
     */
    Route.prototype.getUrl = function () {
        return this._url;
    };
    /**
     * Returns the selectors to wait before prerendering the url.
     *
     * @return {Array<String>}
     */
    Route.prototype.getSelectorsToWaitFor = function () {
        return this._selectorsToWaitFor;
    };
    /**
     * @throws {TypeError}
     * @throws {Error}
     */
    Route.prototype._checkUrl = function () {
        var typeOfUrl = typeof this._url;
        if (typeOfUrl !== "string") {
            throw new TypeError("the url should be a string (got: " + typeOfUrl + ")");
        }
        if (this._url.trim().length === 0) {
            throw new Error("the url should be filled");
        }
        if (!this._url.startsWith("http://") && !this._url.startsWith("https://")) {
            throw new Error("the url should starts with http:// or https:// (got: " + this._url + ")");
        }
        if (!isUrl(this._url)) {
            throw new TypeError("invalid url (got: " + this._url + ")");
        }
    };
    /**
     * @throws {TypeError}
     * @throws {Error}
     */
    Route.prototype._checkSelectorToWaitFor = function () {
        var typeOfSelectorToWaitFor = typeof this._selectorToWaitFor;
        if (typeOfSelectorToWaitFor !== "string") {
            throw new TypeError("the selector to wait for should be a string (got: " + typeOfSelectorToWaitFor + ")");
        }
        if (this._selectorToWaitFor.trim().length === 0) {
            throw new Error("the selector to wait for should be filled");
        }
    };
    return Route;
}());
exports["default"] = Route;
