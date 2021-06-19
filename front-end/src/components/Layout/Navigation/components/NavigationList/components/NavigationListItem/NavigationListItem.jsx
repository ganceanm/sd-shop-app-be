/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import {
	ListItem,
	Button,
	Collapse,
	colors,
	Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
	item: {
		display: 'block',
		paddingTop: 0,
		paddingBottom: 0,
	},
	itemLeaf: {
		display: 'flex',
		paddingTop: 0,
		paddingBottom: 0,
	},
	button: {
		color: colors.blueGrey[800],
		padding: '10px 8px',
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '100%',
	},
	buttonLeaf: {
		color: colors.blueGrey[800],
		padding: '10px 8px',
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '100%',
		fontWeight: theme.typography.fontWeightRegular,
		'&.depth-0': {
			fontWeight: theme.typography.fontWeightMedium,
		},
	},
	icon: {
		color: theme.palette.icon,
		width: 24,
		height: 24,
		display: 'flex',
		alignItems: 'center',
		marginRight: theme.spacing(1),
	},
	expandIcon: {
		marginLeft: 'auto',
		height: 24,
		width: 24,
		color: '#0C1529',
	},
	title: {
		fontSize: 14,
		fontWeight: theme.typography.fontWeightMedium,
	},
	subTitle: {
		fontSize: 14,
	},
	label: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: 'auto',
		fontSize: 14,
		fontWeight: 'bold',
	},
	active: {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		'& $icon': {
			color: theme.palette.primary.main,
		},
	},
}));

const NavigationListItem = (props) => {
	const {
		title,
		href,
		depth,
		children,
		icon: Icon,
		className,
		open: openProp,
		label: Label,
		primary,
		...rest
	} = props;

	const router = useRouter();
	const classes = useStyles();
	const [open, setOpen] = useState(openProp);

	const handleToggle = () => {
		setOpen((v) => !v);
	};

	let paddingLeft = 8;

	if (depth > 0) {
		paddingLeft = 32 + 8 * depth;
	}

	const style = {
		paddingLeft,
	};

	if (children) {
		return (
			<ListItem
				{...rest}
				className={clsx(classes.item, className)}
				disableGutters
			>
				<Button className={classes.button} onClick={handleToggle} style={style}>
					{Icon && <Icon className={classes.icon} />}
					<Typography className={classes.title}>{title}</Typography>
					{open ? (
						<KeyboardArrowDownIcon
							className={classes.expandIcon}
							color="inherit"
						/>
					) : (
						<KeyboardArrowRightIcon
							className={classes.expandIcon}
							color="inherit"
						/>
					)}
				</Button>
				<Collapse in={open}>{children}</Collapse>
			</ListItem>
		);
	}
	const isActive = href === router.pathname;

	return (
		<ListItem
			{...rest}
			className={clsx(classes.itemLeaf, className)}
			disableGutters
		>
			<Button
				className={clsx(
					classes.buttonLeaf,
					`depth-${depth}`,
					isActive && classes.active,
				)}
				style={style}
				href={href}
			>
				{Icon ? (
					<Icon className={classes.icon} />
				) : (
					<div className={classes.icon} />
				)}
				<div className={depth === 0 ? classes.title : classes.subTitle}>
					{title}
				</div>
				{Label && (
					<span className={classes.label}>
						<Label />
					</span>
				)}
				{depth === 0 && (
					<KeyboardArrowRightIcon
						className={classes.expandIcon}
						color="inherit"
					/>
				)}
			</Button>
		</ListItem>
	);
};

NavigationListItem.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	depth: PropTypes.number,
	href: PropTypes.string,
	icon: PropTypes.node,
	label: PropTypes.string,
	open: PropTypes.bool,
	title: PropTypes.string.isRequired,
};

NavigationListItem.defaultProps = {
	depth: 0,
	open: false,
};

export default NavigationListItem;
