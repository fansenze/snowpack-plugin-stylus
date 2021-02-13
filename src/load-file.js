const fs = require('fs');

module.exports = async function loadFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    });
}
