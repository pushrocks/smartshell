"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-test");
const smartshell = require("../dist/index");
describe('smartshell', function () {
    it('it should run async', function () {
        this.timeout(1000000);
        return smartshell.exec('npmdocker speedtest').then((execResult) => {
            console.log(execResult.stdout);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBcUI7QUFHckIsNENBQTJDO0FBRTNDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7SUFDbkIsRUFBRSxDQUFDLHFCQUFxQixFQUFFO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVO1lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQSJ9