import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourtType } from 'src/entities/court/court-type.entity';
import { Repository } from 'typeorm';
import UpdateCourtTypeDto from '../dto/update-court-type.dto';

@Injectable()
export class TypesService {
	constructor(
		@InjectRepository(CourtType)
		private readonly repository: Repository<CourtType>,
	) {}

	public async getById(id: string): Promise<CourtType> {
		return await this.repository.findOneOrFail({ id });
	}

	public async getAll(): Promise<CourtType[]> {
		return await this.repository.find();
	}

	public async create(name: string): Promise<CourtType> {
		const newType = this.repository.create({ name });

		return await this.repository.save(newType);
	}

	public async update(id: string, dto: UpdateCourtTypeDto): Promise<boolean> {
		const result = await this.repository.update({ id }, dto);

		return result.affected === 1;
	}

	public async delete(id: string): Promise<boolean> {
		const result = await this.repository.delete({ id });

		return result.affected === 1;
	}
}
