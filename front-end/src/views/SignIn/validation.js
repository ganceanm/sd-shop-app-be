import * as yup from 'yup';

export const validation = yup.object().shape({
	email: yup.string().email('form.email').required('form.required'),
	password: yup.string().required('form.required'),
});
