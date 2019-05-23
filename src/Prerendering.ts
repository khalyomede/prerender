import Route from "./Route";
import { existsSync, statSync } from "fs";
import { launch } from "puppeteer";
import * as prettyMs from "pretty-ms";
import { info, error } from "fancy-log";
import * as cliColor from "cli-color";
import * as prettyBytes from "pretty-bytes";
import { writeFileSync } from "fs";
import { dirname } from "path";
import * as mkdirp from "mkdirp";

class Prerendering {
	protected _route: Route;
	protected _routes: Route[];
	protected _folderPath: string;
	protected _debugMode: boolean;
	protected _baseUrl: string;
	protected _timeout: number;

	public constructor() {
		this._route = null;
		this._routes = [];
		this._folderPath = "";
		this._debugMode = false;
		this._baseUrl = "";
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
	public addRoute(route: Route): this {
		this._route = route;

		this._checkRoute();

		this._routes.push(route);

		return this;
	}

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
	public setRoutes(routes: Route[]): this {
		this._routes = [];

		for (const route of routes) {
			this._route = route;

			this.addRoute(route);
		}

		return this;
	}

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
	public setBaseUrl(baseUrl: string): this {
		this._baseUrl = baseUrl;

		this._checkBaseUrl();

		return this;
	}

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
	 */
	public setTimeout(timeout: number): this {
		this._timeout = timeout;

		this._checkTimeout();

		return this;
	}

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
	public getRoutes(): Route[] {
		return this._routes;
	}

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
	public getDebugMode(): boolean {
		return this._debugMode;
	}

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
	public getBaseUrl(): string {
		return this._baseUrl;
	}

	public gettimeout(): number {
		return this._timeout;
	}

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
	public async start(): Promise<this> {
		this._checkHasFolderPath();

		if (this.inDebugMode()) {
			info("opening Chrome...");
		}

		let start = new Date().getTime();

		const browser = await launch({
			defaultViewport: {
				width: 1920,
				height: 1080
			},
			args: ["--no-sandbox", "--start-fullscreen"]
		});

		let duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));

		if (this.inDebugMode()) {
			info(`opened Chrome (${duration})`);
		}

		for (const route of this._routes) {
			const routeUrl = this.getBaseUrl() + route.getUrl();
			const coloredRouteUrl = cliColor.yellow(routeUrl);
			const contentPath =
				this.getFolderPath() + "/" + route.getUrl() + "/index.html";
			const timeout = this.gettimeout();

			if (this.inDebugMode()) {
				info("opening a tab...");
			}

			start = new Date().getTime();

			const page = await browser.newPage();

			duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));

			if (this.inDebugMode()) {
				info(`opened a tab (${duration})`);
				info(`navigating to ${coloredRouteUrl}...`);
			}

			start = new Date().getTime();

			try {
				await page.goto(routeUrl, {
					timeout: timeout
				});
			} catch (exception) {
				if (this.inDebugMode()) {
					error(exception);
				}

				continue;
			}

			duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));

			if (this.inDebugMode()) {
				info(`navigated to ${coloredRouteUrl} (${duration})`);
			}

			if (route.hasSelectorsToWaitFor()) {
				const selectors = route.getSelectorsToWaitFor();

				if (this.inDebugMode()) {
					info(`waiting for ${selectors.length} selectors...`);
				}

				start = new Date().getTime();

				const selectorsToWaitFor = selectors.map(selector =>
					page.waitFor(selector, {
						timeout: timeout
					})
				);

				try {
					await Promise.all(selectorsToWaitFor);
				} catch (exception) {
					if (this.inDebugMode()) {
						error(exception);
					}

					continue;
				}

				duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));

				if (this.inDebugMode()) {
					info(`found the selectors (${duration})`);
				}
			}

			if (this.inDebugMode()) {
				info("copying the HTML...");
			}

			start = new Date().getTime();

			const html = await page.content();
			const bytes = prettyBytes(html.length);

			duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));

			if (this.inDebugMode()) {
				info(`copied ${bytes} of HTML (${duration})`);
				info(`saving to file...`);
			}

			start = new Date().getTime();

			mkdirp.sync(dirname(contentPath));
			writeFileSync(contentPath, html);

			duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));

			if (this.inDebugMode()) {
				info(`saved the file (${duration})`);
			}
		}

		if (this.inDebugMode()) {
			info("closing Chrome...");
		}

		start = new Date().getTime();

		await browser.close();

		duration = cliColor.blackBright(prettyMs(new Date().getTime() - start));

		if (this.inDebugMode()) {
			info(`closed Chrome (${duration})`);
		}

		return this;
	}

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
	public setFolderPath(folderPath: string): this {
		this._folderPath = folderPath;

		this._checkFolderPath();

		return this;
	}

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
	public setDebugMode(debugMode: boolean): this {
		this._debugMode = debugMode;

		this._checkDebugMode();

		return this;
	}

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
	public getFolderPath(): string {
		return this._folderPath;
	}

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
	protected inDebugMode(): boolean {
		return this._debugMode === true;
	}

	/**
	 * @throws {TypError}
	 * @throws {Error}
	 */
	protected _checkRoute(): void {
		const typeOfRoute = typeof this._route;

		if (!(this._route instanceof Route)) {
			throw new TypeError(
				`the route should be an instance of Route (got: ${typeOfRoute})`
			);
		}

		if (this._route.getUrl().trim().length === 0) {
			throw new Error(
				`the route should have an url (use "myRoute.setUrl('/')")`
			);
		}
	}

	/**
	 * @throws {Error}
	 */
	protected _checkFolderPath(): void {
		const typeOfFolderPath = typeof this._folderPath;

		if (typeOfFolderPath !== "string") {
			throw new TypeError(
				`the folder path should be a string (got: ${typeOfFolderPath})`
			);
		}

		if (
			existsSync(this._folderPath) &&
			!statSync(this._folderPath).isDirectory()
		) {
			throw new Error(
				`the folder path should be a directory (got: ${this._folderPath})`
			);
		}
	}

	protected _checkHasFolderPath(): void {
		if (this._folderPath.trim().length === 0) {
			throw new Error(
				"no folder path found (did you forget to use Prerendering.setFolderPath() ?)"
			);
		}
	}

	protected _checkHasBaseUrl(): void {
		if (this._baseUrl.trim().length === 0) {
			throw new Error(
				"not base url found (did you forget to use Prerendering.setBaseUrl() ?)"
			);
		}
	}

	/**
	 * @throws {TypeError}
	 */
	protected _checkDebugMode(): void {
		const typeOfDebugMode = typeof this._debugMode;

		if (typeOfDebugMode !== "boolean") {
			throw new TypeError(
				`the debug mode should be a boolean (got: ${typeOfDebugMode})`
			);
		}
	}

	protected _checkBaseUrl(): void {
		const typeOfBaseUrl = typeof this._baseUrl;

		if (typeOfBaseUrl !== "string") {
			throw new TypeError(
				`the base url should be a string (got: ${typeOfBaseUrl})`
			);
		}

		if (this._baseUrl.trim().length === 0) {
			throw new Error("the base url should be filled");
		}
	}

	protected _checkTimeout(): void {
		const typeOfTimeout = typeof this._timeout;

		if (typeOfTimeout !== "number") {
			throw new TypeError(
				`the timeout should be a number (got: ${typeOfTimeout})`
			);
		}

		if (this._timeout < 0) {
			throw new Error(
				`the timeout cannot be lower than 0 (got: ${this._timeout})`
			);
		}
	}
}

export default Prerendering;
