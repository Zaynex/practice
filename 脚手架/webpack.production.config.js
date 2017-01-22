const webpack = require("webpack");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + '/app/main.js',
	output: {
		path: __dirname + '/build',
		filename: "bundle.js"	
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json'
			},{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
			}
		]
	},
	postcss: [
		require('autoprefixer')
	],

	plugins: [
		// new HtmlWebpackPlugin({
		// 	template: __dirname + '/app/index.tmpl.html'
		// }),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new ExtractTextPlugin("[name]-[hash].css")
	],

	devServer: {
		contentBase: './public', //本地服务器加载的页面的所在目录
		colors: true,
		historyApiFallback: true,
		inline: true, //实时刷新
		port: 8080 //默认端口，也可以不写
	}

}