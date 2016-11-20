# rollup-loader

[WIP] Coming soon.

## Example

```javascript
module: {
  loaders: [
    {
      test: /\.js$/,
      loaders: ['rollup'],
      exclude: [/node_modules/]
    }
  ],
},
rollup: {
  external(id) {
    const split = id.split('/')
    const {dependencies} = require('./package.json')
    return split[0] in dependencies ||
      split.slice(0, 2).join('/') in dependencies
  },
  plugins: [
    require('rollup-plugin-babel')({
      exclude: 'node_modules/**',
      preset: ['es2015-rollup']
    })
  ]
}
// or use babel-loader if you like
// loaders: ['rollup', 'babel']
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
