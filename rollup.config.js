import uglify from 'rollup-plugin-uglify';

var MINIFY = process.env.MINIFY;

var pkg    = require('./package.json');
var banner =
`/**
 * ${pkg.description}
 * @author ${pkg.author}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */`;

var uglifyOpts = { output: {} };
// retain multiline comment with @license
uglifyOpts.output.comments = (node, comment) =>
comment.type === 'comment2' && /@license/i.test(comment.value);

var plugins = [];

if (MINIFY) plugins.push(uglify(uglifyOpts));
var extension = MINIFY ? 'min.js' : 'js';

const CONFIG = {
	sourceMap: false,
	format: 'umd',
	plugins: plugins,
	banner: banner,
	moduleName: 'angular-disqus-comments',
	entry: 'lib/index.js',
	dest: `dist/angular-disqus-comments.${extension}`,
	globals: {angular: 'angular'},
	external: 'angular',
};

export default CONFIG;
