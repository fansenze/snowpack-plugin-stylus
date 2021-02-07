const compiler = require('stylus');
const fs = require('fs');

const pkg = require('./package.json');

const render = async (filepath, options) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        compiler.render(data, { ...options, filename: filepath }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
}

module.exports = function plugin(snowpackConfig, options = {}) {
  return {
    name: pkg.name,
    resolve: {
      input: ['.styl'],
      output: ['.css'],
    },
    async load({ filePath }) {
      try {
        const result = await render(filePath, options);
        return {
          '.css': result,
        };
      } catch (err) {
        console.error(err);
      }
    },
  };
}