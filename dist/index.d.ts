export interface IExecResult {
    exitCode: number;
    stdout: string;
}
export declare let exec: (commandStringArg: string) => Promise<IExecResult>;
export declare let execSilent: (commandStringArg: string) => Promise<IExecResult>;
export declare let execSync: () => void;
export declare let execSyncSilent: () => void;
