import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SalesPointModule} from "./sales-point/sales-point.module";
import {SalesPoint} from "./entity/sales-point.entity";
import {Statistic} from "./entity/statistic/statistic.entity";
import {StatisticModule} from './statistic/statistic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "test",
      entities: [SalesPoint, Statistic],
      synchronize: false,
    }),
    SalesPointModule,
    StatisticModule,
  ],
})
export class AppModule {}
