export type TExecutor = 'sh' | 'bash';

export interface IShellEnvContructorOptions {
  executor: TExecutor;
  sourceFilePaths: string[];
}

export class ShellEnv {
  executor: TExecutor;
  sourceFileArray: string[] = [];
  
  /**
   * constructor for the shellenv
   */
  constructor(optionsArg: IShellEnvContructorOptions) {
    this.executor = optionsArg.executor;
    for (let sourceFilePath of optionsArg.sourceFilePaths) {
      this.sourceFileArray.push(sourceFilePath);
    }
  };

  /**
   * add files that are going to be sourced when running a command
   * @param sourceFilePathsArray 
   */
  addSourceFiles(sourceFilePathsArray: string[]) {
    for (let sourceFilePath of sourceFilePathsArray) {
      this.sourceFileArray.push(sourceFilePath);
    }
  }

  /**
   * cleans the source files array
   */
  cleanSourceFiles() {
    this.sourceFileArray = [];
  }

  createEnvExecString(commandArg): string {
    if (this.executor === 'bash') {
      let sourceString = '';
      for (let sourceFilePath of this.sourceFileArray) {
        sourceString = sourceString + `source ${sourceFilePath} && `;
      }
      return `bash -c '${sourceString} ${commandArg}'`;
    } else {
      return commandArg;
    }
  }
}