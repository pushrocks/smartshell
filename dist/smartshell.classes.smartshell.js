"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Smartshell {
    constructor(optionsArg) {
        this.sourceFiles = [];
        for (let sourceFilePath of optionsArg.sourceFilePaths) {
            this.sourceFiles.push(sourceFilePath);
        }
    }
    addSourceFiles(sourceFilePathsArray) {
        for (let sourceFilePath of sourceFilePathsArray) {
            this.sourceFiles.push(sourceFilePath);
        }
    }
    cleanSourceFiles() {
        this.sourceFiles = [];
    }
}
exports.Smartshell = Smartshell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzaGVsbC5jbGFzc2VzLnNtYXJ0c2hlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHNoZWxsLmNsYXNzZXMuc21hcnRzaGVsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdBO0lBRUUsWUFBYSxVQUF3QztRQURyRCxnQkFBVyxHQUFhLEVBQUUsQ0FBQTtRQUV4QixHQUFHLENBQUMsQ0FBQyxJQUFJLGNBQWMsSUFBSSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN2QyxDQUFDO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxvQkFBOEI7UUFDM0MsR0FBRyxDQUFBLENBQUMsSUFBSSxjQUFjLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFDdkIsQ0FBQztDQUNGO0FBakJELGdDQWlCQyJ9