import { HYDRATE } from 'next-redux-wrapper';
import { GIVE_CREDIT } from './actions';

const INITIAL_STATE = {
	value: '',
};

export const credit = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.credit };
		case GIVE_CREDIT:
			return action.payload;
		default:
			return state;
	}
};

export default credit;
