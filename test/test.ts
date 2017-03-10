import 'typings-test'
import { expect } from 'smartchai'

import * as smartshell from '../dist/index'

describe('smartshell', function () {
  it('it should run async', function () {
    this.timeout(1000000)
    return smartshell.exec('npm -v').then((execResult) => {
      expect(execResult.stdout).to.match(/[0-9\.]*/)
    })
  })
  it('should run async and silent', function() {
    return smartshell.execSilent('npm -v').then((execResult) => {
      expect(execResult.stdout).to.match(/[0-9\.]*/)
    })
  })
  it('should stream a shell execution', function() {
    let execStreamingResponse = smartshell.execStreaming('npm -v')
    execStreamingResponse.childProcess.stdout.on('data', (data) => {
      console.log('Received ' + data)
    })
    return execStreamingResponse.finalPromise
  })
})
