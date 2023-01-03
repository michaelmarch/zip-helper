import JSZip = require("jszip");
import { createReadStream, createWriteStream } from "fs";

export class ZipHelper {
  async zipFiles(
    files: Map<string, string>,
    callback?: (percent: number, file: string | null) => void
  ): Promise<NodeJS.ReadableStream> {
    return new Promise<NodeJS.ReadableStream>((resolve, _) => {
      const zip = new JSZip();

      for (const [filePath, zipName] of files.entries()) {
        zip.file(zipName, createReadStream(filePath));
      }

      if (callback) {
        resolve(
          zip.generateNodeStream(undefined, (metadata: JSZip.JSZipMetadata) => {
            callback(metadata.percent, metadata.currentFile);
          })
        );
      }

      resolve(zip.generateNodeStream());
    });
  }
}
