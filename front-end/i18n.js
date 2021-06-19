module.exports = {
	logBuild: false,

	loader: false,
	locales: ['hu', 'en'],
	defaultLocale: 'hu',
	loadLocaleFrom: (lang, ns) =>
		import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default),

	pages: {
		'*': ['global', 'error', 'components'],
		'/': ['home'],
		'/404': ['404'],
		'/sign-in': ['sign-in'],
		'/sign-up': ['sign-up'],
		'/dashboard': ['dashboard'],
		'/profile': ['profile'],
		'/credit': ['credit'],
	},
};
