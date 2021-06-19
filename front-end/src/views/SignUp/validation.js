import * as Yup from 'yup';

export const validation = Yup.object().shape({
    firstName: Yup.string().required('form.required'),
    lastName: Yup.string().required('form.required'),
    email: Yup.string().email('form.email').required('form.required'),
    phone: Yup.number().required('form.required'),
    password: Yup.string().required('form.required'),
    passwordCheck: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
        .required('form.required'),
});