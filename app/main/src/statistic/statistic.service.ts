import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MongoRepository} from "typeorm";
import {Statistic} from "../entity/statistic.entity";
import {SalesPoint} from "../entity/sales-point.entity";
import {Cron} from "@nestjs/schedule";

@Injectable()
export class StatisticService {

    constructor(
        @InjectRepository(Statistic)
        private readonly statisticRepository: MongoRepository<Statistic>,
        @InjectRepository(SalesPoint)
        private readonly salesPointRepository: MongoRepository<SalesPoint>
    ) {}

    public async findAll(): Promise<Statistic[]> {
        return this.statisticRepository.find();
    }

    @Cron('0 30 3 * * *')
    public async updateDepartmentalStatistics(): Promise<void> {

    }
}
