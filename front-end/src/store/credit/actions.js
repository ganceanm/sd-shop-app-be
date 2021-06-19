export const GIVE_CREDIT = 'GIVE_CREDIT';
export const giveCredit = (data) => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.post(`payments/${data.id}`, { value: data.value })
		.then((res) => {
			dispatch({
				type: GIVE_CREDIT,
				payload: res.data,
			});
		});
