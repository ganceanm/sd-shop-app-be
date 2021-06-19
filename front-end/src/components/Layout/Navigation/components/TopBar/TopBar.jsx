import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { signOut } from 'store/auth/actions';
import { useRouter } from 'next/router';
import { useErrorHandling } from 'components/error';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles((theme) => ({
	root: {
		zIndex: 2,
		boxShadow: 'none',
	},
	toolbar: {
		justifyContent: 'space-between',
	},
	openMenuButton: {
		color: theme.palette.primary.contrastText,
	},
	logOutButton: {
		color: theme.palette.primary.contrastText,
	},
}));

const TopBar = (props) => {
	const { onOpenNavBarMobile } = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const { errorHandling } = useErrorHandling(useTranslation('error'));

	const logout = async () => {
		try {
			await dispatch(signOut())
				.then(() => router.push('/'))
				.then(() => window.scrollTo(0, 0));
		} catch (error) {
			errorHandling(error);
		}
	};

	return (
		<AppBar id="top-bar" className={classes.root} color="primary">
			<Toolbar className={classes.toolbar}>
				<IconButton
					className={classes.openMenuButton}
					id="icon-button-menu"
					onClick={onOpenNavBarMobile}
				>
					<MenuIcon />
				</IconButton>
				<IconButton className={classes.logOutButton} onClick={logout}>
					<ExitToAppIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

TopBar.propTypes = {
	onOpenNavBarMobile: PropTypes.func.isRequired,
};

export default TopBar;
