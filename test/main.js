var test = require('tap').test
var fs = require('fs')
var path = require('path').resolve(__dirname,'../')
var modnames = fs.readdirSync(path).filter(function (file) { return /\.js$/.test(file) })

console.error('Requires Node 0.11.2 or greater with --harmony flag to run generator tests')

test('file-b wins', function (t) {
  t.plan(modnames.length)

  modnames.forEach(function (name) {
    var mod = require('../'+name)
    console.log('executing',name)

    var p = mod(path+'/dir-a', function (er, filename) {
      t.equal(filename, 'file-b', name+' should work')
    })

    if (p && p.then) {
      p.then(function (filename) {
        t.equal(filename, 'file-b', name+' should work')
      })
    }
  })
})
