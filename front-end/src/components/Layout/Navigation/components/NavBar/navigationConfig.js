// import React from 'react';
import { useSelector } from 'react-redux';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BarChartIcon from '@material-ui/icons/BarChart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PersonIcon from '@material-ui/icons/Person';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const navigationConfig = ({ t }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const role = useSelector((state) => state.me.role);

	const adminNavigation = [
		{
			title: t('nav-bar.dashboard'),
			href: '/dashboard',
			icon: BarChartIcon,
		},
		{
			title: t('nav-bar.profile'),
			href: '/profile',
			icon: PersonIcon,
		},
		{
			title: t('nav-bar.credit'),
			href: '/credit',
			icon: MonetizationOnIcon,
		},
		{
			title: t('nav-bar.courts'),
			icon: BarChartIcon,
			pages: [
				{
					title: t('nav-bar.court-types'),
					href: '/items',
				},
				{
					title: t('nav-bar.edit-courts'),
					href: '/products',
				},
			],
		},
		{
			title: t('nav-bar.timesheet'),
			href: '/timesheet',
			icon: AccessTimeIcon,
		},
	];

	const userNavigation = [
		{
			title: t('nav-bar.dashboard'),
			href: '/dashboard',
			icon: BarChartIcon,
		},
		{
			title: t('nav-bar.profile'),
			href: '/profile',
			icon: PersonIcon,
		},
		{
			title: t('nav-bar.credit'),
			href: '/credit',
			icon: MonetizationOnIcon,
		},
		{
			title: t('nav-bar.timesheet'),
			href: '/timesheet',
			icon: AccessTimeIcon,
		},
	];

	const otherNavigation = [
		{
			title: 'nav-bar.feedback',
			href: '/feedback',
			icon: HelpOutlineIcon,
		},
		{
			title: 'nav-bar.customer-service',
			href: '/support',
			icon: HelpOutlineIcon,
		},
	];

	if (role === 'admin' || role === 'root') {
		return { base: adminNavigation, other: otherNavigation };
	}
	return { base: userNavigation, other: otherNavigation };
};

export default navigationConfig;
