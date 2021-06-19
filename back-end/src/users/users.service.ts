import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import bcrypt from 'bcrypt';
import { RolesService } from 'src/admin/roles/roles.service';
import { ProfileService } from './profile/profile.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { configService } from 'src/config/config.service';
import { MailService } from 'src/util/mail/mail.service';
import { v4 as uuid } from 'uuid';
import {
	IPaginationOptions,
	Pagination,
	paginate,
} from 'nestjs-typeorm-paginate';
import UserDataDto from './dto/user-data.dto';
import BaseException from '../util/exceptions/base.exception';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly rolesService: RolesService,
		private readonly profileService: ProfileService,
		private readonly mailService: MailService,
	) {}

	async onApplicationBootstrap(): Promise<void> {
		await this.bootstrap();
	}

	private async bootstrap(): Promise<void> {
		const baseUser = configService.getBaseUserCredentials();
		const root = await this.usersRepository.findOne({ email: baseUser.email });

		if (root) {
			return;
		} else {
			setTimeout(async () => {
				const rootRole = await this.rolesService.getRole('root');
				await this.create(
					new CreateUserDto({
						email: baseUser.email,
						password: baseUser.password,
						role: rootRole.name,
					}),
					true,
				);
				console.log('Generated base user!');
			}, 5 * 1000);
		}
	}

	async getByEmail(email: string): Promise<User> {
		const user = await this.usersRepository.findOne({ email });
		if (!user) {
			throw new BaseException('404use00', 404);
		}
		return user;
	}

	async getById(id: string): Promise<User> {
		const user = await this.usersRepository.findOne({ id });
		if (!user) {
			throw new BaseException('404use00', 404);
		}
		return user;
	}

	async paginate(
		options: IPaginationOptions,
		search = '',
	): Promise<Pagination<UserDataDto>> {
		if (!search) {
			const page = await paginate<User>(this.usersRepository, options, {
				where: { isDeleted: false },
				order: { createdAt: 'DESC' },
			});
			const items = page.items.map((item) => new UserDataDto(item));
			return new Pagination<UserDataDto>(items, page.meta, page.links);
		}
		const concatUrl = (page = 1) => {
			return `${options.route}?search=${encodeURIComponent(search)}${
				page > 1 ? `&page=${page}` : ''
			}&limit=${options.limit}`;
		};
		let { page, limit } = options;
		page = typeof page === 'string' ? Number.parseInt(page, 10) : page;
		limit = typeof limit === 'string' ? Number.parseInt(limit, 10) : limit;
		search = search
			.normalize('NFD')
			.replace(/\s+/g, '')
			.toLowerCase()
			.replace(/[\u0300-\u036f]/g, '');
		const query = this.usersRepository
			.createQueryBuilder('users')
			.leftJoinAndSelect('users.profile', 'profile')
			.leftJoinAndSelect('users.role', 'role')
			.where(
				'users.isDeleted = false and (unaccent(lower(users.email)) like :search ' +
					'or concat(unaccent(lower(profile.firstName)), unaccent(lower(profile.lastName)), ' +
					'unaccent(lower(profile.firstName))) like :search)',
				{ search: `%${search}%` },
			);
		const items = await query
			.orderBy('users.createdAt', 'DESC')
			.limit(limit)
			.offset((page - 1) * limit)
			.getMany();
		const totalCount =
			items.length < limit ? items.length : await query.getCount();
		const totalPages = Math.ceil(totalCount / limit);
		return new Pagination<UserDataDto>(
			items.map((item) => new UserDataDto(item)),
			{
				currentPage: page,
				itemCount: items.length,
				itemsPerPage: limit,
				totalItems: totalCount,
				totalPages,
			},
			{
				first: concatUrl(),
				last: totalPages ? concatUrl(totalPages) : '',
				previous: page > 1 ? concatUrl(page - 1) : '',
				next: page < totalCount ? concatUrl(page + 1) : '',
			},
		);
	}

	public async create(
		registrationData: CreateUserDto,
		createdBySystem = false,
	): Promise<string> {
		const isRegistered = await this.usersRepository.findOne({
			email: registrationData.email,
		});

		if (isRegistered) {
			throw new BaseException('409reg00', 409);
		}

		const hashedPassword = await bcrypt.hash(registrationData.password, 10);

		const role = await this.rolesService.getRole('user');

		const newProfile = await this.profileService.create(
			registrationData.profile,
		);

		const newUser = await this.usersRepository.create({
			email: registrationData.email,
			password: hashedPassword,
			role: role,
			profile: newProfile,
			createdBy: createdBySystem ? 'system' : 'self',
			lastChangedBy: createdBySystem ? 'system' : 'self',
		});

		await this.usersRepository.save(newUser);

		return newUser.id;
	}

	public async update(
		id: string,
		data: UpdateUserDto,
		currentUser: User,
	): Promise<boolean> {
		const user = await this.getById(id);
		const result = await this.usersRepository.update(
			{ id: id },
			{
				lastChangedAt: new Date(),
				lastChangedBy: currentUser.email,
			},
		);

		const profileResult = data.profile
			? await this.profileService.update(data.profile, user.profile.id)
			: true;

		return result.affected === 1 || profileResult;
	}

	public async resetPassword(email: string): Promise<boolean> {
		const user = await this.getByEmail(email);
		const resetToken = uuid();

		this.mailService.sendPasswordReset(
			email,
			user.profile.firstName + user.profile.lastName,
			resetToken,
		);

		const result = await this.usersRepository.update(
			{ id: user.id },
			{
				resetToken: resetToken,
				lastChangedAt: new Date(),
				lastChangedBy: 'system',
			},
		);

		return result.affected === 1;
	}

	public async setPassWithToken(
		resetToken: string,
		password: string,
	): Promise<boolean> {
		const user = await this.usersRepository.findOneOrFail({
			resetToken: resetToken,
		});

		const newPassword = await bcrypt.hash(password, 10);

		const result = await this.usersRepository.update(
			{ id: user.id },
			{
				resetToken: null,
				password: newPassword,
				lastChangedAt: new Date(),
				lastChangedBy: 'system',
			},
		);

		return result.affected === 1;
	}

	public async setPassWithUser(user: User, password: string): Promise<boolean> {
		const newPassword = await bcrypt.hash(password, 10);

		const result = await this.usersRepository.update(
			{ id: user.id },
			{
				password: newPassword,
				lastChangedAt: new Date(),
				lastChangedBy: user.email,
			},
		);

		return result.affected === 1;
	}
}
