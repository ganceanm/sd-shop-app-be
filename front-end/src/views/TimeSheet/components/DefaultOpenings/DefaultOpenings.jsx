const {
	Table, TableContainer, TableCell, TableBody, TableHead,
} = require('@material-ui/core');

const DefaultOpenings = ({ openingsList }) => (
	<TableContainer>
		<Table>
			<TableHead>
				<TableCell>
					Hétfő
				</TableCell>
				<TableCell>
					Kedd
				</TableCell>
				<TableCell>
					Szerda
				</TableCell>
				<TableCell>
					Csütörtök
				</TableCell>
				<TableCell>
					Péntek
				</TableCell>
				<TableCell>
					Szombat
				</TableCell>
				<TableCell>
					Vasárnap
				</TableCell>
			</TableHead>
			<TableBody>

				{openingsList && openingsList.map((opening) => (
					<TableCell>
						{opening.openingHour}
						{' '}
						-
						{' '}
						{opening.closingHour}
					</TableCell>
				))}

			</TableBody>
		</Table>
	</TableContainer>

);

export default DefaultOpenings;
