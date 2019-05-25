- [Prerendering.addRoute()](#PrerenderingaddRoute)
- [Prerendering.getBaseUrl()](#PrerenderinggetBaseUrl)
- [Prerendering.getDebugMode()](#PrerenderinggetDebugMode)
- [Prerendering.getFolderPath()](#PrerenderinggetFolderPath)
- [Prerendering.getRoutes()](#PrerenderinggetRoutes)
- [Prerendering.inDebugMode()](#PrerenderinginDebugMode)
- [Prerendering.setBaseUrl()](#PrerenderingsetBaseUrl)
- [Prerendering.setDebugMode()](#PrerenderingsetDebugMode)
- [Prerendering.setFolderPath()](#PrerenderingsetFolderPath)
- [Prerendering.setRoutes()](#PrerenderingsetRoutes)
- [Prerendering.setTimeout()](#PrerenderingsetTimeout)
- [Prerendering.start()](#Prerenderingstart)
- [Route.addSelectorToWaitFor()](#RouteaddSelectorToWaitFor)
- [Route.getActiveState()](#RoutegetActiveState)
- [Route.getCleanUrl()](#RoutegetCleanUrl)
- [Route.getSelectorsToWaitFor()](#RoutegetSelectorsToWaitFor)
- [Route.getUrl()](#RoutegetUrl)
- [Route.hasSelectorsToWaitFor()](#RoutehasSelectorsToWaitFor)
- [Route.setActive()](#RoutesetActive)
- [Route.setInactive()](#RoutesetInactive)
- [Route.setSelectorsToWaitFor()](#RoutesetSelectorsToWaitFor)
- [Route.setUrl()](#RoutesetUrl)

## Prerendering.addRoute()
(≥ 0.1.0) Add a route to prerender.

**parameters**
- {Route} route - The Route instance containing the url you want to prerender.

**return**
{Void}

**throws**
- {TypeError}
- {Error}
```javascript
import { Prerendering, Route } from "@khalyomede/prerender";

const prerendering = new Prerendering();

prerendering.addRoute(new Route().setUrl("/"));
```
## Prerendering.getBaseUrl()
(≥ 0.1.0) Returns the base url to use for each routes.

**parameters**


**return**
{Void}

**throws**

```javascript
import { Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();
const baseUrl = prerendering.getBaseUrl();
```
## Prerendering.getDebugMode()
(≥ 0.1.0) Return the debug mode.

**parameters**


**return**
{Void}

**throws**

```javascript
import { Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();
const debugMode = prerendering.getDebugMode();
```
## Prerendering.getFolderPath()
(≥ 0.1.0) Return the folder path.

**parameters**


**return**
{Void}

**throws**

```javascript
import { Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();
const folderPath = prerendering.getFolderPath();
```
## Prerendering.getRoutes()
(≥ 0.1.0) Return the routes to prerender.

**parameters**


**return**
{Void}

**throws**

```javascript
import { Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();
const routes = prerendering.getRoutes();
```
## Prerendering.inDebugMode()
(≥ 0.1.0) Returns true if the prerendering has been set in debug mode, else returns false.

**parameters**


**return**
{Void}

**throws**

```javascript
import { Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();

if (prerendering.inDebugMode()) {
	console.log("prerendering not in debug mode");
} else {
	console.log("prerendering in debug mode");
}
```
## Prerendering.setBaseUrl()
(≥ 0.1.0) Set the base url that will be use for each route to prerender.

**parameters**
- {String} baseUrl - The base url for each routes.

**return**
{Void}

**throws**
- {TypeError}
- {Error}
```javascript
import { Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
```
## Prerendering.setDebugMode()
(≥ 0.1.0) Set the debug mode (if true, will display information on console).

**parameters**
- {Boolean} debugMode - The debug mode.

**return**
{Void}

**throws**
- {TypeError}
- {Error}
```javascript
import { Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();

prerendering.setDebugMode(true);
```
## Prerendering.setFolderPath()
(≥ 0.1.0) Set the folder path destination where all the prerendered routes will be saved.

**parameters**
- {String} folderPath - The folder path where all the prerendered routes will be saved.

**return**
{Void}

**throws**
- {TypeError}
- {Error}
```javascript
import { Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();

prerendering.setFolderPath("./prerendered");
```
## Prerendering.setRoutes()
(≥ 0.1.0) Set multiple routes to prerender.

**parameters**
- {Array.<Route>} routes - The routes containings the urls your want to prerender.

**return**
{Void}

**throws**
- {TypeError}
- {Error}
```javascript
import { Prerendering, Route } from "@khalyomede/prerender";

const prerendering = new Prerendering();

prerendering.setRoutes([
	new Route().setUrl("/"),
	new Route().setUrl("/about")
]);
```
## Prerendering.setTimeout()
(≥ 0.1.0) Set the maximum of milliseconds to wait before aborting any navigation or selector waiting when prerendering the routes.

**parameters**
- {Number} timeout - The number of milliseconds to wait at each prerendering steps.

**return**
{Void}

**throws**
- {TypeError}
- {Error}
```javascript
import { Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();

prerendering.setTimeout(10000);
```
## Prerendering.start()
(≥ 0.1.0) Prerenders the routes by creating a static version and saving them into the desired folder.

**parameters**


**return**
{Void}

**throws**
- {Error}
```javascript
import { Prerendering, Route } from "@khalyomede/prerender";

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
prerendering.setFolderPath("./prerendered");
prerendering.addRoute(new Route().setUrl("/"));
prerendering.start();
```
## Route.addSelectorToWaitFor()
(≥ 0.1.0) Add a selector to the list of selectors to wait before prerendering the url.

**parameters**
- {String} selecto - The selector to wait before prerendering the url.

**return**
{Void}

**throws**
- {TypeError}
- {Error}
```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();

route.addSelectorToWaitFor("button.btn-flat");
```
## Route.getActiveState()
(≥ 0.1.0) Get the active state of the route.

**parameters**


**return**
{Void}

**throws**

```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();
const activeState = route.getActiveState();
```
## Route.getCleanUrl()
(≥ 0.1.0) Returns the URL without query strings (useful to save a clean filename).

**parameters**


**return**
{Void}

**throws**

```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();

const cleanUrl = route.setUrl("/?page=1").getCleanUrl();
```
## Route.getSelectorsToWaitFor()
(≥ 0.1.0) Returns the selectors to wait before prerendering the url.

**parameters**


**return**
{Void}

**throws**

```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();
const selectors = route.getSelectorsToWaitFor();
```
## Route.getUrl()
(≥ 0.1.0) Returns the url to prerender.

**parameters**


**return**
{Void}

**throws**

```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();
const url = route.getUrl();
```
## Route.hasSelectorsToWaitFor()
(≥ 0.1.0) Return true if the Route has some selectors, else returns false.

**parameters**


**return**
{Void}

**throws**

```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();

if (route.hasSelectorsToWaitFor()) {
	console.log("has selectors");
} else {
	console.log("has not selectors");
}
```
## Route.setActive()
(≥ 0.1.0) Set the route as active (only active routes are prerendered).

**parameters**


**return**
{Void}

**throws**

```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();

route.setActive();
```
## Route.setInactive()
(≥ 0.1.0) Set the route as inactive (only active routes are prerendered).

**parameters**


**return**
{Void}

**throws**

```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();

route.setInactive();
```
## Route.setSelectorsToWaitFor()
(≥ 0.1.0) Erase all previous selectors and add them all.

**parameters**
- {Array.<String>} selectors - The different selectors to use to wait before prerendering the url.

**return**
{Void}

**throws**
- {TypeError}
- {Error}
```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();

route.setSelectorsToWaitFor(["p.flow-text", "img.materialboxed"]);
```
## Route.setUrl()
(≥ 0.1.0) Set the desired url to prerender.

**parameters**
- {String} url - The url to prerender.

**return**
{Void}

**throws**
- {TypeError}
- {Error}
```javascript
import { Route } from "@khalyomede/prerender";

const route = new Route();

route.setUrl("/about");
```
