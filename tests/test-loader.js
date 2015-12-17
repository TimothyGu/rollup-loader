var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var expect = require('expect.js')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var requireFromString = require('require-from-string')

describe('loader', function () {
  var rollupLoader = path.resolve(__dirname, '../')
  var entry = path.resolve(__dirname, './fixtures/basic.js')
  var outputDir = path.resolve(__dirname, './output')

  beforeEach(function(done) {
    rimraf(outputDir, function(err) {
      if (err) { return done(err) }
      mkdirp(outputDir, done)
    })
  })

  it('transpile the script', function (done) {

    var config = {
      entry: entry,
      output: {
        path: outputDir,
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: rollupLoader,
            exclude: [/node_modules/]
          }
        ]
      }
    }
    webpack(config, function(err, stats) {
      expect(err).to.be(null)
      if (stats.hasErrors()) {
        return console.log(stats.toJson())
      }
      var file = fs.readFileSync(path.join(outputDir, 'bundle.js'), 'utf8')
      console.log(requireFromString(file))
      expect(requireFromString(file).hostname).to.equal('github.com')
      done()
    })
  })
})