"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderStylus = void 0;
const stylus_1 = require("stylus");
function renderStylus(fileContent, options) {
    return new Promise((resolve, reject) => {
        stylus_1.render(fileContent, options, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.renderStylus = renderStylus;
