import 'typings-test'
import { expect } from 'smartchai'

import * as smartshell from '../dist/index'

describe('smartshell', function() {
    it('it should run async', function() {
        this.timeout(1000000)
        return smartshell.exec('npmdocker speedtest').then((execResult) => {
            console.log(execResult.stdout)
        })
    })
})