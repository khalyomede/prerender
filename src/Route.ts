import * as isUrl from "is-url";

class Route {
	protected _url: string;
	protected _selectorToWaitFor: string;
	protected _selectorsToWaitFor: string[];

	public constructor() {
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
	 */
	public getUrl(): string {
		return this._url;
	}

	/**
	 * Returns the selectors to wait before prerendering the url.
	 *
	 * @return {Array<String>}
	 */
	public getSelectorsToWaitFor(): string[] {
		return this._selectorsToWaitFor;
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

		if (!this._url.startsWith("http://") && !this._url.startsWith("https://")) {
			throw new Error(
				`the url should starts with http:// or https:// (got: ${this._url})`
			);
		}

		if (!isUrl(this._url)) {
			throw new TypeError(`invalid url (got: ${this._url})`);
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
