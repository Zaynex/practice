const webpack = require("webpack");

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
				loader: 'style!css?modules!postcss'
			}
		]
	},
	postcss: [
		require('autoprefixer')
	],

	plugins: [
		new webpack.BannerPlugin('Copyright Flying Unicorns inc.'),
		new webpack.HotModuleReplacementPlugin()
	],

	devServer: {
		contentBase: './public', //本地服务器加载的页面的所在目录
		colors: true,
		historyApiFallback: true,
		inline: true, //实时刷新
		hot: true, // 热更新
		port: 8080 //默认端口，也可以不写
	}

}