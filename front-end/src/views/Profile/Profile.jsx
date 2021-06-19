import { ProfileHeader } from 'components/ProfileHeader/ProfileHeader';

import React, { useState } from 'react';
import { IconButton, makeStyles, Box } from '@material-ui/core';
import ProfileModal from 'components/ProfileModal';
import EditIcon from '@material-ui/icons/Edit';
import Dashboard from 'components/Layout/Navigation/Dashboard';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		marginLeft: 200,
		padding: theme.spacing(2),
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
	},
	div: {
		width: '45%',
	},
	size: {
		height: '75%',
		width: '95%',
	},
}));

const Profile = (props) => {
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	const user = useSelector((state) => state.me);

	const { defaultNamespace } = props;

	return (
		<Dashboard>
			<Box className={classes.home}>
				<Box className={classes.header}>
					<Box className={classes.div}>
						<p>
							{' '}
							Név: {user.profile.lastName} {user.profile.firstName}
						</p>
						<p>Telefonszám: {user.profile.phone}</p>
						<p>Email: {user.email}</p>
					</Box>

					<Box className={classes.div}>
						<p>Kreditek száma: {user.credit}</p>
						<p>Következő foglalás</p>
						<p>Kártyaszám</p>
					</Box>

					<Box className={classes.div}>
						<IconButton onClick={() => setOpen(true)}>
							<EditIcon />
						</IconButton>
						<ProfileModal
							defaultNamespace={defaultNamespace}
							user={user}
							open={open}
							onClose={() => setOpen(false)}
						/>
					</Box>
				</Box>
				<Box className={classes.size}>
					<ProfileHeader />
				</Box>
			</Box>
		</Dashboard>
	);
};

Profile.propTypes = {};

export default Profile;
