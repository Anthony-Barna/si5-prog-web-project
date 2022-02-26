import {Module} from '@nestjs/common';
import {StatisticService} from './statistic.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Statistic} from "../model/entity/statistic/statistic.entity";
import {DepartmentalStatisticController} from "./departmental-statistic.controller";
import {SalesPoint} from "../model/entity/sales-point.entity";
import {RegionalStatisticController} from './regional-statistic.controller';
import {NationalStatisticController} from './national-statistic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic, SalesPoint])],
  providers: [StatisticService],
  controllers: [DepartmentalStatisticController, RegionalStatisticController, NationalStatisticController]
})
export class StatisticModule {}
