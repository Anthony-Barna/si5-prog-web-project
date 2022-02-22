import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AggregationCursor, MongoRepository} from "typeorm";
import {Statistic} from "../entity/statistic/statistic.entity";
import {SalesPoint} from "../entity/sales-point.entity";
import {Price} from "../entity/price.entity";
import {DepartmentalStatistic} from "../entity/statistic/departemental-statistic.entity";
import {NationalStatistic} from "../entity/statistic/national-statistic.entity";
import {RegionalStatistic} from "../entity/statistic/regional-statistic.entity";

@Injectable()
export class StatisticService {

    constructor(
        @InjectRepository(Statistic)
        private readonly statisticRepository: MongoRepository<Statistic>,
        @InjectRepository(SalesPoint)
        private readonly salesPointRepository: MongoRepository<SalesPoint>
    ) {}

    public async findAll(type: string): Promise<Statistic[]> {
        return this.statisticRepository.find({
            where: {
                type: type
            },
            order: {
                code: "ASC"
            }
        });
    }

    public async updateNationalStatistics(): Promise<void> {
        await this.deleteAllStatistics(Statistic.NATIONAL_TYPE);
        Logger.log("Old national statistics deleted");

        let nationalStatistics: Statistic = new NationalStatistic();

        await this
            .buildAggregationPipeline(".*")
            .toArray()
            .then(async results => {
                results.forEach(result => nationalStatistics.prices.push(this.buildPrice(result)));
                await this.statisticRepository.save(nationalStatistics);
            });
        Logger.log("National statistics created");
    }

    public async updateRegionalStatistics(): Promise<void> {
        await this.deleteAllStatistics(Statistic.REGIONAL_TYPE);
        Logger.log("Old regional statistics deleted");

        // Creating statistics by regions
        for (const regionInfo of this.getRegionsInfos()) {

            let regionalStatistic: Statistic = new RegionalStatistic();
            regionalStatistic.code = regionInfo.code;

            await this
                .buildAggregationPipeline(regionInfo.regex)
                .toArray()
                .then(async results => {
                    results.forEach(result => regionalStatistic.prices.push(this.buildPrice(result)));
                    await this.statisticRepository.save(regionalStatistic);
                });
            Logger.log("Statistics created for region " + regionInfo.code + " created");
        }
    }

    public async updateDepartmentalStatistics(): Promise<void> {
        await this.deleteAllStatistics(Statistic.DEPARTMENTAL_TYPE);
        Logger.log("Old departmental statistics deleted");

        // Creating statistics by metropolitan departments
        for(let departmentCode: number = 1; departmentCode<=95; departmentCode++) {
            let departmentString: string = departmentCode < 10 ? "0" + departmentCode : "" + departmentCode;

            let departmentalStatistic: Statistic = new DepartmentalStatistic();
            departmentalStatistic.code = departmentString;

            await this
                .buildAggregationPipeline("^" + departmentString)
                .toArray()
                .then(async results => {
                    results.forEach(result => departmentalStatistic.prices.push(this.buildPrice(result)));
                    await this.statisticRepository.save(departmentalStatistic);
                });
            Logger.log("Statistics created for department " + departmentCode + " created");
        }

        Logger.log("New statistics created");
    }

    private buildAggregationPipeline(regex: string): AggregationCursor<SalesPoint>{
        return this.salesPointRepository.aggregateEntity(
            [{
                $match: {
                    $expr: {
                        $regexMatch: {
                            input: "$address.postalCode", regex: regex
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
        );
    }

    async deleteAllStatistics(type: string): Promise<void> {
        await this.statisticRepository.deleteMany({
            type: type
        });
    }

    private buildPrice(result: any): Price {
        let price: Price = new Price();
        price.name = result.id.toString();
        price.value = +result.presence;
        price.lastUpdateDate = new Date();
        return  price;
    }


    // Grouping departments in regions, naming them
    private getRegionsInfos(): any[] {
        let infos = [];

        // Auvergne-Rhône-Alpes
        infos.push({
            regex: "^(01|03|07|15|26|38|42|43|63|69|73|74)",
            code: "84"
        });

        // Bourgogne-Franche-Comté
        infos.push({
            regex: "^(21|25|39|58|70|71|89|90)",
            code: "27"
        });

        // Bretagne
        infos.push({
            regex: "^(22|29|35|56)",
            code: "53"
        });

        // Centre-Val de Loire
        infos.push({
            regex: "^(18|28|36|37|41|45)",
            code: "24"
        });

        // Corse
        infos.push({
            regex: "^20",
            code: "94"
        });

        // Grand Est
        infos.push({
            regex: "^(08|10|51|52|54|55|57|67|68|88)",
            code: "44"
        });

        // Hauts de France
        infos.push({
            regex: "^(02|59|60|62|80)",
            code: "32"
        });

        // Île-de-France
        infos.push({
            regex: "^(75|77|78|91|92|93|94|95)",
            code: "11"
        });

        // Normandie
        infos.push({
            regex: "(^14|27|50|61|76)",
            code: "28"
        });

        // Nouvelle-Aquitaine
        infos.push({
            regex: "^(16|17|19|23|24|33|40|47|64|79|86|87)",
            code: "75"
        });

        // Occitanie
        infos.push({
            regex: "^(09|11|12|30|31|32|34|46|48|65|66|81|82)",
            code: "76"
        });

        // Pays de la Loire
        infos.push({
            regex: "^(44|49|53|72|85)",
            code: "52"
        });

        // Provence Alpes Côte d'Azur
        infos.push({
            regex: "^(04|05|06|13|83|84)",
            code: "93"
        });

        return infos;
    }
}
