import { Test, TestingModule } from '@nestjs/testing';
import { PwnedService } from './pwned.service';

describe('PwnedService', () => {
  let service: PwnedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PwnedService],
    }).compile();

    service = module.get<PwnedService>(PwnedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
