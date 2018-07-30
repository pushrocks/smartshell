import * as plugins from './smartshell.plugins';

/**
 * a log handler for spawned logs
 * making sure the process doesn't run out of memory
 */
export class ShellLog {
  logStore = Buffer.from('');

  /**
   * log data to console
   * @param dataArg 
   */
  logToConsole(dataArg: string | Buffer): void {
    // make sure we have the data as string
    const dataString: string = (() => {
      if (Buffer.isBuffer(dataArg)) {
        return dataArg.toString();
      }
      return dataArg;
    })();
    console.log(dataString);
  }

  /**
   * add data to Buffer for later consumption
   * @param dataArg
   */
  addToBuffer(dataArg: string | Buffer): void {
    // make sure we have the data as Buffer
    const dataBuffer: Buffer = (() => {
      if (!Buffer.isBuffer(dataArg)) {
        return Buffer.from(dataArg);
      }
      return dataArg;
    })();
    this.logStore = Buffer.concat([this.logStore,dataBuffer]);
  }

  logAndAdd(dataArg: string | Buffer): void {
    this.logToConsole(dataArg);
    this.addToBuffer(dataArg);
  }
}