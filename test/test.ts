import { expect, tap } from 'tapbundle'

import * as smartshell from '../dist/index'

let testSmartshell: smartshell.Smartshell


tap.test('smartshell should run async', async () => {
  this.timeout(1000000)
  return smartshell.exec('npm -v').then((execResult) => {
    expect(execResult.stdout).to.match(/[0-9\.]*/)
  })
})
tap.test('smartshell should run async and silent', async () => {
  return smartshell.execSilent('npm -v').then((execResult) => {
    expect(execResult.stdout).to.match(/[0-9\.]*/)
  })
})
tap.test('smartshell should stream a shell execution', async () => {
  let execStreamingResponse = smartshell.execStreaming('npm -v')
  execStreamingResponse.childProcess.stdout.on('data', (data) => {
    console.log('Received ' + data)
  })
  return execStreamingResponse.finalPromise
})
tap.test('smartshell should create a Smartshell instance', async () => {
  testSmartshell = new smartshell.Smartshell({
    executor: 'bash',
    sourceFilePaths: []
  })
  expect(testSmartshell).to.be.instanceof(smartshell.Smartshell)
})

tap.test('smartshell should run async', async () => {
  return testSmartshell.execSilent('sleep 1 && npm -v').then(async (execResult) => {
    console.log(execResult.stdout)
  })
})

tap.start()
