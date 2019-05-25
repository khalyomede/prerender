import { src, dest, watch, series } from "gulp";
import typescript from "gulp-typescript";
import plumber from "gulp-plumber";

const js = () =>
	src("src/**/*.ts")
		.pipe(plumber())
		.pipe(typescript())
		.pipe(dest("lib"));

const start = () => {
	watch("src/**/*.ts", js);
};
const build = series(js);

export { start, build };
