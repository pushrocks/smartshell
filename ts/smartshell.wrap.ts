import * as plugins from "./smartshell.plugins";
import { ShellLog } from "./smartshell.classes.shelllog";

// interfaces
import * as cp from "child_process";
import { Deferred } from "@pushrocks/smartpromise";

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



/**
 * get a path
 */
export let which = (cmd: string): Promise<string> => {
  let done = plugins.smartpromise.defer<string>();
  plugins.which(cmd, (err, path: string) => {
    if (err) {
      done.reject(err);
    }
    done.resolve(path);
  });
  return done.promise;
};


/* /////////////////////////////////////////////////////////

/**
   * executes silently and returns IExecResult
   * @param commandArg
   
  async execSilent(commandArg: string) {
    let execCommand = this..createExecString(commandArg);
    return await smartshellWrap.execSilent(execCommand);
  }

  /**
   * executes and returns IExecResult
   * @param commandArg
   
  async exec(commandArg: string) {
    let execCommand = this.createExecString(commandArg);
    return await smartshellWrap.exec(execCommand);
  } */