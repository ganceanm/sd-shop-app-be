import { HYDRATE } from 'next-redux-wrapper';
import { SET_ERROR, CLEAR_ERROR } from './actions';

export const error = (state = null, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.error };
		case SET_ERROR:
			return action.payload;
		case CLEAR_ERROR:
			return null;
		default:
			return state;
	}
};
