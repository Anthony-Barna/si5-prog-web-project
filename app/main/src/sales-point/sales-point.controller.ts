import {Controller, Get, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { SalesPointService } from './sales-point.service';
import { SalesPoint } from '../entity/sales-point.entity';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { Express } from 'express'
import {FileInterceptor} from "@nestjs/platform-express";
import {XMLParser} from "fast-xml-parser";

@ApiTags('/api/sales-points')
@Controller('/api/sales-points')
export class SalesPointController {
  constructor(private readonly photoService: SalesPointService) {}

  @Get()
  @ApiOperation({ summary: 'Read sales points' })
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll(): Promise<SalesPoint[]> {
    return this.photoService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload sales points' })
  @ApiResponse({ status: 200, description: 'Ok' })
  upload(@UploadedFile() file: Express.Multer.File): Promise<SalesPoint[]> {

    if(!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    return this.photoService.createSalesPoints(Buffer.from(file.buffer).toString("utf-8"));
  }
}
