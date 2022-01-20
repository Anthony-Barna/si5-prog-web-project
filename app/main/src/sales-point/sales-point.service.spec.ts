import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesPoint } from '../entity/sales-point.entity';
import { SalesPointService } from './sales-point.service';

describe('CatService', () => {
  let service: SalesPointService;
  let repository: Repository<SalesPoint>;

  const photosArray = [
    {
      name: 'Photo #1',
      description: 'Description #1',
      filename: 'Filename #1',
      isPublish: true,
    },
    {
      name: 'Photo #2',
      description: 'Description #2',
      filename: 'Filename #2',
      isPublish: true,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesPointService,
        {
          provide: getRepositoryToken(SalesPoint),
          useValue: {
            find: jest.fn().mockResolvedValue(photosArray),
          },
        },
      ],
    }).compile();

    service = module.get<SalesPointService>(SalesPointService);
    repository = module.get<Repository<SalesPoint>>(getRepositoryToken(SalesPoint));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of photos', async () => {
    const photos = await service.findAll();
    expect(photos).toEqual(photosArray);
  });
});
