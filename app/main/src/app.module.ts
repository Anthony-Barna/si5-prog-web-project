import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesPointModule } from "./sales-point/sales-point.module";
import { SalesPoint } from "./entity/sales-point.entity";
import { Service } from "./entity/service.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "test",
      entities: [SalesPoint, Service],
      synchronize: true,
    }),
    SalesPointModule,
  ],
})
export class AppModule {}
