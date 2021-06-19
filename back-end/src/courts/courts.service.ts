import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreationResponseDto } from 'src/dto/creation.response.dto';
import { ModificationResponseDto } from 'src/dto/modification.response.dto';
import { User } from 'src/entities';
import { Court } from 'src/entities/court/court.entity';
import { Repository } from 'typeorm';
import CourtListDto from './dto/court-list.dto';
import CourtTypeListDto from './dto/court-type-list.dto';
import { CourtTypeDto } from './dto/court-type.dto';
import CreateCourtTypeDto from './dto/create-court-type.dto';
import CreateCourtDto from './dto/create-court.dto';
import UpdateCourtTypeDto from './dto/update-court-type.dto';
import UpdateCourtDto from './dto/update-court.dto';
import { TypesService } from './types/types.service';

@Injectable()
export class CourtsService {
	constructor(
		@InjectRepository(Court)
		private readonly repository: Repository<Court>,
		private readonly typeService: TypesService,
	) {}

	public async getTypes(): Promise<CourtTypeListDto> {
		const results = await this.typeService.getAll();
		return new CourtTypeListDto(results);
	}

	public async createType(dto: CreateCourtTypeDto): Promise<CourtTypeDto> {
		const newType = await this.typeService.create(dto.name);
		return new CourtTypeDto(newType);
	}

	public async updateType(
		id: string,
		dto: UpdateCourtTypeDto,
	): Promise<ModificationResponseDto> {
		return new ModificationResponseDto(await this.typeService.update(id, dto));
	}

	public async get(): Promise<CourtListDto> {
		const results = await this.repository.find({ isDeleted: false });
		return new CourtListDto(results);
	}

	public async getById(id: string): Promise<Court> {
		return await this.repository.findOneOrFail({ id });
	}

	public async create(
		dto: CreateCourtDto,
		user: User,
	): Promise<CreationResponseDto> {
		const newType = this.repository.create({
			type: await this.typeService.getById(dto.typeId),
			color: dto.color,
			hourlyCost: dto.hourlyCost,
			name: dto.name,
			createdBy: user.email,
			lastChangedBy: user.email,
		});

		return new CreationResponseDto((await this.repository.save(newType)).id);
	}

	public async update(
		id: string,
		dto: UpdateCourtDto,
		user: User,
	): Promise<ModificationResponseDto> {
		const { typeId, ...bareDto } = dto;

		const updatedEntity = typeId
			? {
					type: await this.typeService.getById(typeId),
					...bareDto,
			  }
			: bareDto;
		const result = await this.repository.update(
			{ id },
			{
				...updatedEntity,
				lastChangedBy: user.email,
				lastChangedAt: new Date(),
			},
		);

		return new ModificationResponseDto(result.affected === 1);
	}

	public async delete(
		id: string,
		user: User,
	): Promise<ModificationResponseDto> {
		const result = await this.repository.update(
			{ id },
			{ isDeleted: true, lastChangedBy: user.email, lastChangedAt: new Date() },
		);

		return new ModificationResponseDto(result.affected === 1);
	}
}
