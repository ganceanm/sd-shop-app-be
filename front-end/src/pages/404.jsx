import React from 'react';

import { PageNotFound, NetworkError, Unauthorized } from 'views/_Error';

const ErrorPage = (props) => {
	const { status } = props;

	if (status === 'NETWORK_ERROR' || status === 'INTERNAL_SERVER_ERROR') {
		return <NetworkError {...props} />;
	}

	if (status === 'UNAUTHORIZED') {
		return <Unauthorized {...props} />;
	}

	return <PageNotFound {...props} />;
};

export default ErrorPage;
