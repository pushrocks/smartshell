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
  kill: () => void;
}

// -- SmartShell --
export class Smartshell {
  public shellEnv: ShellEnv;
  public smartexit = new plugins.smartexit.SmartExit();

  constructor(optionsArg: IShellEnvContructorOptions) {
    this.shellEnv = new ShellEnv(optionsArg);
  }

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
      env: process.env,
      detached: false
    });

    this.smartexit.addProcess(execChildProcess);

    execChildProcess.stdout.on('data', data => {
      if (!silentArg) {
        spawnlogInstance.writeToConsole(data);
      }
      spawnlogInstance.addToBuffer(data);
    });
    execChildProcess.stderr.on('data', data => {
      if (!silentArg) {
        spawnlogInstance.writeToConsole(data);
      }
      spawnlogInstance.addToBuffer(data);
    });

    if (streamingArg) {
      done.resolve({
        childProcess: execChildProcess,
        finalPromise: childProcessEnded.promise,
        kill: () => {
          // this notation with the - kills the whole process group
          process.kill(-execChildProcess.pid);
        }
      });
    }

    execChildProcess.on('exit', (code, signal) => {
      this.smartexit.removeProcess(execChildProcess);
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

  public async exec(commandStringArg: string): Promise<IExecResult> {
    return (await this._exec(commandStringArg, false)) as IExecResult;
  }

  /**
   * executes a given command async and silent
   * @param commandStringArg
   */
  public async execSilent(commandStringArg: string): Promise<IExecResult> {
    return (await this._exec(commandStringArg, true)) as IExecResult;
  }

  /**
   * executes a command async and strict, meaning it rejects the promise if something happens
   */
  public async execStrict(commandStringArg: string): Promise<IExecResult> {
    return (await this._exec(commandStringArg, true, true)) as IExecResult;
  }

  /**
   * executes a command and allows you to stream output
   */
  public async execStreaming(
    commandStringArg: string,
    silentArg: boolean = false
  ): Promise<IExecResultStreaming> {
    return (await this._exec(commandStringArg, silentArg, false, true)) as IExecResultStreaming;
  }

  public async execStreamingSilent(commandStringArg: string) {
    return (await this.execStreaming(commandStringArg, true)) as IExecResultStreaming;
  }

  /**
   * executes a command and returns promise that will be fullfilled once an putput line matches RegexArg
   * @param commandStringArg
   * @param regexArg
   */
  public async execAndWaitForLine(
    commandStringArg: string,
    regexArg: RegExp,
    silentArg: boolean = false
  ) {
    let done = plugins.smartpromise.defer();
    let execStreamingResult = await this.execStreaming(commandStringArg, silentArg);
    execStreamingResult.childProcess.stdout.on('data', (stdOutChunk: string) => {
      if (regexArg.test(stdOutChunk)) {
        done.resolve();
      }
    });
    return done.promise;
  }

  public async execAndWaitForLineSilent(commandStringArg: string, regexArg: RegExp) {
    this.execAndWaitForLine(commandStringArg, regexArg, true);
  }

  /**
   * execs an command and then enters interactive CLI
   * @param commandStringArg
   * @param regexArg
   */
  public async execInteractive(commandStringArg: string) {
    const done = plugins.smartpromise.defer();
    const shell = cp.spawn('sh', [], { stdio: 'pipe' });
    this.smartexit.addProcess(shell);
    const shellLog = new ShellLog();
    process.stdin.pipe(shell.stdin);
    shell.stdout.pipe(process.stdout);
    shell.on('close', code => {
      console.log(`interactive shell terminated with code ${code}`);
      done.resolve();
    });
    shell.stdin.write(commandStringArg + '\n');
    await done.promise;
  }
}
