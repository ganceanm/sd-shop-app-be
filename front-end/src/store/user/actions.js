export const GET_USERS = 'GET_USERS';
export const getUsers = () => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.get('users')
		.then((res) => {
			dispatch({
				type: GET_USERS,
				payload: res.data,
			});
			return Promise.resolve();
		});

export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const setProfile = (data) => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.put(`users/${data.id}`, data.details)
		.then(() => Promise.resolve());
