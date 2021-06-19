import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/SignUp';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';

const SignUp = (props) => <Page {...props} />;

SignUp.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: false, url: '/dashboard' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		defaultNamespace: 'sign-up',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default SignUp;
