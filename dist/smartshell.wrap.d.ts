/// <reference types="node" />
import { ChildProcess } from 'child_process';
/**
 * interface for ExecResult
 */
export interface IExecResult {
    exitCode: number;
    stdout: string;
}
/**
 * interface for streaming ExecResult
 */
export interface IExecResultStreaming {
    childProcess: ChildProcess;
    finalPromise: Promise<IExecResult>;
}
/**
 * executes a given command async
 * @param commandStringArg
 */
export declare let exec: (commandStringArg: string) => Promise<IExecResult>;
/**
 * executes a given command async and silent
 * @param commandStringArg
 */
export declare let execSilent: (commandStringArg: string) => Promise<IExecResult>;
/**
 * executes a command and allws you to stream output
 */
export declare let execStreaming: (commandStringArg: string) => {
    childProcess: ChildProcess;
    finalPromise: Promise<IExecResult>;
};
/**
 * get a path
 */
export declare let which: (cmd: string) => Promise<string>;
