"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartshell.plugins");
/**
 * import path
 */
let importPath = (stringArg) => {
    if (process.env.SMARTSHELL_PATH) {
        let commandResult = `PATH=${process.env.SMARTSHELL_PATH} && ${stringArg}`;
        // console.log(commandResult)
        return commandResult;
    }
    else {
        return stringArg;
    }
};
/**
 * executes a given command async
 * @param commandStringArg
 */
exports.exec = (commandStringArg) => {
    let done = plugins.smartq.defer();
    plugins.shelljs.exec(importPath(commandStringArg), { async: true }, (code, stdout, stderr) => {
        if (stderr) {
            console.log('StdErr found:');
            console.log(stderr);
            done.reject(stderr);
            return;
        }
        done.resolve({
            exitCode: code,
            stdout: stdout
        });
    });
    return done.promise;
};
/**
 * executes a given command async and silent
 * @param commandStringArg
 */
exports.execSilent = (commandStringArg) => {
    let done = plugins.smartq.defer();
    plugins.shelljs.exec(importPath(commandStringArg), { async: true, silent: true }, (code, stdout, stderr) => {
        if (stderr && stderr !== '') {
            console.log('StdErr found:');
            console.log(stderr);
            done.reject(stderr);
            return;
        }
        done.resolve({
            exitCode: code,
            stdout: stdout
        });
    });
    return done.promise;
};
/**
 * executes a command and allws you to stream output
 */
exports.execStreaming = (commandStringArg, silentArg = false) => {
    let childProcessEnded = plugins.smartq.defer();
    let execChildProcess = plugins.shelljs.exec(importPath(commandStringArg), { async: true, silent: silentArg }, (code, stdout, stderr) => {
        childProcessEnded.resolve({
            exitCode: code,
            stdout: stdout
        });
    });
    return {
        childProcess: execChildProcess,
        finalPromise: childProcessEnded.promise
    };
};
exports.execStreamingSilent = (commandStringArg) => {
    return exports.execStreaming(commandStringArg, true);
};
/**
 * executes a command and returns promise that will be fullfilled once an putput line matches RegexArg
 * @param commandStringArg
 * @param regexArg
 */
exports.execAndWaitForLine = (commandStringArg, regexArg, silentArg = false) => {
    let done = plugins.smartq.defer();
    let execStreamingResult = exports.execStreaming(commandStringArg, silentArg);
    execStreamingResult.childProcess.stdout.on('data', (stdOutChunk) => {
        if (regexArg.test(stdOutChunk)) {
            done.resolve();
        }
    });
    return done.promise;
};
exports.execAndWaitForLineSilent = (commandStringArg, regexArg) => {
    exports.execAndWaitForLine(commandStringArg, regexArg, true);
};
/**
 * get a path
 */
exports.which = (cmd) => {
    let done = plugins.smartq.defer();
    plugins.which(cmd, (err, path) => {
        if (err) {
            done.reject(err);
        }
        done.resolve(path);
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzaGVsbC53cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzaGVsbC53cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQStDO0FBc0IvQzs7R0FFRztBQUNILElBQUksVUFBVSxHQUFHLENBQUMsU0FBUztJQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxhQUFhLEdBQUcsUUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsT0FBTyxTQUFTLEVBQUUsQ0FBQTtRQUN6RSw2QkFBNkI7UUFDN0IsTUFBTSxDQUFDLGFBQWEsQ0FBQTtJQUN0QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsU0FBUyxDQUFBO0lBQ2xCLENBQUM7QUFDSCxDQUFDLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLElBQUksR0FBRyxDQUFDLGdCQUF3QjtJQUN6QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBZSxDQUFBO0lBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQ3ZGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuQixNQUFNLENBQUE7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFF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