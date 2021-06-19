import * as Yup from 'yup'

export const validation = Yup.object().shape({
    firstName: Yup.string().required('form.required'),
    lastName: Yup.string().required('form.required'),
    email: Yup.string().email('form.email').required('form.required'),
    phone: Yup.number().required('form.required'),
});