/* eslint-disable no-useless-catch */
import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/SignIn';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';

const SignIn = (props) => <Page {...props} />;

SignIn.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: false, url: '/' }, ctx);
	} catch (error) {
		throw error;
	}

	return {
		defaultNamespace: 'sign-in',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default SignIn;
