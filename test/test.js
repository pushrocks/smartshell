"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-test");
const smartchai_1 = require("smartchai");
const smartshell = require("../dist/index");
let testSmartshell;
describe('smartshell', function () {
    it('it should run async', function () {
        this.timeout(1000000);
        return smartshell.exec('npm -v').then((execResult) => {
            smartchai_1.expect(execResult.stdout).to.match(/[0-9\.]*/);
        });
    });
    it('should run async and silent', function () {
        return smartshell.execSilent('npm -v').then((execResult) => {
            smartchai_1.expect(execResult.stdout).to.match(/[0-9\.]*/);
        });
    });
    it('should stream a shell execution', function () {
        let execStreamingResponse = smartshell.execStreaming('npm -v');
        execStreamingResponse.childProcess.stdout.on('data', (data) => {
            console.log('Received ' + data);
        });
        return execStreamingResponse.finalPromise;
    });
    it('should create a Smartshell instance', function () {
        testSmartshell = new smartshell.Smartshell({
            executor: 'bash',
            sourceFilePaths: []
        });
        smartchai_1.expect(testSmartshell).to.be.instanceof(smartshell.Smartshell);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBcUI7QUFDckIseUNBQWtDO0FBRWxDLDRDQUEyQztBQUUzQyxJQUFJLGNBQXFDLENBQUE7QUFFekMsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUNyQixFQUFFLENBQUMscUJBQXFCLEVBQUU7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVO1lBQy9DLGtCQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDaEQsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtRQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVO1lBQ3JELGtCQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDaEQsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtRQUNwQyxJQUFJLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDOUQscUJBQXFCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSTtZQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUNqQyxDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUE7SUFDM0MsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMscUNBQXFDLEVBQUU7UUFDeEMsY0FBYyxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUN6QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixlQUFlLEVBQUUsRUFBRTtTQUNwQixDQUFDLENBQUE7UUFDRixrQkFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=