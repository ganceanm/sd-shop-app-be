import { HYDRATE } from 'next-redux-wrapper';
import { GET_USERS } from './actions';

const INITIAL_STATE = {
	users: [],
};

export const user = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.user };
		case GET_USERS:
			return { ...state, users: action.payload };
		default:
			return state;
	}
};

export default user;
