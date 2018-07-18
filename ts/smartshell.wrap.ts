import * as plugins from "./smartshell.plugins";

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
 * imports path into the shell from env if available and returns it with
 */
let importEnvVarPath = (stringArg): string => {
  if (process.env.SMARTSHELL_PATH) {
    let commandResult = `PATH=${process.env.SMARTSHELL_PATH} && ${stringArg}`;
    // console.log(commandResult)
    return commandResult;
  } else {
    return stringArg;
  }
};

/**
 * executes a given command async
 * @param commandStringArg
 */
export let exec = (
  commandStringArg: string,
  silentArg: boolean = false,
  strictArg = false
): Promise<IExecResult> => {
  let done = plugins.smartpromise.defer<IExecResult>();
  const commandToExecute = importEnvVarPath(commandStringArg);
  try {
    const execChildProcess = cp.exec(commandToExecute, {
      timeout: null,
      maxBuffer: 1000000,
      env: process.env
    });

    let logStore = "";

    execChildProcess.stdout.on("data", (data: string) => {
      if (!silentArg) {
        console.log(data);
      }
      logStore += data;
    });
    execChildProcess.stderr.on("data", data => {
      if (!silentArg) {
        console.log(data);
      }
      logStore += data;
    });
    execChildProcess.on("exit", (code, signal) => {
      done.resolve({
        exitCode: code,
        stdout: logStore
      });
    });
  } catch (e) {
    const error = e;
  }

  /*plugins.shelljs.exec(importEnvVarPath(commandStringArg), { async: true, silent: silentArg }, (code, stdout, stderr) => {
    if (
      stderr
      && (stderr !== '')
      && (!silentArg || strictArg)
      && (process.env.DEBUG === 'true')
    ) {
      console.log('StdErr found.')
      console.log(stderr)
    }
    if (strictArg) {
      done.reject(new Error(stderr))
      return
    }
    done.resolve({
      exitCode: code,
      stdout: stdout
    })
  })*/
  return done.promise;
};

/**
 * executes a given command async and silent
 * @param commandStringArg
 */
export let execSilent = async (
  commandStringArg: string
): Promise<IExecResult> => {
  return await exec(commandStringArg, true);
};

/**
 * executes strict, meaning it rejects the promise if something happens
 */
export let execStrict = async (
  commandStringArg: string
): Promise<IExecResult> => {
  return await exec(commandStringArg, true, true);
};

/**
 * executes a command and allws you to stream output
 */
export let execStreaming = (
  commandStringArg: string,
  silentArg: boolean = false
) => {
  let childProcessEnded = plugins.smartpromise.defer<IExecResult>();
  const commandToExecute = importEnvVarPath(commandStringArg);
  let execChildProcess = cp.exec(commandToExecute, {
    timeout: null,
    maxBuffer: 1000000,
    env: process.env
  });

  let logStore = "";

  execChildProcess.stdout.on("data", (data: string) => {
    if (!silentArg) {
      console.log(data);
    }
    logStore += data;
  });
  execChildProcess.stderr.on("data", data => {
    if (!silentArg) {
      console.log(data);
    }
    logStore += data;
  });
  execChildProcess.on("exit", (code, signal) => {
    childProcessEnded.resolve({
      exitCode: code,
      stdout: logStore
    });
  });

  return {
    childProcess: execChildProcess,
    finalPromise: childProcessEnded.promise
  };
};

export let execStreamingSilent = (commandStringArg: string) => {
  return execStreaming(commandStringArg, true);
};

/**
 * executes a command and returns promise that will be fullfilled once an putput line matches RegexArg
 * @param commandStringArg
 * @param regexArg
 */
export let execAndWaitForLine = (
  commandStringArg: string,
  regexArg: RegExp,
  silentArg: boolean = false
) => {
  let done = plugins.smartpromise.defer();
  let execStreamingResult = execStreaming(commandStringArg, silentArg);
  execStreamingResult.childProcess.stdout.on("data", (stdOutChunk: string) => {
    if (regexArg.test(stdOutChunk)) {
      done.resolve();
    }
  });
  return done.promise;
};

export let execAndWaitForLineSilent = (
  commandStringArg: string,
  regexArg: RegExp
) => {
  execAndWaitForLine(commandStringArg, regexArg, true);
};

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
