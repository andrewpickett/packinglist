const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?limit=10000&name=img/[name].[ext]' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './index.html'),
			filename: 'index.html',
			inject: 'body'
		})
	]
};
