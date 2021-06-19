import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, useTheme, useMediaQuery } from '@material-ui/core';

import ButtonLink from 'components/ButtonLink';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
		paddingTop: '10vh',
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
	},
	imageContainer: {
		marginTop: theme.spacing(6),
		display: 'flex',
		justifyContent: 'center',
	},
	image: {
		maxWidth: '100%',
		width: 560,
		maxHeight: 300,
		height: 'auto',
	},
	buttonContainer: {
		marginTop: theme.spacing(6),
		display: 'flex',
		justifyContent: 'center',
	},
}));

const NetworkError = () => {
	const classes = useStyles();
	const theme = useTheme();
	const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
	const { t } = useTranslation('404');

	return (
		<div className={classes.root}>
			<Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
				{t('server-error.title')}
			</Typography>
			<Typography align="center" variant="subtitle2">
				{t('server-error.description')}
			</Typography>
			<div className={classes.imageContainer}>
				<img
					alt="Under development"
					className={classes.image}
					src="/images/server_down.svg"
				/>
			</div>
			<div className={classes.buttonContainer}>
				<ButtonLink href={{ pathname: '/home' }} color="primary">
					{t('server-error.action')}
				</ButtonLink>
			</div>
		</div>
	);
};

export default NetworkError;
