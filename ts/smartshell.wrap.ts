import * as plugins from './smartshell.plugins'

// interfaces
import { ChildProcess } from 'child_process'
import { Deferred } from 'smartq'

/**
 * interface for ExecResult
 */
export interface IExecResult {
  exitCode: number,
  stdout: string
}

/**
 * interface for streaming ExecResult
 */
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
export let execStreaming = (commandStringArg: string, silentArg: boolean = false) => {
  let childProcessEnded = plugins.smartq.defer<IExecResult>()
  let execChildProcess = plugins.shelljs.exec(commandStringArg, {async: true, silent: silentArg}, (code, stdout, stderr) => {
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

export let execStreamingSilent = (commandStringArg: string) => {
  return execStreaming(commandStringArg, true)
}

/**
 * executes a command and returns promise that will be fullfilled once an putput line matches RegexArg
 * @param commandStringArg
 * @param regexArg
 */
export let execAndWaitForLine = (commandStringArg: string, regexArg: RegExp, silentArg: boolean = false) => {
  let done = plugins.smartq.defer()
  let execStreamingResult = execStreaming(commandStringArg, silentArg)
  execStreamingResult.childProcess.stdout.on('data', (stdOutChunk: string) => {
    if (regexArg.test(stdOutChunk)) {
      done.resolve()
    }
  })
  return done.promise
}

export let execAndWaitForLineSilent = (commandStringArg: string, regexArg: RegExp) => {
  execAndWaitForLine(commandStringArg, regexArg, true)
}

/**
 * get a path
 */
export let which = (cmd: string): Promise<string> => {
  let done = plugins.smartq.defer()
  plugins.which(cmd, (err, path: string) => {
    if (err) {
      done.reject(err)
    }
    done.resolve(path)
  })
  return done.promise
}
