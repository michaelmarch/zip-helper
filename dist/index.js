"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipHelper = void 0;
const JSZip = require("jszip");
const fs_1 = require("fs");
class ZipHelper {
    async zipFiles(files, callback) {
        return new Promise((resolve, _) => {
            const zip = new JSZip();
            for (const [filePath, zipName] of files.entries()) {
                zip.file(zipName, (0, fs_1.createReadStream)(filePath));
            }
            if (callback) {
                resolve(zip.generateNodeStream(undefined, (metadata) => {
                    callback(metadata.percent, metadata.currentFile);
                }));
            }
            resolve(zip.generateNodeStream());
        });
    }
}
exports.ZipHelper = ZipHelper;
