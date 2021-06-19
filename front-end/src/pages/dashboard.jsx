/* eslint-disable no-useless-catch */
import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/Dashboard';
import { withErrorPage } from 'components/error';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';

const Dashboard = (props) => <Page {...props} />;

Dashboard.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		defaultNamespace: 'dashboard',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default withErrorPage(Dashboard);
