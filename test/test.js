"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-test");
const smartchai_1 = require("smartchai");
const smartshell = require("../dist/index");
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBcUI7QUFDckIseUNBQWtDO0FBRWxDLDRDQUEyQztBQUUzQyxRQUFRLENBQUMsWUFBWSxFQUFFO0lBQ3JCLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVU7WUFDL0Msa0JBQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNoRCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLDZCQUE2QixFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVU7WUFDckQsa0JBQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNoRCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLGlDQUFpQyxFQUFFO1FBQ3BDLElBQUkscUJBQXFCLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM5RCxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJO1lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQTtJQUMzQyxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=