var basepath = process.cwd();
var cache = { };

function cwd() {
  return basepath;
}

function chdir(directory) {
  basepath = directory;
}

function load(type, path, callback) {
  var key = type + ':' + path;

  var value = cache[key];
  if (value) {
    return callback(null, value);
  }

  try {
    var loader = require('resload-' + type);
  } catch (error) {
    return callback(error);
  }

  loader(path, function(error, value) {
    if (error) {
      return callback(error);
    }

    cache[key] = value;
    callback(null, value);
  });
}

module.exports.cwd = cwd;
module.exports.chdir = chdir;
module.exports.load = load;
