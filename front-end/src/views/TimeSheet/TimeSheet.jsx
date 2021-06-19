/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import {
	getOpenings, getRules, deleteRule, createRule, updateRule,
} from 'store/openings/actions';
import {
	Box, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, TextField, IconButton,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { Formik, Form, FieldArray } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useRouter } from 'next/router';
import DefaultOpenings from './components/DefaultOpenings/DefaultOpenings';
import Dashboard from 'components/Layout/Navigation/Dashboard';

const TimeSheet = () => {
	const [newRule, setNewRule] = useState(false);
	const [saving, setSaving] = useState(false);
	const [name, setName] = useState('');
	const [opening, setOpening] = useState('');
	const [closing, setClosing] = useState('');
	const [date, setDate] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();

	const openings = useSelector((state) => state.openings.openings);
	const rules = useSelector((state) => state.openings.rules)

	const deleteRuleList = [];

	const onSubmit = async (values) => {
		const createList = values.ruleList.filter((rule) => !rule.id);
		await dispatch(createRule(createList));
		await dispatch(deleteRule(deleteRuleList));

		const updateRuleList = [];
		values.ruleList.forEach((rule) =>  {
			rule.rule
			&& updateRuleList.push({
				id: rule.id,
				rule: rule.rule,
				name: rule.name,
				order: values.ruleList.indexOf(rule),
				openingHour: rule.openingHour,
				closingHour: rule.closingHour,
			});
		});
		await dispatch(updateRule(updateRuleList));
	};

	return (
		<Dashboard>
		<Box>
			<DefaultOpenings openingsList={openings} />
			<Formik
				enableReinitialize
				onSubmit={onSubmit}
				initialValues={{
					ruleList: rules ? [...rules] : [],
				}}
			>
				{(formikProps) => {
					const {
						values, handleChange, handleBlur, isSubmitting,
					} = formikProps;
					return (
						<Form>
							<TableContainer>
								<Table>
									<TableHead>
										<TableCell>Szabály</TableCell>
										<TableCell>Default</TableCell>
										<TableCell>Nyitás</TableCell>
										<TableCell>Zárás</TableCell>
										<TableCell />
										<TableCell />
										<TableCell />

									</TableHead>
									<FieldArray
										name='ruleList'
									>
										{(props) => {
											const {
												push, remove, swap, form,
											} = props;
											const { values } = form;
											const { ruleList } = values;
											return (
												<TableBody>
													{
														ruleList && ruleList.map((rule, index) =>
														 (
																<TableRow key={rule.order}>
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
																		{!rule.isDefault && (
																	<IconButton onClick={() => {
																				if (rule.id) {
																					deleteRuleList.push({ id: rule.id });
																				}
																				remove(index);
																			}}
																			>
																				<DeleteIcon />
																			</IconButton>
																		)}
																	</TableCell>
																<TableCell>
																		{!rule.isDefault && (
																	<IconButton onClick={() => {
																				if (index != 2) { swap(index, index - 1); }
																			}}
																			>
																				<KeyboardArrowUpIcon />
																			</IconButton>
																		)}
																	</TableCell>
																<TableCell>
																		{!rule.isDefault && (
																	<IconButton onClick={() => {
																				if (index != ruleList.length - 1) {
																					swap(index, index + 1);
																				}
																			}}
																			>
																				<KeyboardArrowDownIcon />
																			</IconButton>
																		)}
																	</TableCell>
															</TableRow>
															),
														)

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
																	<TextField label='Dátum' onChange={(text) => setDate(text.target.value)} />
																</TableCell>
																<TableCell>
																	<IconButton onClick={() => {
																		push({
																			name,
																			openingHour: parseInt(opening),
																			closingHour: parseInt(closing),
																			order: ruleList.length > 0 && ruleList[ruleList.length - 1].order ? ruleList[ruleList.length - 1].order + 1 : 1,
																			rule: date,
																		});
																		setNewRule(false);
																	}}
																	>
																		<CheckIcon />
																	</IconButton>
																</TableCell>
															</TableRow>
														)
													}
												</TableBody>
											);
										}}
									</FieldArray>

								</Table>
							</TableContainer>
							<Button
								color='primary'
								size='large'
								variant='contained'
								onClick={() => setNewRule(true)}
							>
								Új szabály
							</Button>
							
							<Button
								color='primary'
								size='large'
								variant='contained'
								type='submit'
							>
								Mentés
							</Button>
							<Button
							color='primary'
							size='large'
							variant='contained'
							onClick={() => router.back()}
							>
								Vissza
							</Button>
						</Form>
					);
				}}

			</Formik>
			
		</Box>
		</Dashboard>
	);
};

export default TimeSheet;
