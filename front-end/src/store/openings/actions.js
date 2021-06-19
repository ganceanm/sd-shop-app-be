export const GET_OPENINGS = 'GET_OPENINGS';
export const getOpenings = (date) => (dispatch, getState, { jsonApi }) => 
	jsonApi()
		.get(`openings?from=${date}&days=7`)
		.then((res) => {
			dispatch({
				type: GET_OPENINGS,
				payload: res.data.list,
			});
			return Promise.resolve()
		})


export const GET_OPENING_RULES = 'GET_OPENING_RULES';
export const getRules = (date) => (dispatch, getState, { jsonApi }) => 
	jsonApi()
		.get('openings/rules')
		.then((res) => {
			dispatch({
				type: GET_OPENING_RULES,
				payload: res.data,
			});
			return Promise.resolve()
		});


export const DELETE_RULE = 'DELETE_RULE';
export const deleteRule = (data) => (dispatch, getState, { jsonApi }) => jsonApi()
	.put('openings/rules', { delete: data })
	.then((res) =>  res);

export const NEW_RULE = 'NEW_RULE';
export const createRule = (data) => (dispatch, getState, { jsonApi }) =>
	 jsonApi()
		.put('openings/rules', { create: data })
		.then((res) => res) 

export const UPDATE_RULE = 'UPDATE_RULE';
export const updateRule = (data) => (dispatch, getState, { jsonApi }) => {
	return jsonApi()
		.put('openings/rules', { update: data })
		.then((res) => res);
};
