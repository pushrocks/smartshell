// -- imports --
import * as plugins from './smartshell.plugins';
import { ShellEnv, IShellEnvContructorOptions, TExecutor } from './smartshell.classes.shellenv';
import { ShellLog } from './smartshell.classes.shelllog';

import * as cp from 'child_process';
import { Deferred } from '@pushrocks/smartpromise';

// -- interfaces --
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
  childProcess: cp.ChildProcess;
  finalPromise: Promise<IExecResult>;
}

// -- SmartShell --
export class Smartshell {
  shellEnv: ShellEnv;

  constructor(optionsArg: IShellEnvContructorOptions) {
    this.shellEnv = new ShellEnv(optionsArg);
  };

  /**
   * executes a given command async
   * @param commandStringArg
   */
  private async _exec(
    commandStringArg: string,
    silentArg: boolean = false,
    strictArg = false,
    streamingArg = false
  ): Promise<IExecResult | IExecResultStreaming> {
    // flow control promises
    const done = plugins.smartpromise.defer<IExecResult | IExecResultStreaming>();
    const childProcessEnded = plugins.smartpromise.defer<IExecResult>();
    // build commandToExecute
    let commandToExecute = commandStringArg;
    commandToExecute = this.shellEnv.createEnvExecString(commandStringArg);
    const spawnlogInstance = new ShellLog();
    const execChildProcess = cp.spawn(commandToExecute, [], {
      shell: true,
      env: process.env
    });

    execChildProcess.stdout.on('data', data => {
      if (!silentArg) {
        spawnlogInstance.logToConsole(data);
      }
      spawnlogInstance.addToBuffer(data);
    });
    execChildProcess.stderr.on('data', data => {
      if (!silentArg) {
        spawnlogInstance.logToConsole(data);
      }
      spawnlogInstance.addToBuffer(data);
    });

    if (streamingArg) {
      done.resolve({
        childProcess: execChildProcess,
        finalPromise: childProcessEnded.promise
      });
    }

    execChildProcess.on('exit', (code, signal) => {
      if (strictArg && code === 1) {
        done.reject();
      }

      const execResult = {
        exitCode: code,
        stdout: spawnlogInstance.logStore.toString()
      };

      if (!streamingArg) {
        done.resolve(execResult);
      }
      childProcessEnded.resolve(execResult);
    });

    const result = await done.promise;
    return result;
  }

  async exec(commandStringArg: string): Promise<IExecResult> {
    return (await this._exec(commandStringArg, false)) as IExecResult;
  }

  /**
   * executes a given command async and silent
   * @param commandStringArg
   */
  async execSilent(commandStringArg: string): Promise<IExecResult> {
    return (await this._exec(commandStringArg, true)) as IExecResult;
  }

  /**
   * executes a command async and strict, meaning it rejects the promise if something happens
   */
  async execStrict(commandStringArg: string): Promise<IExecResult> {
    return (await this._exec(commandStringArg, true, true)) as IExecResult;
  }

  /**
   * executes a command and allows you to stream output
   */
  async execStreaming(
    commandStringArg: string,
    silentArg: boolean = false
  ): Promise<IExecResultStreaming> {
    return (await this._exec(commandStringArg, silentArg, false, true)) as IExecResultStreaming;
  }

  async execStreamingSilent(commandStringArg: string) {
    return (await this.execStreaming(commandStringArg, true)) as IExecResultStreaming;
  }

  /**
   * executes a command and returns promise that will be fullfilled once an putput line matches RegexArg
   * @param commandStringArg
   * @param regexArg
   */
  async execAndWaitForLine(commandStringArg: string, regexArg: RegExp, silentArg: boolean = false) {
    let done = plugins.smartpromise.defer();
    let execStreamingResult = await this.execStreaming(commandStringArg, silentArg);
    execStreamingResult.childProcess.stdout.on('data', (stdOutChunk: string) => {
      if (regexArg.test(stdOutChunk)) {
        done.resolve();
      }
    });
    return done.promise;
  }

  async execAndWaitForLineSilent(commandStringArg: string, regexArg: RegExp) {
    this.execAndWaitForLine(commandStringArg, regexArg, true);
  }
}
