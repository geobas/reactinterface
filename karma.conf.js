var webpackConfig = require('./webpack.config.js');
process.env.PHANTOMJS_BIN = './node_modules/.bin/phantomjs';

module.exports = function(config) {

	config.set({

		basePath: '',

		frameworks: ['mocha', 'es6-shim'],

		files: [
			'src/tests/*.js',
			'node_modules/es6-shim/es6-shim.js'
		],

		preprocessors: {
			'src/tests/*.js': ['webpack'],
		},

		webpack: webpackConfig,

		reporters: ['mocha'],

        mochaReporter: {
            colors: {
                success: 'bgGreen',
                info: 'blue',
                warning: 'orange',
                error: 'bgRed'
            },
            symbols: {
                success: '+',
                info: '#',
                warning: '!',
                error: 'x'
            }
        },

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: true,

		browsers: ['PhantomJS'],

		singleRun: false,

		concurrency: Infinity,

        proxies: {
			'/assets/data.json': 'http://www.example.com',
        }
	})

}