import { HYDRATE } from 'next-redux-wrapper';
import { GET_ME } from './actions';

const INITIAL_STATE = {};

export const me = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.me };
		case GET_ME:
			return action.payload;
		default:
			return state;
	}
};
