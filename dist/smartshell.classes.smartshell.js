"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smartshellWrap = require("./smartshell.wrap");
class Smartshell {
    constructor(optionsArg) {
        this.sourceFileArray = [];
        this.executor = optionsArg.executor;
        for (let sourceFilePath of optionsArg.sourceFilePaths) {
            this.sourceFileArray.push(sourceFilePath);
        }
    }
    addSourceFiles(sourceFilePathsArray) {
        for (let sourceFilePath of sourceFilePathsArray) {
            this.sourceFileArray.push(sourceFilePath);
        }
    }
    cleanSourceFiles() {
        this.sourceFileArray = [];
    }
    /**
     * executes silently and returns IExecResult
     * @param commandArg
     */
    execSilent(commandArg) {
        let execCommand = this.createExecString(commandArg);
        return smartshellWrap.execSilent(commandArg);
    }
    /**
     * creates the final sourcing string
     * @param commandArg
     */
    createExecString(commandArg) {
        if (this.executor === 'bash') {
            let sourceString = '';
            for (let sourceFilePath of this.sourceFileArray) {
                sourceString = sourceString + `source ${sourceFilePath} && `;
            }
            return `bash -c '${sourceString} ${commandArg}'`;
        }
        else {
            return commandArg;
        }
    }
}
exports.Smartshell = Smartshell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzaGVsbC5jbGFzc2VzLnNtYXJ0c2hlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHNoZWxsLmNsYXNzZXMuc21hcnRzaGVsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG9EQUFtRDtBQVVuRDtJQUdFLFlBQWEsVUFBd0M7UUFEckQsb0JBQWUsR0FBYSxFQUFFLENBQUE7UUFFNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFBO1FBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksY0FBYyxJQUFJLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzNDLENBQUM7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLG9CQUE4QjtRQUMzQyxHQUFHLENBQUEsQ0FBQyxJQUFJLGNBQWMsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDM0MsQ0FBQztJQUNILENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLFVBQWtCO1FBQzNCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNuRCxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssZ0JBQWdCLENBQUUsVUFBVTtRQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFBO1lBQ3JCLEdBQUcsQ0FBQyxDQUFDLElBQUksY0FBYyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxZQUFZLEdBQUcsWUFBWSxHQUFHLFVBQVUsY0FBYyxNQUFNLENBQUE7WUFDOUQsQ0FBQztZQUNELE1BQU0sQ0FBQyxZQUFZLFlBQVksSUFBSSxVQUFVLEdBQUcsQ0FBQTtRQUNsRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsVUFBVSxDQUFBO1FBQ25CLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUE1Q0QsZ0NBNENDIn0=