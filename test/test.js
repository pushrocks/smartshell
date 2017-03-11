"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    it('should run async', function () {
        return testSmartshell.execSilent('sleep 1 && npm -v').then((execResult) => __awaiter(this, void 0, void 0, function* () {
            console.log(execResult.stdout);
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdCQUFxQjtBQUNyQix5Q0FBa0M7QUFFbEMsNENBQTJDO0FBRTNDLElBQUksY0FBcUMsQ0FBQTtBQUV6QyxRQUFRLENBQUMsWUFBWSxFQUFFO0lBQ3JCLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVU7WUFDL0Msa0JBQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNoRCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLDZCQUE2QixFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVU7WUFDckQsa0JBQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNoRCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLGlDQUFpQyxFQUFFO1FBQ3BDLElBQUkscUJBQXFCLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM5RCxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJO1lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQTtJQUMzQyxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtRQUN4QyxjQUFjLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3pDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLGVBQWUsRUFBRSxFQUFFO1NBQ3BCLENBQUMsQ0FBQTtRQUNGLGtCQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLGtCQUFrQixFQUFFO1FBQ3JCLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sVUFBVTtZQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNoQyxDQUFDLENBQUEsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9