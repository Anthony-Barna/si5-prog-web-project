import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {SalesPointService} from "./sales-point.service";
import {SalesPoint} from "../model/entity/sales-point.entity";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Express} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {StatisticService} from "../statistic/statistic.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags("/api/sales-points")
@Controller("/api/sales-points")
@UseGuards(JwtAuthGuard)
export class SalesPointController {
  private readonly LOCAL: string = "local";
  private readonly REMOTE: string = "remote";

  constructor(private readonly salesPointService: SalesPointService,
              private readonly statisticsService: StatisticService) {}

  @Get()
  @ApiOperation({ summary: "Find sales points by various filters" })
  @ApiParam({
    name: "fuel",
    description: "fuel name",
    type: "string",
    required: false,
  })
  @ApiParam({
    name: "price",
    description: "fuel price",
    type: "number",
    required: false,
  })
  @ApiParam({
    name: "longitude",
    description: "longitude",
    type: "number",
    required: false,
  })
  @ApiParam({
    name: "latitude",
    description: "latitude",
    type: "number",
    required: false,
  })
  @ApiParam({
    name: "distance",
    description: "distance ",
    type: "number",
    required: false,
  })
  @ApiParam({
    name: "road",
    description: "A to return highway stations, R to return standard stations",
    type: "string",
    required: false,
  })
  @ApiParam({
    name: "limit",
    description: "Number of maximum results returned",
    type: "int",
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Ok",
    type: SalesPoint,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid parameter(s)",
  })
  findAll(@Query() query): Promise<SalesPoint[]> {
    if (query.price && !query.fuel) {
      throw new HttpException("You must specify a fuel to sort by price", HttpStatus.BAD_REQUEST);
    }
    if (query.distance && (!query.latitude || !query.longitude)) {
      throw new HttpException(
        "If maximal distance is specified, you must specify latitude and longitude as well",
        HttpStatus.BAD_REQUEST
      );
    }

    return this.salesPointService.findAll(
      query.fuel,
      query.price,
      query.longitude,
      query.latitude,
      query.distance,
      query.road,
      query.limit
    );
  }

  @Post()
  @HttpCode(202)
  @UseInterceptors(FileInterceptor("file"))
  @ApiParam({ name: "file", type: "file", required: true })
  @ApiParam({
    name: "method",
    description: "Specifies whether the file should be retrieved locally or remotely",
    example: "local | remote",
    type: "string",
    required: false,
  })
  @ApiOperation({ summary: "Upload sales points" })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: "Request accepted",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Wrong parameters",
  })
  upload(@Query() query, @UploadedFile() file: Express.Multer.File): void {
    if (!query.method || (query?.method !== this.LOCAL && query?.method !== this.REMOTE)) {
      throw new HttpException(
        "You must specify a method : local or remote",
        HttpStatus.BAD_REQUEST
      );
    }
    if (!file && query.method == this.LOCAL) {
      throw new HttpException("No file uploaded", HttpStatus.BAD_REQUEST);
    }

    this.salesPointService
      .deleteAllSalesPoints()
      .then(async () => {
        switch (query.method) {
          case this.LOCAL: {
            await this.salesPointService.persistSalesPoints(file.buffer.toString("latin1"));
            break;
          }
          case this.REMOTE: {
            await this.salesPointService.persistDistantSalesPoints();
            break;
          }
        }
      })
      .then(() =>
      {
        this.salesPointService.indexPositions().then(() => Logger.log("Positions indexed"));
        this.statisticsService.updateDepartmentalStatistics().then(() => Logger.log("Departmental statistics updated"));
        this.statisticsService.updateRegionalStatistics().then(() => Logger.log("Regional statistics updated"));
        this.statisticsService.updateNationalStatistics().then(() => Logger.log("National statistics updated"));
      }
      );
  }
}
