import React, { useState, useEffect } from 'react';
import {
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableBody,
	Paper,
	makeStyles,
	Box,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from 'components/TextInput';
import Row from 'components/Row/Row';

import { getUsers } from 'store/user/actions';
import Dashboard from 'components/Layout/Navigation/Dashboard';

const useStyles = makeStyles(() => ({
	table: {
		width: '80%',
		backgroundColor: 'grey',
	},
}));

const Credit = () => {
	const [, setValue] = useState('');

	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const users = useSelector((state) => state.user.users);

	return (
		<Dashboard>
		<Box>
			<TextInput
				label="Keresés"
				onChange={(text) => {
					setValue(text.target.value);
				}}
			/>
			<TableContainer classes={classes.table} component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell align="left">Név</TableCell>
							<TableCell align="left">Email</TableCell>
							<TableCell align="right">Kredit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.items &&
							users.items.map((user) => <Row key={user.id} row={user} />)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
		</Dashboard>
	);
};

Credit.propTypes = {};

export default Credit;
