import {Controller, Get, HttpCode, HttpStatus, Logger, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StatisticService} from "./statistic.service";
import {Statistic} from "../entity/statistic/statistic.entity";

@Controller('api/national-statistics')
@ApiTags('api/national-statistics')
export class NationalStatisticController {

    constructor(private readonly statisticService: StatisticService) {}

    @Get()
    @ApiOperation({ summary: "Return France fuel price statistics" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: Statistic,
        isArray: true,
    })
    findAll(): Promise<Statistic[]> {
        return this.statisticService.findAll(Statistic.NATIONAL_TYPE);
    }

    @Put()
    @HttpCode(204)
    @ApiOperation({summary: "Update national fuel price statistics"})
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: "Statistics updated",
    })
    async updateDepartmentalStatistics(): Promise<void> {
        await this.statisticService.updateNationalStatistics().then(r => Logger.log("National statistics updated"));
    }
}
