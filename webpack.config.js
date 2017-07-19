const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

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
			loader: 'babel',
			query: {
				presets: ['react']
			}
		}]
	}
}