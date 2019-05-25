import { Route, Prerendering } from "../lib/main";

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
prerendering.setFolderPath("prerendered");
prerendering.setDebugMode(true);
prerendering.setTimeout(10000);
prerendering.addRoute(new Route().setUrl("/").addSelectorToWaitFor("h1"));
prerendering.start();
