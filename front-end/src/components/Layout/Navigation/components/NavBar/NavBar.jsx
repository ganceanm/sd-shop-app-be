import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
	Drawer,
	Divider,
	Paper,
	Avatar,
	Typography,
	Hidden,
	NoSsr,
} from '@material-ui/core';

import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';
import Navigation from '../NavigationList';

import navigationConfig from './navigationConfig';

const DRAWER_WIDTH = 256;

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		overflowY: 'auto',
		flex: '0 0 256px',
	},
	navBar: {
		position: 'relative',
		height: 'calc(100% - 64px)',
		width: DRAWER_WIDTH,
	},
	content: {
		height: '100%',
		width: DRAWER_WIDTH,
		display: 'flex',
		flexDirection: 'column',
	},
	divider: {
		marginTop: theme.spacing(2),
	},
	navigation: {
		width: '100%',
		padding: theme.spacing(2),
		overflow: 'auto',
		flexGrow: 1,
	},
	otherText: {
		fontWeight: 500,
		fontSize: 11,
		textTransform: 'uppercase',
		color: '#90A4AE',
	},
	navigationOther: {
		width: '100%',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		// overflow: "auto",
	},
	profile: {
		paddingTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 0,
	},
	avatar: {
		width: 60,
		height: 60,
	},
	details: {
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	nameText: {
		fontSize: 14,
		fontWeight: 500,
		color: '#3A3B3F',
	},
	roleText: {
		fontSize: 12,
		color: '#9EA0A5',
	},
	buttonLinkText: {
		fontSize: 14,
		fontWeight: 500,
		color: '#000000',
	},
	moreButton: {
		marginLeft: 'auto',
	},
}));

const NavBar = (props) => {
	const { openMobile, onMobileClose } = props;

	const classes = useStyles();
	const { t } = useTranslation('components');
	const { base: navigation, other: otherNavigation } = navigationConfig({ t });
	const profile = useSelector((state) => state.me.profile);

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
	}, []);

	const navbarContent = (
		<div className={classes.content}>
			<div className={classes.profile}>
				<Avatar
					alt={t(
						'global:format.name',
						{
							firstName: profile?.firstName || '',
							lastName: profile?.lastName || '',
						},
						{ fallback: 'global:placeholders.name' },
					)}
					className={classes.avatar}
					src="/images/placeholders/profile-picture.png"
				/>
				<div className={classes.details}>
					<Typography className={classes.nameText}>
						{t(
							'global:format.name',
							{
								firstName: profile?.firstName || '',
								lastName: profile?.lastName || '',
							},
							{ fallback: 'global:placeholders.name' },
						)}
					</Typography>
				</div>
			</div>
			<Divider className={classes.divider} />
			<nav className={classes.navigation}>
				<Navigation component="div" navigation={navigation} />
			</nav>
			<nav className={classes.navigationOther}>
				<Typography className={classes.otherText}>
					components.nav-bar.other
				</Typography>
				<Navigation component="div" navigation={otherNavigation} />
			</nav>
		</div>
	);

	return (
		<NoSsr>
			<Hidden lgUp>
				<Drawer
					anchor="left"
					onClose={onMobileClose}
					open={openMobile}
					variant="temporary"
				>
					<div className={classes.navBar}>{navbarContent}</div>
				</Drawer>
			</Hidden>
			<Hidden mdDown>
				<Paper className={classes.root} elevation={1} square>
					<div className={classes.navBar}>{navbarContent}</div>
				</Paper>
			</Hidden>
		</NoSsr>
	);
};

NavBar.propTypes = {
	onMobileClose: PropTypes.func.isRequired,
	openMobile: PropTypes.bool.isRequired,
};

export default NavBar;
