import React from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { signIn } from 'store/auth/actions';
import { Form, Formik } from 'formik';
import { useErrorHandling } from 'components/error';
import { getMe } from 'store/me/actions';
import useTranslation from 'next-translate/useTranslation';
import { validation } from './validation';

const useStyles = makeStyles((theme) => ({
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

const SignIn = (props) => {
	const { defaultNamespace } = props;

	const router = useRouter();
	const classes = useStyles();
	const dispatch = useDispatch();

	const { errorHandling, errorChecker } = useErrorHandling();
	const { t } = useTranslation(defaultNamespace);

	const onSubmit = async (values, { setSubmitting }) => {
		try {
			await dispatch(signIn(values))
				// .then(() => dispatch(getMe()))
				.then(() => router.push('/dashboard'))
				.then(() => window.scrollTo(0, 0));
		} catch (error) {
			errorHandling(error);
			setSubmitting(false);
		}
	};

	return (
		<div className={classes.root}>
			<Formik
				validationSchema={validation}
				onSubmit={onSubmit}
				initialValues={{
					email: '',
					password: '',
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
									<div className={classes.fields}>
										<TextField
											fullWidth
											label={t('username')}
											name="email"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
											error={!!errorChecker(formikProps, 'email')}
											helperText={errorChecker(formikProps, 'email') || ' '}
										/>
										<TextField
											fullWidth
											label={t('password')}
											name="password"
											className={classes.passwordField}
											type="password"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
											error={!!errorChecker(formikProps, 'password')}
											helperText={errorChecker(formikProps, 'password') || ' '}
										/>
									</div>
								</CardContent>
								<CardActions className={classes.buttons}>
									<Button
										color="primary"
										disabled={isSubmitting}
										onClick={() => {
											router.push('/sign-up');
										}}
									>
										{t('sign-up')}
									</Button>
									<Button
										color="primary"
										disabled={isSubmitting}
										type="submit"
										variant="contained"
									>
										{t('sign-in')}
									</Button>
								</CardActions>
							</Card>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default SignIn;
