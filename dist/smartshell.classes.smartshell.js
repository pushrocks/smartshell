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
        return __awaiter(this, void 0, void 0, function* () {
            let execCommand = this.createExecString(commandArg);
            return yield smartshellWrap.execSilent(commandArg);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzaGVsbC5jbGFzc2VzLnNtYXJ0c2hlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHNoZWxsLmNsYXNzZXMuc21hcnRzaGVsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0Esb0RBQW1EO0FBVW5EO0lBR0UsWUFBYSxVQUF3QztRQURyRCxvQkFBZSxHQUFhLEVBQUUsQ0FBQTtRQUU1QixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUE7UUFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxjQUFjLElBQUksVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDM0MsQ0FBQztJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsb0JBQThCO1FBQzNDLEdBQUcsQ0FBQSxDQUFDLElBQUksY0FBYyxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUMzQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFBO0lBQzNCLENBQUM7SUFFRDs7O09BR0c7SUFDRyxVQUFVLENBQUUsVUFBa0I7O1lBQ2xDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNuRCxNQUFNLENBQUMsTUFBTSxjQUFjLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3BELENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNLLGdCQUFnQixDQUFFLFVBQVU7UUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQTtZQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFJLGNBQWMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsWUFBWSxHQUFHLFlBQVksR0FBRyxVQUFVLGNBQWMsTUFBTSxDQUFBO1lBQzlELENBQUM7WUFDRCxNQUFNLENBQUMsWUFBWSxZQUFZLElBQUksVUFBVSxHQUFHLENBQUE7UUFDbEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLFVBQVUsQ0FBQTtRQUNuQixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBNUNELGdDQTRDQyJ9