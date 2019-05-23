import { Prerendering, Route } from "@khalyomede/prerender";

const prerendering = new Prerendering();
const routes = [
	new Route().setUrl("http://example.com"),
	new Route()
		.setUrl("http://example.com/about")
		.setSelectorToWaitFor("p.flow-text")
];

prerendering.setFolder("prerendered");
prerendering.setRoutes(routes);
prerendering.setDebugMode(true);
prerendering.start();
