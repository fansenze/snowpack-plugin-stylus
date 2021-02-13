"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pkg = require('../package.json');
const load_file_1 = require("./load-file");
const render_stylus_1 = require("./render-stylus");
function plugin(snowpackConfig, options) {
    return {
        name: pkg.name,
        resolve: {
            input: ['.styl'],
            output: ['.css'],
        },
        async load({ filePath }) {
            const fileContent = await load_file_1.loadFile(filePath);
            const result = await render_stylus_1.renderStylus(fileContent, Object.assign(Object.assign({}, options), { filename: filePath }));
            const builtFile = {
                code: result,
                map: undefined
            };
            return {
                '.css': builtFile,
            };
        },
    };
}
exports.default = plugin;
