import Route from "./Route";
import { dirname } from "path";
import { existsSync, statSync, exists } from "fs";

class Prerendering {
	protected _route: Route;
	protected _routes: Route[];
	protected _folderPath: string;

	public constructor() {
		this._route = null;
		this._routes = [];
		this._folderPath = "";
	}

	/**
	 * Add a route to prerender.
	 *
	 * @param {Route} route The Route instance containing the url you want to prerender.
	 * @return {Prerendering}
	 * @throws {TypeError}
	 * @throws {Error}
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
	 * @return {Prerender}
	 * @throws {TypeError}
	 * @throws {Error}
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
	 *
	 * @throws {Error}
	 */
	public setFolderPath(folderPath: string): this {
		this._folderPath = folderPath;

		this._checkFolderPath();

		return this;
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
				`the route should have an url (use "myRoute.setUrl('https://example.com')")`
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
}

export default Prerendering;
