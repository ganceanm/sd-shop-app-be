import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/Home';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';

const Index = (props) => <Page {...props} />;

Index.getInitialProps = async (ctx) => {
	// ide fog kelleni a try-catch
	// eslint-disable-next-line no-useless-catch
	try {
		await pageRedirect({ auth: false, url: '/dashboard' }, ctx);
	} catch (error) {
		throw error;
	}

	return {
		defaultNamespace: 'home',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default Index;
