const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  plugins: [
    // require('stylelint')(),
    require('postcss-cssnext'),    
    require('postcss-import')(),
    require('autoprefixer')('last 2 versions'),
  ].concat(DEBUG ? [
    require('postcss-reporter')(),
    require('postcss-browser-reporter')(),
  ] : []),
}
