import { Prerendering, Route } from "../lib/main";

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
prerendering.setFolderPath("prerendered");
prerendering.setDebugMode(true);

const home = new Route().setUrl("/").addSelectorToWaitFor("h1");
const about = new Route().setUrl("/about").addSelectorToWaitFor("p");

prerendering.setRoutes([home, about]);
prerendering.start();
