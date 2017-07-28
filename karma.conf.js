var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {

	config.set({

		basePath: '',

		frameworks: ['mocha'],

		files: [
			'src/tests/*.js'
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

		// browsers: ['Chrome', 'Firefox'],

		singleRun: false,

		concurrency: Infinity
	})

}