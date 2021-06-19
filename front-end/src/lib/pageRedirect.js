/* eslint-disable prefer-promise-reject-errors */

const pageRedirect = async ({ auth = null, url = null }, ctx) =>
	new Promise((resolve, reject) => {
		const { store, res } = ctx;

		// -- Redirect --//
		const redirectHandler = () => {
			if (res) {
				return res.writeHead(302, { Location: url }).end();
			}

			return window.scrollTo(0, 0);
		};

		// -- Check redirect type --//
		const { isSignedIn } = store.getState().auth;

		switch (auth) {
			case true:
				if (!isSignedIn) {
					if (url) {
						return redirectHandler();
					}
					return reject({ code: 'UNAUTHORIZED' });
				}
				break;
			case false:
				if (isSignedIn) {
					if (url) {
						return redirectHandler();
					}
					return reject({ code: 'AUTHORIZED' });
				}
				break;
			default:
				if (url) {
					return redirectHandler();
				}
				return resolve();
		}

		return resolve();
	});

export default pageRedirect;
