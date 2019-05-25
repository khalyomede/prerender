const jsdoc = require("jsdoc-api");
const { writeFileSync } = require("fs");

let methods = [];
let headerMarkdown = "";
let contentMarkdown = "";
let markdown = "";
const explainations = jsdoc
	.explainSync({
		files: ["lib/Route.js", "lib/Prerendering.js"]
	})
	.filter(
		explaination =>
			!("undocumented" in explaination) &&
			explaination.kind === "function" &&
			!explaination.name.startsWith("_")
	);

for (const explaination of explainations) {
	const name = `${explaination.memberof.replace("<anonymous>~", "")}.${
		explaination.name
	}`;
	const exceptions =
		"exceptions" in explaination
			? explaination.exceptions.map(exception => exception.type.names[0])
			: [];
	const returnStatement =
		"return" in explaination
			? explaination.returns.map(returnItem => returnItem.type.names.join("|"))
			: "Void";

	const parameters =
		"params" in explaination
			? explaination.params.map(parameter => {
					return {
						name: parameter.name,
						description: parameter.description,
						type: parameter.type.names.join("|")
					};
			  })
			: [];

	const examples = "examples" in explaination ? explaination.examples : [];

	methods.push({
		link: `[${name}()](#${name})`,
		title: `${name}()`,
		description: explaination.description,
		examples: examples,
		since: explaination.since,
		exceptions: exceptions,
		return: returnStatement,
		parameters: parameters,
		since: explaination.since
	});
}

methods = methods.sort((method1, method2) =>
	method1.link < method2.link ? -1 : method1.link > method2.link ? 1 : 0
);

for (const method of methods) {
	const throws = method.exceptions
		.map(exception => `- {${exception}}`)
		.join("\n");
	const examples = method.examples
		.map(example => "```javascript\n" + example + "\n```")
		.join("\n");
	const parameters = method.parameters
		.map(
			parameter =>
				`- {${parameter.type}} ${parameter.name} - ${parameter.description}`
		)
		.join("\n");

	headerMarkdown += `- ${method.link}\n`;
	contentMarkdown += `## ${method.title} (>= v${method.since})\n${
		method.description
	}\n\n**parameters**\n${parameters}\n\n**return**\n{${
		method.return
	}}\n\n**throws**\n${throws}\n${examples}\n`;
}

markdown = `${headerMarkdown}\n${contentMarkdown}`;

writeFileSync("api.md", markdown);
