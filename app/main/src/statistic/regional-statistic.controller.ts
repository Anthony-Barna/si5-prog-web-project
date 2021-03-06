import {Controller, Get, HttpCode, HttpStatus, Logger, Put, UseGuards} from '@nestjs/common';
import {StatisticService} from "./statistic.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Statistic} from "../model/entity/statistic/statistic.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('api/regional-statistics')
@Controller('api/regional-statistics')
@UseGuards(JwtAuthGuard)
export class RegionalStatisticController {

    constructor(private readonly statisticService: StatisticService) {}

    @Get()
    @ApiOperation({ summary: "Return fuel price statistics by french region" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Ok",
        type: Statistic,
        isArray: true,
    })
    findAll(): Promise<Statistic[]> {
        return this.statisticService.findAll(Statistic.REGIONAL_TYPE);
    }

    @Put()
    @HttpCode(204)
    @ApiOperation({summary: "Update regional fuel price statistics"})
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: "Statistics updated",
    })
    async updateRegionalStatistics(): Promise<void> {
        await this.statisticService.updateRegionalStatistics().then(r => Logger.log("Regional statistics updated"));
    }
}
