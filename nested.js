var fs = require('fs')
var path = require('path')

module.exports = function (dir, cb) {
  fs.readdir(dir, function (er, files) {
    if (er) return cb(er)
    var counter = files.length
    var called = false
    var stats = []

    files.forEach(function (file, index) {
      fs.stat(path.join(dir,file), function (er, stat) {
        if (called) return
        if (er) {
          called = true
          return cb(er)
        }
        stats[index] = stat

        if (--counter == 0) {
          var largest = stats
            .filter(function (stat) { return stat.isFile() })
            .reduce(function (prev, next) {
              if (prev.size > next.size) return prev
              return next
            })

          cb(null, files[stats.indexOf(largest)])
        }
      })
    })
  })
}

module.exports('./dir-a', console.log)
