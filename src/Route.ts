import * as isUrl from "is-url";
import { parse } from "url";

class Route {
	protected _url: string;
	protected _selectorToWaitFor: string;
	protected _selectorsToWaitFor: string[];
	protected _active: boolean;

	public constructor() {
		this._url = "";
		this._selectorToWaitFor = "";
		this._selectorsToWaitFor = [];
		this._active = true;
	}

	/**
	 * Set the desired url to prerender.
	 *
	 * @param {String} url The url to prerender.
	 * @return {Route}
	 * @throws {TypeError}
	 * @throws {Error}
	 * @example
	 * import { Route } from "@khalyomede/prerender";
	 *
	 * const route = new Route();
	 *
	 * route.setUrl("/about");
	 * @since 0.1.0
	 */
	public setUrl(url: string): this {
		this._url = url;

		this._checkUrl();

		return this;
	}

	/**
	 * Erase all previous selectors and add them all.
	 *
	 * @param {Array<String>} selectors The different selectors to use to wait before prerendering the url.
	 * @return {Route}
	 * @throws {TypeError}
	 * @throws {Error}
	 * @example
	 * import { Route } from "@khalyomede/prerender";
	 *
	 * const route = new Route();
	 *
	 * route.setSelectorsToWaitFor(["p.flow-text", "img.materialboxed"]);
	 * @since 0.1.0
	 */
	public setSelectorsToWaitFor(selectors: string[]): this {
		this._selectorsToWaitFor = [];

		for (const selector of selectors) {
			this.addSelectorToWaitFor(selector);
		}

		return this;
	}

	/**
	 * Add a selector to the list of selectors to wait before prerendering the url.
	 *
	 * @param {String} selecto The selector to wait before prerendering the url.
	 * @return {Route}
	 * @throws {TypeError}
	 * @throws {Error}
	 * @example
	 * import { Route } from "@khalyomede/prerender";
	 *
	 * const route = new Route();
	 *
	 * route.addSelectorToWaitFor("button.btn-flat");
	 * @since 0.1.0
	 */
	public addSelectorToWaitFor(selector: string): this {
		this._selectorToWaitFor = selector;

		this._checkSelectorToWaitFor();

		this._selectorsToWaitFor.push(this._selectorToWaitFor);

		return this;
	}

	/**
	 * Returns the url to prerender.
	 *
	 * @return {String}
	 * @example
	 * import { Route } from "@khalyomede/prerender";
	 *
	 * const route = new Route();
	 * const url = route.getUrl();
	 * @since 0.1.0
	 */
	public getUrl(): string {
		return this._url;
	}

	/**
	 * Returns the URL without query strings (useful to save a clean filename).
	 *
	 * @return {String}
	 */
	public getCleanUrl(): string {
		return parse(this._url).pathname;
	}

	/**
	 * Returns the selectors to wait before prerendering the url.
	 *
	 * @return {Array<String>}
	 * @example
	 * import { Route } from "@khalyomede/prerender";
	 *
	 * const route = new Route();
	 * const selectors = route.getSelectorsToWaitFor();
	 * @since 0.1.0
	 */
	public getSelectorsToWaitFor(): string[] {
		return this._selectorsToWaitFor;
	}

	/**
	 * Return true if the Route has some selectors, else returns false.
	 *
	 * @return {Boolean}
	 * @example
	 * import { Route } from "@khalyomede/prerender";
	 *
	 * const route = new Route();
	 *
	 * if (route.hasSelectorsToWaitFor()) {
	 * 	console.log("has selectors");
	 * } else {
	 * 	console.log("has not selectors");
	 * }
	 * @since 0.1.0
	 */
	public hasSelectorsToWaitFor(): boolean {
		return this._selectorsToWaitFor.length !== 0;
	}

	/**
	 * Set the route as active (only active routes are prerendered).
	 *
	 * @return {Route}
	 * @example
	 * import { Route } from "@khalyomede/prerender";
	 *
	 * const route = new Route();
	 *
	 * route.setActive();
	 * @since 0.1.0
	 */
	public setActive(): this {
		this._active = true;

		return this;
	}

	/**
	 * Set the route as inactive (only active routes are prerendered).
	 *
	 * @return {Route}
	 * @example
	 * import { Route } from "@khalyomede/prerender";
	 *
	 * const route = new Route();
	 *
	 * route.setInactive();
	 * @since 0.1.0
	 */
	public setInactive(): this {
		this._active = false;

		return this;
	}

	/**
	 * Get the active state of the route.
	 *
	 * @return {Boolean}
	 * @example
	 * import { Route } from "@khalyomede/prerender";
	 *
	 * const route = new Route();
	 * const activeState = route.getActiveState();
	 * @since 0.1.0
	 */
	public getActiveState(): boolean {
		return this._active;
	}

	/**
	 * @throws {TypeError}
	 * @throws {Error}
	 */
	protected _checkUrl(): void {
		const typeOfUrl = typeof this._url;

		if (typeOfUrl !== "string") {
			throw new TypeError(`the url should be a string (got: ${typeOfUrl})`);
		}

		if (this._url.trim().length === 0) {
			throw new Error("the url should be filled");
		}

		if (isUrl(this._url)) {
			throw new Error(
				"do not use an url but only specify the route (and use Prerendering.setBaseUrl() to pass your base url instead)"
			);
		}
	}

	/**
	 * @throws {TypeError}
	 * @throws {Error}
	 */
	protected _checkSelectorToWaitFor(): void {
		const typeOfSelectorToWaitFor = typeof this._selectorToWaitFor;

		if (typeOfSelectorToWaitFor !== "string") {
			throw new TypeError(
				`the selector to wait for should be a string (got: ${typeOfSelectorToWaitFor})`
			);
		}

		if (this._selectorToWaitFor.trim().length === 0) {
			throw new Error("the selector to wait for should be filled");
		}
	}
}

export default Route;
