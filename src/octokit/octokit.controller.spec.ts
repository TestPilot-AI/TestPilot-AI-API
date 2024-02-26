import { Test, TestingModule } from '@nestjs/testing';
import { OctokitController } from './octokit.controller';

describe('OctokitController', () => {
  let controller: OctokitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OctokitController],
    }).compile();

    controller = module.get<OctokitController>(OctokitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
