"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartshell.plugins");
exports.exec = (commandStringArg) => {
    let done = plugins.smartq.defer();
    plugins.shelljs.exec(commandStringArg, { async: true }, (code, stdout, stderr) => {
        done.resolve({
            exitCode: code,
            stdout: stdout
        });
    });
    return done.promise;
};
exports.execSilent = (commandStringArg) => {
    let done = plugins.smartq.defer();
    plugins.shelljs.exec(commandStringArg, {}, () => {
    });
    return done.promise;
};
exports.execSync = () => {
};
exports.execSyncSilent = () => {
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUErQztBQVNwQyxRQUFBLElBQUksR0FBRyxDQUFDLGdCQUF3QjtJQUN6QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBZSxDQUFBO0lBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFVSxRQUFBLFVBQVUsR0FBRyxDQUFDLGdCQUF3QjtJQUMvQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBZSxDQUFBO0lBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFDLEVBQUUsRUFBRTtJQUUxQyxDQUFDLENBQUMsQ0FBQTtJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3JCLENBQUMsQ0FBQTtBQUVVLFFBQUEsUUFBUSxHQUFHO0FBRXRCLENBQUMsQ0FBQTtBQUVVLFFBQUEsY0FBYyxHQUFHO0FBRTVCLENBQUMsQ0FBQSJ9