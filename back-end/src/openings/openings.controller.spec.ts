import { Test, TestingModule } from '@nestjs/testing';
import { OpeningsController } from './openings.controller';

describe('OpeningsController', () => {
	let controller: OpeningsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OpeningsController],
		}).compile();

		controller = module.get<OpeningsController>(OpeningsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
