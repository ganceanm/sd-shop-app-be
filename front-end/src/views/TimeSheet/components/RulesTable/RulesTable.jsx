import {
	TableContainer, Table, TableHead, TableCell, TableRow, TableBody, TextField, IconButton,
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { deleteRule } from 'store/openings/actions';

const RulesTable = ({ rules, newRule, saving }) => {
	const [name, setName] = useState('');
	const [opening, setOpening] = useState('');
	const [closing, setClosing] = useState('');

	const dispatch = useDispatch();

	const newRulesList = [];

	const createRule = () => {
		if (opening > -1 && opening < 25 && closing > -1 && closing < 25 && opening < closing) {
			newRulesList.push({
				name,
				openingHour: opening,
				closingHour: closing,
				order: 4,
				rule: new Date(),
			});
		}
	};

	saving && dispatch(createRule(newRulesList));

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableCell>Szabály</TableCell>
					<TableCell>Default</TableCell>
					<TableCell>Nyitás</TableCell>
					<TableCell>Zárás</TableCell>
					<TableCell />
				</TableHead>
				<TableBody>
					{
						rules && rules.map((rule) => (
							<TableRow key={rule.isDefault}>
								<TableCell>
									{rule.name}
								</TableCell>
								<TableCell>
									{rule.isDefault ? 'Igen' : 'Nem'}
								</TableCell>
								<TableCell>
									{rule.openingHour}
								</TableCell>
								<TableCell>
									{rule.closingHour}
								</TableCell>
								<TableCell>
									{rule.isDefault
									&& (
										<IconButton onClick={() => deleteRule()}>
											<DeleteIcon />
										</IconButton>
									)}
								</TableCell>
							</TableRow>
						))
					}
					{
						newRule && (
							<TableRow>
								<TableCell>
									<TextField label='Szabály' onChange={(text) => setName(text.target.value)} />
								</TableCell>
								<TableCell />
								<TableCell>
									<TextField label='Nyitás' onChange={(text) => setOpening(text.target.value)} />
								</TableCell>
								<TableCell>
									<TextField label='Zárás' onChange={(text) => setClosing(text.target.value)} />
								</TableCell>
								<TableCell>
									<IconButton onClick={createRule}>
										<CheckIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						)
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default RulesTable;
