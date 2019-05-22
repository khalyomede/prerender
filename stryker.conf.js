module.exports = function(config) {
	config.set({
		mutator: "javascript",
		mutate: ["lib/**/*.js", "!lib/main.js"],
		packageManager: "yarn",
		reporters: ["clear-text", "progress"],
		testRunner: "mocha",
		transpilers: ["babel"],
		testFramework: "mocha",
		coverageAnalysis: "off",
		babel: {
			optionsFile: ".babelrc"
		}
	});
};
