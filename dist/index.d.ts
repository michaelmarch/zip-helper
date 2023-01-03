/// <reference types="node" />
export declare class ZipHelper {
    zipFiles(files: Map<string, string>, callback?: (percent: number, file: string | null) => void): Promise<NodeJS.ReadableStream>;
}
