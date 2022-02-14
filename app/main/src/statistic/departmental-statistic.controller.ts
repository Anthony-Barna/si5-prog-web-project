import {Controller, Get, HttpCode, HttpStatus, Logger, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StatisticService} from "./statistic.service";
import {Statistic} from "../entity/statistic.entity";

@ApiTags("/api/departmental-statistics")
@Controller('/api/departmental-statistics')
export class DepartmentalStatisticController {

    constructor(private readonly statisticService: StatisticService) {}

    @Get()
    @ApiOperation({ summary: "Return statistics by french department" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: Statistic,
        isArray: true,
    })
    findAll(): Promise<Statistic[]> {
        return this.statisticService.findAll();
    }

    @Put()
    @HttpCode(200)
    @ApiOperation({ summary: "Update departmental statistics" })
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: "Request accepted",
    })
    updateDepartmentalStatistics(): void {
        this.statisticService.updateDepartmentalStatistics().then(r => Logger.log("Departmental statistics updated"));
    }
}
