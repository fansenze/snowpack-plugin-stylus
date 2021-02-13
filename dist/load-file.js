"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFile = void 0;
const fs_1 = require("fs");
async function loadFile(filePath) {
    return new Promise((resolve, reject) => {
        fs_1.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
exports.loadFile = loadFile;
