import { Test, TestingModule } from '@nestjs/testing';
import { HiService } from './hi.service';

describe('HiService', () => {
  let service: HiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiService],
    }).compile();

    service = module.get<HiService>(HiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
