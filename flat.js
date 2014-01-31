var fs = require('fs')

function getLargestFile (files, stats, next) {
  var largest = stats
    .filter(function (stat) { return stat.isFile() })
    .reduce(function (prev, next) {
      if (prev.size > next.size) return prev
      return next
    })

  return files[stats.indexOf(largest)]
}

function getStats (paths, cb) {
  var counter = paths.length
  var called = false
  var stats = []

  paths.forEach(function (path, index) {
    fs.stat(path, function (er, stat) {
      if (called) return
      if (er) {
        called = true
        return cb(er)
      }

      stats[index] = stat
      if (--counter == 0) cb(null, stats)
    })
  })
}

module.exports = function (dir, cb) {
  fs.readdir(dir, function (er, files) {
    if (er) return cb(er)
    var paths = files.map(function (file) { return dir+'/'+file })

    getStats(paths, function (er, stats) {
      if (er) return cb(er)

      var largestFile = getLargestFile(files, stats)
      cb(null, largestFile)
    })
  })
}

module.exports('./dir-a', console.log)
