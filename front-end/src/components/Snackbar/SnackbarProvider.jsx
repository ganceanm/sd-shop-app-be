import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const SnackbarContext = createContext();

const SnackbarProvider = (props) => {
	const { duration, children } = props;

	const [alert, setAlert] = useState({
		open: false,
		type: null,
		message: null,
	});

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlert((data) => ({
			...data,
			open: false,
		}));
	};

	const snackbarSuccess = (message, iDuration) => {
		handleClose();

		setAlert({
			open: true,
			type: 'success',
			message,
			duration: iDuration || duration,
		});
	};

	const snackbarError = (message, iDuration) => {
		handleClose();
		setAlert({
			open: true,
			type: 'error',
			message,
			duration: iDuration || duration,
		});
	};

	const value = { snackbarSuccess, snackbarError };

	return (
		<SnackbarContext.Provider value={value}>
			{children}
			<Snackbar
				open={alert.open}
				autoHideDuration={alert.duration || duration}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					onClose={handleClose}
					severity={alert.type || 'info'}
					elevation={6}
					variant="filled"
				>
					{alert.message || ''}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

SnackbarProvider.displayName = 'SnackbarProvider';

SnackbarProvider.propTypes = {
	duration: PropTypes.number,
};

SnackbarProvider.defaultProps = {
	duration: 5000,
};

export default SnackbarProvider;
