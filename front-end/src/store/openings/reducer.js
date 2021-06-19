import { GET_OPENINGS, GET_OPENING_RULES } from './actions';
import { HYDRATE } from 'next-redux-wrapper';


const INITIAL_STATE = {
	openings: [],
	rules: [],
};

export const openings = (state = INITIAL_STATE, action) => {
	switch (action.type) {	
		case HYDRATE:
			return action.payload.openings;
		case GET_OPENINGS:
			return { ...state, openings: action.payload };
		case GET_OPENING_RULES:
			return { ...state, rules: action.payload };
		default:
			return state;
	}
};
