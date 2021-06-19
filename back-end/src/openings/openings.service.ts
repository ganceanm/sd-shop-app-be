import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Opening } from '../entities';
import { getConnection, QueryRunner, Repository } from 'typeorm';
import { OpeningRuleDataDto } from './dto/opening-rule-data.dto';
import { configService } from '../config/config.service';
import { UpdateOpeningRuleDataDto } from './dto/update-opening-rule-data.dto';
import BaseException from '../util/exceptions/base.exception';
import { OpeningDataDto } from './dto/opening-data.dto';

interface transactionItem {
	(queryRunner: QueryRunner): Promise<any>;
}

@Injectable()
export class OpeningsService {
	constructor(
		@InjectRepository(Opening)
		private readonly repository: Repository<Opening>,
	) {}

	async onApplicationBootstrap(): Promise<void> {
		const haveDefault = async (name: string) =>
			await this.repository.findOne({ name, isDefault: true });
		try {
			const saveDefaultOpening = async (name: string) => {
				if (!(await haveDefault(name))) {
					const {
						openingHour,
						closingHour,
					} = configService.getDefaultOpeningHours(name);
					await this.repository.save({
						name,
						isDefault: true,
						openingHour: Number.parseInt(openingHour, 10),
						closingHour: Number.parseInt(closingHour, 10),
					});
					return true;
				}
				return false;
			};
			if (await saveDefaultOpening('weekday')) {
				console.info(`Default weekday opening generated.`);
			}
			if (await saveDefaultOpening('weekend')) {
				console.info(`Default weekend opening generated.`);
			}
		} catch (error) {
			console.error(
				'Failed to set the default rules. Fix the database, or the ENV file, and restart the program.',
			);
		}
	}

	static async inTransaction(
		method: transactionItem | transactionItem[] = null,
	): Promise<void> {
		const queryRunner = getConnection().createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction('SERIALIZABLE');
		try {
			const finalize = async () => {
				await queryRunner.commitTransaction();
			};
			if (method) {
				if (Array.isArray(method)) {
					for (let i = 0; i < method.length; i += 1) {
						if (method[i]) {
							await method[i](queryRunner);
						}
					}
					await finalize();
				} else {
					await method(queryRunner);
					await finalize();
				}
			}
		} catch (err) {
			await queryRunner.rollbackTransaction();
			throw err;
		} finally {
			await queryRunner.release();
		}
	}

	async findAll(): Promise<OpeningRuleDataDto[]> {
		const items = await this.repository.find({
			where: { isDeleted: false },
			order: { isDefault: 'DESC', order: 'ASC' },
		});
		return items.map((item) => new OpeningRuleDataDto(item));
	}

	private static ruleRegexp = /^[0-9]{4}(-[0-9]{2}){2}(:([0-9]{4}(-[0-9]{2}){2}|[wmy])$|$)/;
	static isValidRule(rule: string): boolean {
		if (!rule.match(OpeningsService.ruleRegexp)) {
			return false;
		}
		const parts = rule.split(':');
		const firstDate = new Date(parts[0]).getTime();
		if (Number.isNaN(firstDate)) {
			return false;
		}
		if (parts.length > 1 && parts[1].length > 1) {
			const lastDate = new Date(parts[1]).getTime();
			if (Number.isNaN(lastDate) || lastDate <= firstDate) {
				return false;
			}
		}
		return true;
	}

	static parseRule(
		rule: string,
	): { firstDate: Date; lastDate: Date; repeater: string } {
		const res: any = {};
		const parts = rule.split(':');
		res.firstDate = new Date(parts[0]);
		if (parts.length > 1) {
			if (parts[1].length > 1) {
				res.lastDate = new Date(parts[1]);
			} else {
				res.repeater = parts[1];
			}
		}
		return res;
	}

	async update(data: UpdateOpeningRuleDataDto): Promise<void> {
		const methods: transactionItem[] = [];
		const defaults = await this.repository.find({ where: { isDefault: true } });
		const defaultIds = defaults.map((item) => item.id);
		if (data.create) {
			for (let i = 0; i < data.create.length; i += 1) {
				if (!OpeningsService.isValidRule(data.create[i].rule)) {
					throw new BaseException('400ope02');
				}
				methods.push(async (queryRunner: QueryRunner) => {
					await queryRunner.manager.save(Opening, data.create[i]);
				});
			}
		}
		if (data.update) {
			for (let i = 0; i < data.update.length; i += 1) {
				const item = data.update[i];
				const { id, name, rule, order } = item;
				delete item.id;
				if (defaultIds.includes(id) && (name || rule || order)) {
					throw new BaseException('400ope00');
				}
				if (rule && !OpeningsService.isValidRule(rule)) {
					throw new BaseException('400ope02');
				}
				methods.push(async (queryRunner: QueryRunner) => {
					await queryRunner.manager.update(Opening, { id }, { ...item });
				});
			}
		}
		if (data.delete) {
			for (let i = 0; i < data.delete.length; i += 1) {
				const { id } = data.delete[i];
				if (defaultIds.includes(id)) {
					throw new BaseException('400ope01');
				}
				methods.push(async (queryRunner: QueryRunner) => {
					await queryRunner.manager.update(
						Opening,
						{ id },
						{ isDeleted: true, name: null },
					);
				});
			}
		}
		await OpeningsService.inTransaction(methods);
	}

	async getOpeningByDay(date: Date, days = 1): Promise<OpeningDataDto[]> {
		const allRules = await this.repository.find({
			where: { isDeleted: false },
			order: { isDefault: 'DESC', order: 'ASC' },
		});
		const rules: Opening[] = [];
		const defaultRules: Opening[] = [];
		allRules.forEach((item) => {
			if (item.isDefault) {
				defaultRules.push(item);
			} else {
				rules.push(item);
			}
		});
		const list: OpeningDataDto[] = [];
		dayLoop: for (let d = 0; d < days; d += 1) {
			const currentDay = new Date(date.getTime() + d * 24 * 60 * 60 * 1000);
			const dayTime = currentDay.getTime();
			const dayOfWeek = currentDay.getDay();
			const getOpeningHours = (rule: Opening) => ({
				openingHour: rule.openingHour,
				closingHour: rule.closingHour,
			});
			const getListItem = (date: Date, rule: Opening) => {
				return new OpeningDataDto({
					day: date,
					...getOpeningHours(rule),
				});
			};
			for (let i = 0; i < rules.length; i += 1) {
				if (!OpeningsService.isValidRule(rules[i].rule)) {
					throw new BaseException('500gen00', 500);
				}
				const { firstDate, lastDate, repeater } = OpeningsService.parseRule(
					rules[i].rule,
				);
				if (dayTime >= firstDate.getTime()) {
					if (lastDate) {
						if (dayTime <= lastDate.getTime()) {
							list.push(getListItem(currentDay, rules[i]));
							continue dayLoop;
						}
					} else if (repeater) {
						switch (repeater) {
							case 'w':
								if (firstDate.getDay() === dayOfWeek) {
									list.push(getListItem(currentDay, rules[i]));
									continue dayLoop;
								}
								break;
							case 'm':
								if (firstDate.getDate() === currentDay.getDate()) {
									list.push(getListItem(currentDay, rules[i]));
									continue dayLoop;
								}
								break;
							case 'y':
								if (
									firstDate.getMonth() === currentDay.getMonth() &&
									firstDate.getDate() === currentDay.getDate()
								) {
									list.push(getListItem(currentDay, rules[i]));
									continue dayLoop;
								}
								break;
							default:
								throw new BaseException('500gen00', 500);
						}
					}
					if (dayTime === firstDate.getTime()) {
						list.push(getListItem(currentDay, rules[i]));
						continue dayLoop;
					}
				}
			}
			list.push(
				getListItem(
					currentDay,
					defaultRules.find((item) =>
						dayOfWeek === 0 || dayOfWeek === 6
							? item.name === 'weekend'
							: item.name === 'weekday',
					),
				),
			);
		}
		return list;
	}
}
