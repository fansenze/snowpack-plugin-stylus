const pkg = require('./package.json');
const loadFile = require('./src/load-file');
const renderStylus = require('./src/render-stylus');

module.exports = function plugin(snowpackConfig, options = {}) {
  return {
    name: pkg.name,
    resolve: {
      input: ['.styl'],
      output: ['.css'],
    },
    async load({ filePath }) {
      try {
        const fileContent = await loadFile(filePath);
        const result = await renderStylus(fileContent, { ...options, filename: filePath });
        return {
          '.css': result,
        };
      } catch (err) {
        console.error(err);
      }
    },
  };
}
