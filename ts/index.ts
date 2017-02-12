import * as plugins from './smartshell.plugins'



export interface IExecResult {
  exitCode: number,
  consoleOutput: string
}

export let exec = (commandStringArg: string): Promise<IExecResult> => {
  let done = plugins.smartq.defer<IExecResult>()
  plugins.shelljs.exec(commandStringArg,{async: true}, (code, stdout, stderr) => {

  })
  return done.promise
}

export let execSilent = (commandStringArg: string) => {
  let done = plugins.smartq.defer<IExecResult>()
  plugins.shelljs.exec(commandStringArg,{}, () => {

  })
  return done.promise
}

export let execSync = () => {

}

export let execSyncSilent = () => {

}
