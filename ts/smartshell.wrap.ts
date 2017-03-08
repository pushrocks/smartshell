import * as plugins from './smartshell.plugins'

export interface IExecResult {
  exitCode: number,
  stdout: string
}

export let exec = (commandStringArg: string): Promise<IExecResult> => {
  let done = plugins.smartq.defer<IExecResult>()
  plugins.shelljs.exec(commandStringArg,{async: true}, (code, stdout, stderr) => {
    done.resolve({
      exitCode: code,
      stdout: stdout
    })
  })
  return done.promise
}

export let execSilent = (commandStringArg: string) => {
  let done = plugins.smartq.defer<IExecResult>()
  plugins.shelljs.exec(commandStringArg,{async: true, silent: true}, (code, stdout, stderr) => {
    done.resolve({
      exitCode: code,
      stdout: stdout
    })
  })
  return done.promise
}
