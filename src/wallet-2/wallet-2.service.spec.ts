import { Test, TestingModule } from '@nestjs/testing';
import { Wallet2Service } from './wallet-2.service';

describe('Wallet2Service', () => {
  let service: Wallet2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Wallet2Service],
    }).compile();

    service = module.get<Wallet2Service>(Wallet2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
