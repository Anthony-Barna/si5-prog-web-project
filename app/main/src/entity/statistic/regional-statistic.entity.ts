import {ChildEntity} from "typeorm";
import {Statistic} from "./statistic.entity";

@ChildEntity()
export class RegionalStatistic extends Statistic {

    constructor() {
        super();
        this.type = Statistic.REGIONAL_TYPE;
    }

}