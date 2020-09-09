const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		port: 8081
	},
	externals: {
		config: JSON.stringify({
			apiUrl: 'http://localhost:8080'
		})
	}
});
