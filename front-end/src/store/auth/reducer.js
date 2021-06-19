import { HYDRATE } from 'next-redux-wrapper';
import { SIGN_IN, SIGN_OUT } from './actions';

const INITIAL_STATE = {
	isSignedIn: false,
};

export const auth = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload.auth;
		case SIGN_IN:
			return { ...state, isSignedIn: true };
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default auth;
