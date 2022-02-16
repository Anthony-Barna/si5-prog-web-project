import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AggregationCursor, MongoRepository} from "typeorm";
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
        await this.deleteAllStatistics();
        Logger.log("Old statistics deleted");

        // Creating statistics by metropolitan departments
        for(let departmentNumber: number = 1; departmentNumber<=1; departmentNumber++) {
            let departmentString: string  = departmentNumber < 10 ? "0" + departmentNumber : "" + departmentNumber;
            let aggregate: AggregationCursor<SalesPoint> = await this.salesPointRepository.aggregateEntity(
                [{
                    $match:
                            { $expr:
                                    { $regexMatch:
                                            { input: "$address.postalCode", regex: "^" + departmentString }
                                    }
                            }
                            },
                    {
                        $unwind: "$prices"
                    },
                    {
                        $group:
                            {
                                _id: "$prices.name",
                                averagePrice:
                                    {
                                        $avg: "$prices.value"
                                    }
                            }
                    },
                    {
                        $sort:
                            {
                                "prices.name": -1
                            }
                    }
                ]
            );
            console.log(aggregate);
            Logger.log("Statistics created for department " + departmentNumber + " created");
        }

        Logger.log("New statistics created");
    }

    async deleteAllStatistics(): Promise<void> {
        await this.statisticRepository.deleteMany({});
    }
}
