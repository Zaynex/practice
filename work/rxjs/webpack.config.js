const webpack = require('webpack')
const resolve = require('path').resolve
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DEBUG = process.env.NODE_ENV !== 'production'
const path = require('path')
const SRC = './src'
const DEST = './dist'

module.exports = {
  cache: true,

  context: __dirname,

  entry: {
    // JavaScript
    'assets/js/bundle': `${SRC}/js/app.ts`,
    // CSS
    'assets/css/app': `${SRC}/css/app.js`
  },

  output: {
    path: resolve(__dirname, DEST),
    filename: '[name].[chunkHash:5].js',
    pathinfo: DEBUG ? true : false,
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: DEBUG
                ? {
                  url: false,
                  sourceMap: true,
                  importLoaders: 1
                } :
                {
                  url: false
                }
            },
            {
              loader: 'postcss-loader',
              options: DEBUG
                ? { sourceMap: 'inline' }
                : {}
            },
          ]
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              cacheDirectory: true
            }
          }
        ]
      },
       {
        test: /\.ts$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      { 
         test: /bootstrap\/dist\/js\/umd\//, 
         loader: 'imports?jQuery=jquery' 
      }
    ],
    
  },

  resolve: {
    modules: [ path.join(__dirname, 'src'), 'node_modules' ],
    extensions: ['.js', '.jsx', '.ts'],
    alias: {
      'bootstrap': path.join(process.cwd(), 'node_modules/bootstrap/dist/js/npm.js'),
      'bootstrap.min.css': path.join(process.cwd(), 'node_modules/bootstrap/dist/css/bootstrap.min.css')
    }
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: __dirname + '/src/html/index.html',
      inject: 'true'
    }),
    // Delete old files when compiling
    new CleanWebpackPlugin([ DEST ]),

    // Extract to .css
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true // preserve source maps
    }),

    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),

    // Compress React (and others)
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),

    // Copying files directly
    new CopyWebpackPlugin([
      { from: `${SRC}/assets`, to: './assets' },
      { from: `${SRC}/html`, to: '.' },
    ]),
  ].concat(DEBUG ? [
    // LiveReload in development
    new LiveReloadPlugin({
      appendScriptTag: true
    }),

    // Debug mode for old webpack plugins
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ] : []),

  // Hide source maps in production (no sourceMappingURL)
  devtool: DEBUG ? 'source-map' : 'hidden-source-map',

  // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/35
  stats: stats(),

  devServer: {
    stats: stats()
  },
}

function stats () {
  return {
    children: false,
    chunks: false,
    assetsSort: 'name',
  }
}
