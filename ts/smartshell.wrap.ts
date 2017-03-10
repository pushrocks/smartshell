import * as plugins from './smartshell.plugins'

// interfaces
import { ChildProcess } from 'child_process'
import { Deferred } from 'smartq'

export interface IExecResult {
  exitCode: number,
  stdout: string
}

export interface IExecResultStreaming {
  childProcess: ChildProcess,
  finalPromise: Promise<IExecResult>
}

/**
 * executes a given command async
 * @param commandStringArg
 */
export let exec = (commandStringArg: string): Promise<IExecResult> => {
  let done = plugins.smartq.defer<IExecResult>()
  plugins.shelljs.exec(commandStringArg, { async: true }, (code, stdout, stderr) => {
    done.resolve({
      exitCode: code,
      stdout: stdout
    })
  })
  return done.promise
}

/**
 * executes a given command async and silent
 * @param commandStringArg
 */
export let execSilent = (commandStringArg: string) => {
  let done = plugins.smartq.defer<IExecResult>()
  plugins.shelljs.exec(commandStringArg, { async: true, silent: true }, (code, stdout, stderr) => {
    done.resolve({
      exitCode: code,
      stdout: stdout
    })
  })
  return done.promise
}

/**
 * executes a command and allws you to stream output
 */
export let execStreaming = (commandStringArg: string) => {
  let childProcessEnded = plugins.smartq.defer<IExecResult>()
  let execChildProcess = plugins.shelljs.exec(commandStringArg, {async: true, silent: true}, (code, stdout, stderr) => {
    childProcessEnded.resolve({
      exitCode: code,
      stdout: stdout
    })
  })
  return {
    childProcess: execChildProcess,
    finalPromise: childProcessEnded.promise
  }
}
