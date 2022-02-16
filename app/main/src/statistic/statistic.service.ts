import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AggregationCursor, MongoRepository} from "typeorm";
import {Statistic} from "../entity/statistic.entity";
import {SalesPoint} from "../entity/sales-point.entity";
import {Cron} from "@nestjs/schedule";
import {Price} from "../entity/price.entity";

@Injectable()
export class StatisticService {

    constructor(
        @InjectRepository(Statistic)
        private readonly statisticRepository: MongoRepository<Statistic>,
        @InjectRepository(SalesPoint)
        private readonly salesPointRepository: MongoRepository<SalesPoint>
    ) {}

    public async findAll(): Promise<Statistic[]> {
        return this.statisticRepository.find({
            order: {
                departmentCode: "ASC"
            }
        });
    }

    @Cron('0 30 3 * * *')
    public async updateDepartmentalStatistics(): Promise<void> {
        await this.deleteAllStatistics();
        Logger.log("Old statistics deleted");


        // Creating statistics by metropolitan departments
        for(let departmentCode: number = 1; departmentCode<=95; departmentCode++) {
            let departmentString: string = departmentCode < 10 ? "0" + departmentCode : "" + departmentCode;

            let departmentalStatistic: Statistic = new Statistic();
            departmentalStatistic.departmentCode = departmentString;

            let aggregate: AggregationCursor<SalesPoint> = this.salesPointRepository.aggregateEntity(
                [{
                    $match: {
                        $expr: {
                            $regexMatch: {
                                input: "$address.postalCode", regex: "^" + departmentString
                            }
                        }
                    }
                },
                    {
                        $unwind: "$prices"
                    },
                    {
                        $group: {
                            _id: "$prices.name",
                            // Presence is used to host the average price for a given fuel
                            presence: {
                                $avg: "$prices.value"
                            }
                        }
                    },
                    {
                        $sort: {
                            "prices.name": -1
                        }
                    }
                ]
            )
            await aggregate
                .toArray()
                .then(async results => {
                    results.forEach(result => {
                        let price: Price = new Price();
                        price.name = result.id.toString();
                        price.value = +result.presence;
                        price.lastUpdateDate = new Date();
                        departmentalStatistic.prices.push(price);
                    });
                    await this.statisticRepository.save(departmentalStatistic);
                });
            Logger.log("Statistics created for department " + departmentCode + " created");
        }

        Logger.log("New statistics created");
    }

    async deleteAllStatistics(): Promise<void> {
        await this.statisticRepository.deleteMany({});
    }
}
