const compiler = require('stylus');

module.exports = function render(fileContent, options) {
    return new Promise((resolve, reject) => {
        compiler.render(fileContent, options, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
