import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
	const { children, value, index } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index && (
				<Box p={3}>
					<Typography component="span">{children}</Typography>
				</Box>
			)}
		</div>
	);
}

export default TabPanel;
