import * as plugins from './smartshell.plugins';

/**
 * a log handler for spawned logs
 * making sure the process doesn't run out of memory
 */
export class ShellLog {
  public logStore = Buffer.from('');

  /**
   * log data to console
   * @param dataArg
   */
  public writeToConsole(dataArg: string | Buffer): void {
    // make sure we have the data as string
    process.stdout.write(dataArg);
  }

  /**
   * add data to Buffer for later consumption
   * @param dataArg
   */
  public addToBuffer(dataArg: string | Buffer): void {
    // make sure we have the data as Buffer
    const dataBuffer: Buffer = (() => {
      if (!Buffer.isBuffer(dataArg)) {
        return Buffer.from(dataArg);
      }
      return dataArg;
    })();
    this.logStore = Buffer.concat([this.logStore, dataBuffer]);
  }

  public logAndAdd(dataArg: string | Buffer): void {
    this.writeToConsole(dataArg);
    this.addToBuffer(dataArg);
  }
}
