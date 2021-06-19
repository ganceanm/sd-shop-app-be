import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		WebkitTextSizeAdjust: 'none',
	},
	container: {
		display: 'flex',
		flex: '1 1 auto',
		[theme.breakpoints.up('lg')]: {
			height: '100vh',
		},
	},
	content: {
		position: 'relative',
		flex: '1 1 auto',
		overflow: 'auto',
		top: '64px',
		height: 'calc(100% - 64px)',
		padding: theme.spacing(3),
	},
}));

const Dashboard = (props) => {
	const { children, className } = props;

	const classes = useStyles();
	const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

	const handleNavBarMobileOpen = () => {
		setOpenNavBarMobile(true);
	};

	const handleNavBarMobileClose = () => {
		setOpenNavBarMobile(false);
	};

	return (
		<div className={classes.root}>
			<TopBar
				className={classes.topBar}
				onOpenNavBarMobile={handleNavBarMobileOpen}
			/>
			<div className={classes.container}>
				<NavBar
					onMobileClose={handleNavBarMobileClose}
					openMobile={openNavBarMobile}
				/>
				<main className={[classes.content, className].join(' ')} id="container">
					{children}
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
