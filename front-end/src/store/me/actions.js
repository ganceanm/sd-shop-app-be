export const GET_ME = 'GET_ME';
export const getMe = (token) => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.get(
			'users/me',
			token ? { headers: { Cookie: `accessToken=${token}` } } : null,
		)
		.then((res) => {
			dispatch({
				type: GET_ME,
				payload: res.data,
			});
			return Promise.resolve();
		});
