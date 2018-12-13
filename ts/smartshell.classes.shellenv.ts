export type TExecutor = 'sh' | 'bash';

export interface IShellEnvContructorOptions {
  executor: TExecutor;
  sourceFilePaths?: string[];
  pathDirectories?: string[];
}

export class ShellEnv {
  executor: TExecutor;
  sourceFileArray: string[] = [];
  pathDirArray: string[] = [];

  /**
   * constructor for the shellenv
   */
  constructor(optionsArg: IShellEnvContructorOptions) {
    this.executor = optionsArg.executor;

    // add sourcefiles
    if (optionsArg.sourceFilePaths) {
      this.sourceFileArray = this.sourceFileArray.concat(optionsArg.sourceFilePaths);
    }

    // add pathDirectories
    if (optionsArg.pathDirectories) {
      this.pathDirArray = this.pathDirArray.concat(optionsArg.pathDirectories);
    }
  }

  /**
   * imports path into the shell from env if available and returns it with
   */
  private _setPath(commandStringArg): string {
    let commandResult = commandStringArg;
    let commandPaths: string[] = [];
    commandPaths = commandPaths.concat(process.env.PATH.split(':'));
    if (process.env.SMARTSHELL_PATH) {
      commandPaths = commandPaths.concat(process.env.SMARTSHELL_PATH.split(':'));
    }

    // lets filter for unwanted paths
    // Windows WSL
    commandPaths = commandPaths.filter(commandPathArg => {
      const filterResult =
        !commandPathArg.startsWith('/mnt/c/') &&
        !commandPathArg.startsWith('Files/1E') &&
        !commandPathArg.includes(' ');
      if (!filterResult) {
        // console.log(`${commandPathArg} will be filtered!`);
      }
      return filterResult;
    });

    commandResult = `PATH=${commandPaths.join(':')} && ${commandStringArg}`;
    return commandResult;
  }

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
    let commandResult = '';
    let sourceString = '';

    switch (this.executor) {
      case 'bash':
        for (let sourceFilePath of this.sourceFileArray) {
          sourceString = sourceString + `source ${sourceFilePath} && `;
        }
        commandResult = `bash -c '${sourceString}${commandArg}'`;
        break;
      case 'sh':
        for (let sourceFilePath of this.sourceFileArray) {
          sourceString = sourceString + `source ${sourceFilePath} && `;
        }
        commandResult = `${sourceString}${commandArg}`;
        break;
    }
    commandResult = this._setPath(commandResult);
    return commandResult;
  }
}
