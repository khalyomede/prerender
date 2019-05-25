import { Route, Prerendering } from "../lib/main";

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
prerendering.setFolderPath("prerendered");
prerendering.setDebugMode(true);
prerendering.addRoute(new Route().setUrl("/about/us.html"));

prerendering.start();
