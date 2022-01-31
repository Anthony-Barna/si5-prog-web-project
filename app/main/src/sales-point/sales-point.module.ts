import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesPointService } from "./sales-point.service";
import { SalesPointController } from "./sales-point.controller";
import { SalesPoint } from "../entity/sales-point.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SalesPoint])],
  providers: [SalesPointService],
  controllers: [SalesPointController],
})
export class SalesPointModule {}
