import * as plugins from './smartshell.plugins'
import * as smartshellWrap from './smartshell.wrap'

export type TExecutor = 'sh' | 'bash'

export interface ISmartshellContructorOptions {
  executor: TExecutor
  sourceFilePaths: string[]

}

export class Smartshell {
  sourceFiles: string[] = []
  constructor (optionsArg: ISmartshellContructorOptions) {
    for (let sourceFilePath of optionsArg.sourceFilePaths) {
      this.sourceFiles.push(sourceFilePath)
    }
  }

  addSourceFiles(sourceFilePathsArray: string[]) {
    for(let sourceFilePath of sourceFilePathsArray) {
      this.sourceFiles.push(sourceFilePath)
    }
  }

  cleanSourceFiles () {
    this.sourceFiles = []
  }
}