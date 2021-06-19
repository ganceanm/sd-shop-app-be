import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { register } from 'store/auth/actions';
import {
	Box,
	makeStyles,
	TextField,
	Button,
	CardActions,
	Card,
	CardContent,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useErrorHandling } from 'components/error';
import { validation } from './validation';

const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	root: {
		height: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(6, 2),
	},

	cardContent: {
		padding: theme.spacing(3, 4, 3, 4),
	},

	fields: {
		// margin: theme.spacing(-1),
		display: 'flex',
		flexWrap: 'wrap',
	},

	passwordField: {
		marginTop: theme.spacing(1),
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
}));

const SignUp = (props) => {
	const { defaultNamespace } = props;

	const router = useRouter();
	const dispatch = useDispatch();

	const classes = useStyles();

	const { errorHandling, errorChecker } = useErrorHandling();
	const { t } = useTranslation(defaultNamespace);

	const onSubmit = async (values, { setSubmitting }) => {
		try {
			await dispatch(
				register({
					email: values.email,
					password: values.password,
					profile: {
						firstName: values.firstName,
						lastName: values.lastName,
						phone: values.phone,
					},
				}),
			).then(() => router.push('/sign-in'));
		} catch (error) {
			errorHandling(error);
			setSubmitting(false);
		}
	};

	return (
		<Box className={classes.root}>
			<Formik
				onSubmit={onSubmit}
				validationSchema={validation}
				validateOnChange
				validateOnBlur
				validateOnMount
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					password: '',
					passwordCheck: '',
				}}
			>
				{(formikProps) => {
					const {
						isSubmitting,
						values,
						handleChange,
						handleBlur,
					} = formikProps;
					return (
						<Form noValidate>
							<Card>
								<CardContent className={classes.cardContent}>
									<Box className={classes.fields}>
										<TextField
											fullWidth
											name="firstName"
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errorChecker(formikProps, 'firstName')}
											helperText={errorChecker(formikProps, 'firstName') || ' '}
											value={values.firstName}
											label={t('firstName')}
										/>
										<TextField
											fullWidth
											name="lastName"
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errorChecker(formikProps, 'lastName')}
											helperText={errorChecker(formikProps, 'lastName') || ' '}
											value={values.lastName}
											label={t('lastName')}
										/>
										<TextField
											fullWidth
											name="email"
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errorChecker(formikProps, 'email')}
											helperText={errorChecker(formikProps, 'email') || ' '}
											value={values.email}
											label={t('username')}
										/>
										<TextField
											fullWidth
											name="phone"
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errorChecker(formikProps, 'phone')}
											helperText={errorChecker(formikProps, 'phone') || ' '}
											value={values.phone}
											label={t('phone')}
										/>
										<TextField
											fullWidth
											name="password"
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errorChecker(formikProps, 'password')}
											helperText={errorChecker(formikProps, 'password') || ' '}
											value={values.password}
											label={t('password')}
											type="password"
										/>
										<TextField
											fullWidth
											name="passwordCheck"
											onChange={handleChange}
											onBlur={handleBlur}
											error={!!errorChecker(formikProps, 'passwordCheck')}
											helperText={
												errorChecker(formikProps, 'passwordCheck') || ' '
											}
											value={values.passwordCheck}
											label={t('passwordCheck')}
											type="password"
										/>
									</Box>
								</CardContent>
								<CardActions className={classes.buttons}>
									<Button
										color="primary"
										disabled={isSubmitting}
										onClick={() => router.back()}
									>
										{t('back')}
									</Button>
									<Button
										color="primary"
										disabled={isSubmitting}
										type="submit"
										variant="contained"
									>
										{t('sign-up')}
									</Button>
								</CardActions>
							</Card>
						</Form>
					);
				}}
			</Formik>
		</Box>
	);
};

export default SignUp;
