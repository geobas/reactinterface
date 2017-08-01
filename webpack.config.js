const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');

module.exports = {

	entry: path.resolve(__dirname, './src/js'),

	output: {
		path: path.resolve(__dirname, './build/assets'),
		publicPath: "assets",
		filename: "app.js"
	},

	devServer: {
		inline: true,
		contentBase: './build',
		port: 3000
	},

	plugins: [
		new OpenBrowserPlugin({ url: 'http://localhost:3000' })
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				include: __dirname,
				query: {
					presets: ['es2015', 'react', 'stage-0']
				}
			},
            // {
            //     test: /\.json$/,
            //     exclude: /(node_modules)/,
            //     loader: 'json-loader'
            // },
		]
	},

	// required by enzyme
	externals: {
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true,
		'react-addons-test-utils': 'react-dom',
	},

	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
	   })
	]

}