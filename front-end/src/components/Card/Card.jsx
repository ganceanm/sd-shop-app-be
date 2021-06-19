import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, makeStyles } from '@material-ui/core';
import ReserveModal from '../ReserveModal';

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		border: 'rgb(125, 120, 120)',
		borderWidth: 1,
		borderRadius: 5,
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	segment: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	verticalLine: {
		height: '100%',
		width: 1,
		backgroundColor: 'grey',
	},

	full: {
		display: 'flex',
		flexDirection: 'row',
		border: 'rgb(125, 120, 120)',
		borderWidth: 1,
		borderRadius: 5,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgb(253, 61, 61)',
	},

	half: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgb(253, 61, 61)',
	},
}));

export const Card = ({ date, reservedAppointments, day, hour }) => {
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	const reserved = [];
	useEffect(() => {
		reservedAppointments.map((e) => {
			if (
				e.day === day &&
				e.reservation.hour === hour &&
				!reserved.includes(e.reservation.court)
			) {
				reserved.push(e.reservation.court);
			}
		});
	}, [reservedAppointments]);

	date.setHours(hour);
	date.setMinutes(0);
	const reserveDate = new Date(
		Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			day,
			date.getHours(),
			date.getMinutes(),
		),
	).toISOString();

	if (reserved && reserved.length > 0) {
		if (reserved.length === 2) {
			return <div className={classes.full}>Reserved</div>;
		}
		return (
			<div className={classes.container}>
				<div className={reserved[0] === 'TWO' ? classes.segment : classes.half}>
					{reserved[0] === 'TWO' ? (
						<div>
							<IconButton onClick={() => setOpen(true)}>
								<AddIcon />
							</IconButton>
							<ReserveModal
								reserved={reserved}
								open={open}
								onClose={() => setOpen(false)}
								date={reserveDate}
							/>
						</div>
					) : (
						<p>Reserved</p>
					)}
				</div>
				<div className="verticalLine" />
				<div className={reserved[0] === 'ONE' ? classes.segment : classes.half}>
					{reserved[0] === 'ONE' ? (
						<div>
							<IconButton onClick={() => setOpen(true)}>
								<AddIcon />
							</IconButton>
							<ReserveModal
								reserved={reserved}
								open={open}
								onClose={() => setOpen(false)}
								date={reserveDate}
							/>
						</div>
					) : (
						<p>Reserved</p>
					)}
				</div>
			</div>
		);
	}
	return (
		<div className={classes.container}>
			<IconButton onClick={() => setOpen(true)}>
				<AddIcon />
			</IconButton>
			<ReserveModal
				reserved={reserved}
				open={open}
				onClose={() => setOpen(false)}
				date={reserveDate}
			/>
		</div>
	);
};

export default Card;
