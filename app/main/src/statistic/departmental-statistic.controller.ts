import {Controller, Get, HttpCode, HttpStatus, Logger, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StatisticService} from "./statistic.service";
import {Statistic} from "../entity/statistic/statistic.entity";

@ApiTags("/api/departmental-statistics")
@Controller('/api/departmental-statistics')
export class DepartmentalStatisticController {

    constructor(private readonly statisticService: StatisticService) {}

    @Get()
    @ApiOperation({ summary: "Return fuel price statistics by french department" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: Statistic,
        isArray: true,
    })
    findAll(): Promise<Statistic[]> {
        return this.statisticService.findAll(Statistic.DEPARTMENTAL_TYPE);
    }

    @Put()
    @HttpCode(204)
    @ApiOperation({summary: "Update departmental fuel price statistics"})
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: "Statistics updated",
    })
    async updateDepartmentalStatistics(): Promise<void> {
        await this.statisticService.updateDepartmentalStatistics().then(r => Logger.log("Departmental statistics updated"));
    }
}
