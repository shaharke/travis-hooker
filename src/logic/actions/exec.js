var spawn = require('child_process').spawn,
    Q = require('q')

module.exports = function(config, payload, logger) {

  var deferred = Q.defer();

  var command = config.command;
  var args = config.args;
  var uid = config.uid;
  var gid = config.gid;
  var cwd = config.cwd;

  var options = {uid: uid, gid: gid, cwd: cwd}

  var execution = spawn(command, args, options);

  execution.on('close', function (code) {
    if (code !== 0) {
      deferred.reject(new Error("Execution failed with status code " + code));
    }
    deferred.resolve(code);
  });

  return deferred.promise;
}
