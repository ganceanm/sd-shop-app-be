import { combineReducers } from 'redux';
import { auth } from './auth/reducer';
import { me } from './me/reducer';
import { credit } from './credit/reducer';
import { user } from './user/reducer';
import { appointments } from './appointments/reducer';
import { error } from './error/reducer';
import { openings } from './openings/reducer';

export default combineReducers({
	auth,
	me,
	credit,
	user,
	appointments,
	error,
	openings,
});
