const env = require('./env');
const i18n = require('./i18n');

module.exports = {
	publicRuntimeConfig: env.publicRuntimeConfig,
	useFileSystemPublicRoutes: true,
	pageExtensions: ['jsx'],
	webpack: (config) => config,
	webpackDevMiddleware: (config) => {
		// eslint-disable-next-line no-param-reassign
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};

		return config;
	},
	i18n: {
		locales: i18n.locales,
		defaultLocale: i18n.defaultLocale,
		localeDetection: false,
	},
	async redirects() {
		return [
			{
				source: '/home',
				destination: '/',
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://nest:3300/v1/api/:path*',
			},
		];
	},
};
