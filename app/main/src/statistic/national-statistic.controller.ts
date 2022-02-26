import {Controller, Get, HttpCode, HttpStatus, Logger, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StatisticService} from "./statistic.service";
import {Statistic} from "../model/entity/statistic/statistic.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('api/national-statistics')
@ApiTags('api/national-statistics')
@UseGuards(JwtAuthGuard)
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
