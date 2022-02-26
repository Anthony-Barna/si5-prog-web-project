import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SalesPointService} from "./sales-point.service";
import {SalesPointController} from "./sales-point.controller";
import {SalesPoint} from "../model/entity/sales-point.entity";
import {ScheduleModule} from '@nestjs/schedule';
import {StatisticModule} from "../statistic/statistic.module";
import {StatisticService} from "../statistic/statistic.service";
import {Statistic} from "../model/entity/statistic/statistic.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SalesPoint, Statistic]), ScheduleModule.forRoot(), StatisticModule],
  providers: [SalesPointService, StatisticService],
  controllers: [SalesPointController],
})
export class SalesPointModule {}
