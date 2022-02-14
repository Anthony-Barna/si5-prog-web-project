import {Module} from '@nestjs/common';
import {StatisticService} from './statistic.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScheduleModule} from "@nestjs/schedule";
import {Statistic} from "../entity/statistic.entity";
import {DepartmentalStatisticController} from "./departmental-statistic.controller";
import {SalesPoint} from "../entity/sales-point.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Statistic, SalesPoint]), ScheduleModule.forRoot()],
  providers: [StatisticService],
  controllers: [DepartmentalStatisticController]
})
export class StatisticModule {}
