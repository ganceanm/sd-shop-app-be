import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities';
import { Repository } from 'typeorm';
import ProfileDto from '../dto/profile.dto';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
	) {}

	public async create(profileData: ProfileDto): Promise<Profile> {
		const data = profileData ? profileData : new ProfileDto(null);

		const newProfile = await this.profileRepository.create({
			...data,
		});

		await this.profileRepository.save(newProfile);

		return newProfile;
	}

	public async update(data: ProfileDto, id: string): Promise<boolean> {
		const result = await this.profileRepository.update({ id: id }, data);

		return result.affected === 1;
	}
}
