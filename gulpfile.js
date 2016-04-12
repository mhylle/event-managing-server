/**
 * Created by mah on 11-04-2016.
 */
var gulp = require('gulp');
var exec = require('child_process').exec;

function runCommand(command) {
    return function (cb) {
        exec(command, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    }
}

//Running mongo
//http://stackoverflow.com/a/28048696/46810
gulp.task('start-mongo', runCommand('mongod.exe --dbpath ./data/'));
gulp.task('stop-mongo', runCommand('mongo --eval "use admin; db.shutdownServer();"'));
gulp.task('start-app', runCommand('node index.js'));