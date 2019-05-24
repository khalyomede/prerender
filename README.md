# Prerender

Prerenders your website into a static, SEO friendly, HTML version.

[![Build Status](https://travis-ci.com/khalyomede/prerender.svg?branch=master)](https://travis-ci.com/khalyomede/prerender)

## Summary

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)

## About

I am using a similar algorithm on one of my SPA to serve Google bots a static version of my website where my meta and my content is immediately present. I decided to open source it because I did not see another package that does it.

## Installation

1. Install the package

```bash
npm install --save-dev @khalyomede/prerender
```

2. Install [puppeteer](https://www.npmjs.com/package/puppeteer) (only if you did not have it already)

```bash
npm install --save-dev puppeteer
```

## Usage

- [Simple example](#simple-example)
- [Add a greater timeout](#add-a-greater-timeout)
- [Disable logs](#disable-logs)
- [Prevent some routes to be prerendered](#prevent-some-routes-to-be-prerendered)

_Note_

These example use [@babel-node](https://babeljs.io/docs/en/babel-node) to parse ES6 syntaxes. If you do not want to use it, please replace this:

```javascript
import { Route, Prerendering } from "@khalyomede/prerender";
```

By:

```javascript
const { Route, Prerendering } = require("@khalyomede/prerender");
```

### Simple example

In this example, we will prerender 2 routes from `http://example.com` and save it into a folder named `prerendered`.

```javascript
import { Route, Prerendering } from "@khalyomede/prerender";

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
prerendering.setFolderPath("prerendered");
prerendering.setDebugMode(true);

const home = new Route().setUrl("/").addSelectorToWaitFor("h1");
const about = new Route().setUrl("/about").addSelectorToWaitFor("p");

prerendering.setRoutes([home, about]);
prerendering.start();
```

You should see something like this:

```bash
[2019-05-25 00:49:10:219] opening Chrome...
[2019-05-25 00:49:10:340] opened Chrome (115ms)
[2019-05-25 00:49:10:342] opening a tab...
[2019-05-25 00:49:10:415] opened a tab (73ms)
[2019-05-25 00:49:10:416] navigating to http://example.com/...
[2019-05-25 00:49:10:794] successfully navigated (378ms)
[2019-05-25 00:49:10:795] waiting for 1 selectors...
[2019-05-25 00:49:10:807] found the selectors (11ms)
[2019-05-25 00:49:10:808] copying the HTML...
[2019-05-25 00:49:10:812] copied 1.26 kB of HTML (3ms)
[2019-05-25 00:49:10:813] saving into prerendered/index.html...
[2019-05-25 00:49:10:815] saved the file (1ms)
[2019-05-25 00:49:10:816] closing the tab...
[2019-05-25 00:49:10:821] closed the tab (4ms)
[2019-05-25 00:49:10:823] opening a tab...
[2019-05-25 00:49:10:890] opened a tab (66ms)
[2019-05-25 00:49:10:891] navigating to http://example.com/about?page=1...
[2019-05-25 00:49:11:014] successfully navigated (122ms)
[2019-05-25 00:49:11:015] waiting for 1 selectors...
[2019-05-25 00:49:11:025] found the selectors (9ms)
[2019-05-25 00:49:11:026] copying the HTML...
[2019-05-25 00:49:11:029] copied 1.26 kB of HTML (3ms)
[2019-05-25 00:49:11:029] saving into prerendered/about/index.html...
[2019-05-25 00:49:11:031] saved the file (1ms)
[2019-05-25 00:49:11:032] closing the tab...
[2019-05-25 00:49:11:035] closed the tab (2ms)
[2019-05-25 00:49:11:037] closing Chrome...
[2019-05-25 00:49:11:288] closed Chrome (249ms)
```

### Add a greater timeout

In this example, we will instruct Puppeteer to wait for 10000 ms (10 sec) maximum, instead of the default 30s.

```javascript
import { Route, Prerendering } from "../lib/main";

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
prerendering.setFolderPath("prerendered");
prerendering.setDebugMode(true);
prerendering.setTimeout(10000);
prerendering.addRoute(new Route().setUrl("/").addSelectorToWaitFor("h1"));
prerendering.start();
```

You should see something like this in console:

```bash
[2019-05-25 01:13:52:423] opening Chrome...
[2019-05-25 01:13:52:573] opened Chrome (144ms)
[2019-05-25 01:13:52:575] opening a tab...
[2019-05-25 01:13:52:649] opened a tab (73ms)
[2019-05-25 01:13:52:649] navigating to http://example.com/...
[2019-05-25 01:13:52:932] successfully navigated (282ms)
[2019-05-25 01:13:52:933] waiting for 1 selectors...
[2019-05-25 01:13:52:947] found the selectors (13ms)
[2019-05-25 01:13:52:948] copying the HTML...
[2019-05-25 01:13:52:953] copied 1.26 kB of HTML (4ms)
[2019-05-25 01:13:52:953] saving into prerendered/index.html...
[2019-05-25 01:13:52:955] saved the file (1ms)
[2019-05-25 01:13:52:956] closing the tab...
[2019-05-25 01:13:52:960] closed the tab (4ms)
[2019-05-25 01:13:52:961] closing Chrome...
[2019-05-25 01:13:53:097] closed Chrome (136ms)
```

### Disable logs

In this example, we will remove the logs from the console.

```javascript
import { Route, Prerendering } from "../lib/main";

const prerendering = new Prerendering();

prerendering.setBaseUrl("http://example.com");
prerendering.setFolderPath("prerendered");
prerendering.setDebugMode(false); // you do not need this line, by default it is false.
prerendering.addRoute(new Route().setUrl("/").addSelectorToWaitFor("h1"));
prerendering.start();
```

### Prevent some routes to be prerendered

In this example, we will add 4 routes, but only instruct the program to prerender 2 of them. This is useful if you do not want to play comment/uncomment to do some adjustements or tests.

```javascript
import { Route, Prerendering } from "@khalyomede/prerender";

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
prerendering.setRoutes([home, about, contactUs, news]); // no need to filter them here, you did it per route.
prerendering.start();
```

You should see something like this in console:

```
[2019-05-25 01:26:04:021] opening Chrome...
[2019-05-25 01:26:04:303] opened Chrome (270ms)
[2019-05-25 01:26:04:307] opening a tab...
[2019-05-25 01:26:04:439] opened a tab (131ms)
[2019-05-25 01:26:04:440] navigating to http://example.com/...
[2019-05-25 01:26:05:003] successfully navigated (562ms)
[2019-05-25 01:26:05:004] waiting for 1 selectors...
[2019-05-25 01:26:05:035] found the selectors (29ms)
[2019-05-25 01:26:05:036] copying the HTML...
[2019-05-25 01:26:05:043] copied 1.26 kB of HTML (6ms)
[2019-05-25 01:26:05:044] saving into prerendered/index.html...
[2019-05-25 01:26:05:047] saved the file (2ms)
[2019-05-25 01:26:05:047] closing the tab...
[2019-05-25 01:26:05:054] closed the tab (6ms)
[2019-05-25 01:26:05:056] opening a tab...
[2019-05-25 01:26:05:170] opened a tab (114ms)
[2019-05-25 01:26:05:171] navigating to http://example.com/about...
[2019-05-25 01:26:05:335] successfully navigated (163ms)
[2019-05-25 01:26:05:336] waiting for 1 selectors...
[2019-05-25 01:26:05:349] found the selectors (12ms)
[2019-05-25 01:26:05:350] copying the HTML...
[2019-05-25 01:26:05:353] copied 1.26 kB of HTML (3ms)
[2019-05-25 01:26:05:354] saving into prerendered/about/index.html...
[2019-05-25 01:26:05:356] saved the file (2ms)
[2019-05-25 01:26:05:357] closing the tab...
[2019-05-25 01:26:05:361] closed the tab (3ms)
[2019-05-25 01:26:05:362] closing Chrome...
[2019-05-25 01:26:05:574] closed Chrome (211ms)
```

## API

You can find all the methods available for every classes of this package right here: [api.md](api.md).

## Contributing

The project uses [typescript](#https://www.npmjs.com/package/typescript) to transpile modern ES6 into Javascript.

To start adding features or fixing bugs, use this command:

```bash
npm run start
```

This will open [Gulp](https://www.npmjs.com/package/gulp) and it will listen changes on your `.ts` files. When transpiled, the files are located in the `lib` folder .

The class `Route.ts` modelize the routes to prerender. The class `Prerendering.ts` modelize the prerendering step, and all the options involved the process. The `main.ts` file is just a facade to be able to provide three shaking ability to the user.

To add tests, I use [chai](https://www.npmjs.com/package/chai) as my assertion library and [mocha](https://www.npmjs.com/package/mocha) to run the tests. I also use [@stryker-mutator/core](https://www.npmjs.com/package/@stryker-mutator/core) to run mutations tests, but for the moment it throws a lot of errors because I do not know how to tests my logs in console, and I have an issue testing the asynchronous `Prerendering.start()` method.

To run the test, use:

```bash
npm run test
```
