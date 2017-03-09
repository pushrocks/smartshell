import * as plugins from './smartshell.plugins'
import * as smartshellWrap from './smartshell.wrap'

export type TExecutor = 'sh' | 'bash'

export interface ISmartshellContructorOptions {
    executor: TExecutor
    sourceFiles: string[]

}

export class Smartshell {
    constructor() {
        
    }
}