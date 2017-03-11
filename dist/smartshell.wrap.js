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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzaGVsbC53cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzaGVsbC53cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQStDO0FBc0IvQzs7O0dBR0c7QUFDUSxRQUFBLElBQUksR0FBRyxDQUFDLGdCQUF3QjtJQUN6QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBZSxDQUFBO0lBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQzNFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLFVBQVUsR0FBRyxDQUFDLGdCQUF3QjtJQUMvQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBZSxDQUFBO0lBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU07UUFDekYsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3JCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxhQUFhLEdBQUcsQ0FBQyxnQkFBd0I7SUFDbEQsSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBZSxDQUFBO0lBQzNELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTTtRQUM5RyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDeEIsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDO1FBQ0wsWUFBWSxFQUFFLGdCQUFnQjtRQUM5QixZQUFZLEVBQUUsaUJBQWlCLENBQUMsT0FBTztLQUN4QyxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLEtBQUssR0FBRyxDQUFDLEdBQVc7SUFDN0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFZO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBIn0=