import { FsNode } from "./FsNode.dtos";

export interface FsProvider { 
    createDirectory(path: string): void;
    deleteDirectory(path: string): void;
    copyDirectory(path: string, newPath: string): void;
    moveDirectory(path: string, newPath: string): void;
    listDirectory(path: string): FsNode[];
    writeFile(path: string, content: string | Buffer): Promise<void>;
    readFile(path: string): Promise<string | Buffer>;
    deleteFile(path: string): Promise<void>;
    copyFile(srcPath: string, destPath: string): Promise<void>;
    moveFile(srcPath: string, destPath: string): Promise<void>;
    getInfo(path: string): FsNode;
    setWorkingDirectory(path: string): void;
    getWorkingDirectory(): string; 
}