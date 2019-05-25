import { Route, Prerendering } from "../lib/main";

const home = new Route().setUrl("/").addSelectorToWaitFor("h1");
const about = new Route().setUrl("/about").addSelectorToWaitFor("p");
const contactUs = new Route()
	.setUrl("/contact-us")
	.setSelectorsToWaitFor(["h1", "p"])
	.setInactive();
const news = new Route()
	.setUrl("/news?utm_medium=social")
	.addSelectorToWaitFor("h1")
	.setInactive();

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
prerendering.setFolderPath("prerendered");
prerendering.setDebugMode(true);
prerendering.setRoutes([home, about, contactUs, news]); // no need to filter them here, you did it per route.
prerendering.start();
