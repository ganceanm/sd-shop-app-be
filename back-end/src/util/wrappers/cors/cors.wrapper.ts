/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from './cors.lib';

const whitelist = [
	'http://localhost:3000',
	'http://localhost',
	'http://next',
	'https://next',
	'http://159.89.101.123',
	'https://159.89.101.123',
	'http://squash.smartitory.com',
	'https://squash.smartitory.com',
];

const corsDisabledEndpoints = [
	/\/v1\/api\/files\/img\/(.*)/g,
	/\/v1\/api\/files\/docs\/(.*)/g,
	/\/docs/g,
	/\/docs\/(.*)/g,
];

const corsOptions = {
	origin: function (origin, callback, req) {
		if (req.headers['x-api-key'] === process.env.API_KEY) {
			callback(null, true);
		} else if (whitelist.includes(origin) || process.env.MODE === 'DEV') {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
	preflightContinue: false,
};

const checkIfNoOriginAllowed = (url: string) => {
	if (url.includes('files') || url.includes('docs')) {
		for (let index = 0; index < corsDisabledEndpoints.length; index++) {
			if (url.match(corsDisabledEndpoints[index])) {
				return true;
			}
		}
		return false;
	}
	return false;
};

export default () => {
	return cors(corsOptions, checkIfNoOriginAllowed);
};
