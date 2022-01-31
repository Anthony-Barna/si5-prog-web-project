import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { SalesPointService } from "./sales-point.service";
import { SalesPoint } from "../entity/sales-point.entity";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("/api/sales-points")
@Controller("/api/sales-points")
export class SalesPointController {
  constructor(private readonly salesPointService: SalesPointService) {}

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
    name: "distance",
    description: "distance ",
    type: "number",
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Ok",
    type: SalesPoint,
    isArray: true,
  })
  findAll(@Query() query): Promise<SalesPoint[]> {
    if (query.price && !query.fuel) {
      throw new HttpException(
        "You must specify a fuel to sort by price",
        HttpStatus.BAD_REQUEST
      );
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
      query.distance,
      query.latitude,
      query.longitude
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  @ApiOperation({ summary: "Upload sales points" })
  @ApiResponse({ status: HttpStatus.OK, description: "Ok" })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "A file must be uploaded",
  })
  @ApiBody({
    description: "Created sales points",
    type: SalesPoint,
    isArray: true,
  })
  upload(@UploadedFile() file: Express.Multer.File): Promise<SalesPoint[]> {
    if (!file) {
      throw new HttpException("No file uploaded", HttpStatus.BAD_REQUEST);
    }

    return this.salesPointService.persistSalesPoints(
      Buffer.from(file.buffer).toString("latin1")
    );
  }
}
