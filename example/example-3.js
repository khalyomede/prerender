import { Route, Prerendering } from "../lib/main";

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
prerendering.setFolderPath("prerendered");
prerendering.setDebugMode(false); // you do not need this line, by default it is false.
prerendering.addRoute(new Route().setUrl("/").addSelectorToWaitFor("h1"));
prerendering.start();
