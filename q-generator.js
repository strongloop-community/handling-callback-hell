var fs = require('fs')
var path = require('path')
var Q = require('q')

var fs_readdir = Q.denodeify(fs.readdir)
var fs_stat = Q.denodeify(fs.stat)

module.exports = Q.async(function* (dir) {
  var files = yield fs_readdir(dir)
  var stats = yield Q.all(files.map(function (file) { return fs_stat(path.join(dir,file)) }))

  var largest = stats
    .filter(function (stat) { return stat.isFile() })
    .reduce(function (prev, next) {
      if (prev.size > next.size) return prev
      return next
    })

  return files[stats.indexOf(largest)]
})

module.exports('./dir-a').then(console.log)
