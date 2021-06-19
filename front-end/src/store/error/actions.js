// -- Set error --//
export const SET_ERROR = 'SET_ERROR';
export const setError = (error) => (dispatch) =>
	dispatch({
		type: SET_ERROR,
		payload: error,
	});

// -- Clear error --//
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const clearError = () => (dispatch) =>
	dispatch({
		type: CLEAR_ERROR,
	});
