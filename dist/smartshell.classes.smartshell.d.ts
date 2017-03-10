export declare type TExecutor = 'sh' | 'bash';
export interface ISmartshellContructorOptions {
    executor: TExecutor;
    sourceFilePaths: string[];
}
export declare class Smartshell {
    sourceFiles: string[];
    constructor(optionsArg: ISmartshellContructorOptions);
    addSourceFiles(sourceFilePathsArray: string[]): void;
    cleanSourceFiles(): void;
}
