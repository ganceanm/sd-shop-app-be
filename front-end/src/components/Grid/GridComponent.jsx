import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Card from '../Card';

const GridComponent = () => {
	const appointments = useSelector((state) => state.appointments.appointments);

	const date = new Date();
	const firstDayOfTheWeeK = date.getDate() - date.getDay() + 1;

	const reservedAppointments = [];
	useEffect(() => {
		appointments.list &&
			appointments.list.map((appointment) => {
				appointment.reserved.map((app) => {
					const rd = new Date(app.begins);
					reservedAppointments.push({
						day: rd.getDate(),
						reservation: {
							hour: rd.getHours(),
							court: app.court,
						},
					});
				});
			});
	}, [appointments]);

	return (
		<div>
			<Grid container>
				<Grid item xs={12}>
					<Grid container direction="row" justify="space-between" spacing={1}>
						{[...Array(7).keys()].map((value) => (
							<Grid key={value} item xs={1}>
								<Grid container spacing={1}>
									<Grid item>
										<Grid
											container
											direction="column"
											justify="space-between"
											spacing={4}
										>
											{value < 5
												? [...Array(15).keys()].map((itemValue) => (
														<Grid key={itemValue} item>
															<Card
																date={date}
																day={value + firstDayOfTheWeeK}
																hour={itemValue + 8}
																reservedAppointments={
																	reservedAppointments
																	// ifReserved(
																	//   value + firstDayOfTheWeeK,
																	//   itemValue + 8
																	// )
																}
															/>
														</Grid>
												  ))
												: [...Array(14).keys()].map((itemValue) => (
														<Grid key={itemValue} item>
															<Card
																date={date}
																day={value + firstDayOfTheWeeK}
																hour={itemValue + 8}
																reservedAppointments={
																	reservedAppointments
																	// ifReserved(
																	//   value + firstDayOfTheWeeK,
																	//   itemValue + 8
																	// )
																}
															/>
														</Grid>
												  ))}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default GridComponent;
