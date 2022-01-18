import { Test, TestingModule } from '@nestjs/testing';
import { SalesPointController } from './sales-point.controller';
import { SalesPointService} from './sales-point.service';

describe('Photo Controller', () => {
  let controller: SalesPointController;
  let service: SalesPointService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesPointController],
      providers: [
        {
          provide: SalesPointService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
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
              {
                name: 'Photo #3',
                description: 'Description #3',
                filename: 'Filename #3',
                isPublish: false,
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<SalesPointController>(SalesPointController);
    service = module.get<SalesPointService>(SalesPointService);
  });

  describe('findAll()', () => {
    it('should return an array of photos', () => {
      expect(controller.findAll()).resolves.toEqual([
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
        {
          name: 'Photo #3',
          description: 'Description #3',
          filename: 'Filename #3',
          isPublish: false,
        },
      ]);
    });
  });
});
