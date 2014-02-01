var fs = require('fs')
var async = require('async')
var path = require('path')

module.exports = function (dir, cb) {
  async.waterfall([
    function (next) {
      fs.readdir(dir, next)
    },
    function (files, next) {
      var paths = files.map(function (file) { return path.join(dir,file) })
      async.map(paths, fs.stat, function (er, stats) {
        next(er, files, stats)
      })
    },
    function (files, stats, next) {
      var largest = stats
        .filter(function (stat) { return stat.isFile() })
        .reduce(function (prev, next) {
          if (prev.size > next.size) return prev
          return next
        })

      next(null, files[stats.indexOf(largest)])
    }
  ], cb)
}

module.exports('./dir-a', console.log)
