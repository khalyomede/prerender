import { Prerendering, Route } from "../lib/main";

const home = new Route().setUrl("/").addSelectorToWaitFor("h1");
const about = new Route().setUrl("/about").addSelectorToWaitFor("p");
const routes = [home, about];
const prerendering = new Prerendering();

prerendering.setFolderPath("prerendered");
prerendering.setBaseUrl("http://example.com");
prerendering.setRoutes(routes);
prerendering.setDebugMode(true);
prerendering.settimeout(10000);
prerendering.start();
