import { HYDRATE } from 'next-redux-wrapper';
import { GET_APPOINTMENTS } from './actions';

const INITIAL_STATE = {
	appointments: {
		list: [
			{
				date: '2021-04-16T00:00:00.000Z',
				reserved: [
					{
						id: 'be2bfbb1-ceab-4bf0-8f5c-bf48eebcf1d1',
						begins: '2021-04-16T11:00:00.000Z',
						court: 'TWO',
					},
					{
						id: '470a250b-03ba-4737-88da-b1b6fbc6878b',
						begins: '2021-04-16T11:00:00.000Z',
						court: 'ONE',
					},
					{
						id: '4a39ecb0-caa7-4c59-bd2a-f374d37eaf7f',
						begins: '2021-04-16T12:00:00.000Z',
						court: 'TWO',
					},
				],
			},
			{
				date: '2021-04-17T00:00:00.000Z',
				reserved: [
					{
						id: 'ed4ffacd-0399-4dac-b3c9-dc674ec22eda',
						begins: '2021-04-17T08:00:00.000Z',
						court: 'TWO',
					},
					{
						id: '74012eae-e991-479d-9317-8a6b5c02f83e',
						begins: '2021-04-17T10:00:00.000Z',
						court: 'TWO',
					},
				],
			},
		],
	},
};

export const appointments = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.appointments };
		case GET_APPOINTMENTS:
			return { ...state, appointments: action.payload };
		default:
			return state;
	}
};

export default appointments;
