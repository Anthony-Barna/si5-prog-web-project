import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SalesPointModule} from "./sales-point/sales-point.module";
import {SalesPoint} from "./model/entity/sales-point.entity";
import {Statistic} from "./model/entity/statistic/statistic.entity";
import {StatisticModule} from './statistic/statistic.module';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {User} from "./model/entity/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "test",
      entities: [User, SalesPoint, Statistic],
      synchronize: false,
    }),
    SalesPointModule,
    StatisticModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
