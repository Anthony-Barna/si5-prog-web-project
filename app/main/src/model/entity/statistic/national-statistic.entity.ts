import {ChildEntity} from "typeorm";
import {Statistic} from "./statistic.entity";

@ChildEntity()
export class NationalStatistic extends Statistic {

    constructor() {
        super(Statistic.NATIONAL_TYPE);
        this.code = "France";
    }

}