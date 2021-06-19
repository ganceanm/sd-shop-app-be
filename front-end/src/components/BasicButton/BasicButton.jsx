import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import React from 'react';

export const BasicButton = ({ label, onClick }) => (
	<Box>
		<Button onClick={onClick} variant="contained" color="primary">
			{label}
		</Button>
	</Box>
);

export default BasicButton;
