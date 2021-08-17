import { Test, TestingModule } from '@nestjs/testing';
import { ByeService } from './bye.service';

describe('ByeService', () => {
  let service: ByeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ByeService],
    }).compile();

    service = module.get<ByeService>(ByeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
