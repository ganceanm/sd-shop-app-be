import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/TimeSheet';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';
import {
	getOpenings, getRules
} from 'store/openings/actions';
import * as moment from 'moment';



const TimeSheetPage = (props) => <Page {...props} />;

TimeSheetPage.getInitialProps = async (ctx) => {
	const {store} = ctx;
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
		await Promise.all([
			store.dispatch(getOpenings(moment(new Date()).format('YYYY-MM-DD'))),
			store.dispatch(getRules())
		])
	} catch (error) {
		throw error;
	}
	return {
		defaultNamespace: 'timesheet',
		...(await loadLocaleFromCtx(ctx))
	};
};

export default TimeSheetPage;
