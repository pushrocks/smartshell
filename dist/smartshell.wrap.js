"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartshell.plugins");
/**
 * executes a given command async
 * @param commandStringArg
 */
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
/**
 * executes a given command async and silent
 * @param commandStringArg
 */
exports.execSilent = (commandStringArg) => {
    let done = plugins.smartq.defer();
    plugins.shelljs.exec(commandStringArg, { async: true, silent: true }, (code, stdout, stderr) => {
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
exports.execStreaming = (commandStringArg) => {
    let childProcessEnded = plugins.smartq.defer();
    let execChildProcess = plugins.shelljs.exec(commandStringArg, { async: true, silent: true }, (code, stdout, stderr) => {
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
/**
 * executes a command and returns promise that will be fullfilled once an putput line matches RegexArg
 * @param commandStringArg
 * @param regexArg
 */
exports.execAndWaitForLine = (commandStringArg, regexArg) => {
    let done = plugins.smartq.defer();
    let execStreamingResult = exports.execStreaming(commandStringArg);
    execStreamingResult.childProcess.stdout.on('data', (stdOutChunk) => {
        if (regexArg.test(stdOutChunk)) {
            done.resolve();
        }
    });
    return done.promise;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzaGVsbC53cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzaGVsbC53cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQStDO0FBc0IvQzs7O0dBR0c7QUFDUSxRQUFBLElBQUksR0FBRyxDQUFDLGdCQUF3QjtJQUN6QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBZSxDQUFBO0lBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQzNFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLFVBQVUsR0FBRyxDQUFDLGdCQUF3QjtJQUMvQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBZSxDQUFBO0lBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU07UUFDekYsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3JCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxhQUFhLEdBQUcsQ0FBQyxnQkFBd0I7SUFDbEQsSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBZSxDQUFBO0lBQzNELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTTtRQUM5RyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDeEIsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDO1FBQ0wsWUFBWSxFQUFFLGdCQUFnQjtRQUM5QixZQUFZLEVBQUUsaUJBQWlCLENBQUMsT0FBTztLQUN4QyxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQ7Ozs7R0FJRztBQUNRLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxnQkFBd0IsRUFBRSxRQUFnQjtJQUN6RSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2pDLElBQUksbUJBQW1CLEdBQUcscUJBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3pELG1CQUFtQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQW1CO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNoQixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsS0FBSyxHQUFHLENBQUMsR0FBVztJQUM3QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQVk7UUFDbkMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUEifQ==