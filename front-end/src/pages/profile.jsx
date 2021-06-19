import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/Profile';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';

const Profile = (props) => <Page {...props} />;

Profile.getInitialProps = async (ctx) => {
	// ide fog kelleni a try-catch
	// eslint-disable-next-line no-useless-catch
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		defaultNamespace: 'profile',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default Profile;
