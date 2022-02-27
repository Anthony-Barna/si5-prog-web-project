import {ChildEntity} from "typeorm";
import {Statistic} from "./statistic.entity";

@ChildEntity()
export class DepartmentalStatistic extends Statistic {

    constructor() {
        super(Statistic.DEPARTMENTAL_TYPE);
    }

}